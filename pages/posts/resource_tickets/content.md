## The Problem
When writing 3D software, I need to parse scene files that load or create various resources into memory.
This data is typically read-only and very large: think 3D models, or texture images.
Sometimes, several scenes will be parsed that may request the same data, without a way to communicate; in this case, I want them to share this data automatically.
I feel this problem is general enough to present a simple solution, the *resource tickets*.

In a nutshell:
1. We need to manage read-only data encapsulated as resources by classes following [RAII](https://en.cppreference.com/w/cpp/language/raii).
2. The resources can be represented by various, unrelated classes.
3. Constructors are pure: called with the same arguments, they yield the same resource.
4. A given resource may be requested several times, but should be instanciated only once.

In my approach, a manager hands out tickets that can later be used to access the resource:
```cpp20
Manager manager;
auto ticket_car   = manager.emplace<Model>("model.ply");
auto ticket_paint = manager.emplace<Texture>("texture.png", 512, 512);

// Somewhere else, we now avoid duplicates
auto ticket_vehicle = manager.emplace<Model>("model.ply");

// Use the model and texture tickets to render the car
auto const& car   = manager.get(ticket_car);
auto const& paint = manager.get(ticket_paint);
render(car, paint);
```


## Handing Out Tickets

A resource of a given `Type` will be identified by an instance of `Ticket<Type>`.
We rely on hashing to compute an identification number and store it inside each ticket:

```cpp20
template<class Type>
class Ticket {
public:
    template<class... Args>
    explicit Ticket(Args const&... args) :
        number_{/* hashing... */}
    {}

    auto number() const {
        return number_;
    }

private:
    std::size_t number_;
};
```

Because the constructors of `Type` are assumed to be pure, hashing their arguments `args...` is enough to identify the constructed resource.
Every constructor argument should be hashable, which we can check using this concept from [cppreference](https://en.cppreference.com/w/cpp/language/constraints):

```cpp20
template<class Type>
concept Hashable = requires(Type value) {
    { std::hash<Type>{}(value) } -> std::convertible_to<std::size_t>;
};
```

To combine mutiple hashes into one, we adapt the utility function `hashCombine` from [boost](https://www.boost.org/doc/libs/1_55_0/doc/html/hash/reference.html#boost.hash_combine):

```cpp20
template<Hashable Type>
inline void hashCombine(std::size_t& seed, Type const& value) {
    seed ^= std::hash<Type>{}(value) + 0x9E3779B9 + (seed << 6) + (seed >> 2);
}
```

As the original seed, we will use an identifier for the `Type` itself; a quick and dirty way to obtain one is from `std::type_info::hash_code`.
Found in the despised `<typeinfo>` header, this function will attempt to assign a unique `std::size_t` value to each type for the current program invocation.
After calling `hashCombine` on each constructor argument inside a lambda, the final value of `seed` is put into `number_`:

```cpp20
/* ...hashing */
number_{[&args...]() {
    auto seed = typeid(Type).hash_code();
    (hashCombine(seed, args), ...);
    return seed;
}()}
```

We now have a simple class template that can be used to identify resources of any type from their construction arguments.
The manager will intercept those arguments, and instantiate objects only when necessary.


## The Resources Manager

In this solution, our `Manager` class is responsible for resources of various types, but it stores and exposes them using an unified interface.
To do that, we resort to the type erasure mechanism provided by `std::any`, and store type-erased resources inside of an associative container:

```cpp20
class Manager {
public:
    /* ... */

private:
    std::unordered_map<std::size_t, std::any const> resources_;
};
```

Indexing the map with `std::size_t` allows the use of different `Ticket` specializations as keys, but indirectly so: we will ask for the ticket number when inserting or retrieving an element.

The first operation the manager proposes is to emplace a resource, and get a ticket in exchange.
This member function depends on the `Type` of resource we want to create, and the list of arguments that will be forwarded to the constructor:

```cpp20
template<Reproducible Type, class... Args>
Ticket<Type> emplace(Args&&... args) {
    Ticket<Type> ticket{args...};
    resources_.try_emplace(
        ticket.number(),
        std::in_place_type_t<Type>{},
        std::forward<Args>(args)...
    );
    return ticket;
}
```

The map member function `try_emplace` does nothing if the key is already present, and effectively prevents duplicate resources. `std::in_place_type_t` is just a disambiguation argument that specifies which type to create for the new `std::any`.
Here, we call `Reproducible` a type that has pure constructors and is read-only.
These two constraints are impossible to check automatically, so each type must somehow indicate if it respects them:

```cpp20
template<class Type>
concept Reproducible = Type::has_pure_constructors && Type::is_read_only;
```

The second operation is to get a resource by redeeming a ticket; this is where having kept track of `Type` as a template parameter comes in handy, as we know what the return type will be:

```cpp20
template<class Type>
Type const& get(Ticket<Type> ticket) const {
    return std::any_cast<Type const&>(resources_.at(ticket.number()));
}
```

With these two basic operations, we have achieved our goal: we can carelessly ask for resources to be created, and the manager takes care of doing the minimum amount of work for us.

## Limitations

Of course, this simple approach has many shortcomings.
For example, the manager has a very limited interface and is not ready for parallel loading of resources.

A major issue is that many types often used in constructors are not directly or properly hashed by `std::hash`; you will have to specialize it for custom types, or even roll out your own hashing solution.
The case of `std::filesystem::path` is notable in that regard: a non-member function `hash_value` exists that seems to do the job, but no specialization of `std::hash`.

Sticky situations occur when mixing `char const*`, `std::string`, `std::string_view`, or using any overload set really: in `emplace`, the ticket uses types coming from template argument deduction, whereas the resource constructor goes through its own overload resolution phase...
There will likely be mistmatches.
In the same vein, consider a remake of our use case where we try to leverage list initialization:

```cpp20
auto ticket_paint = manager.emplace<Texture>("texture.png", {512, 512});
```

As per the standard, we end up in a non-deduced context and fail to emplace the resource.

Try it yourself: [tickets.h](./tickets.h).
