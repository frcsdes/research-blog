## Observer Pointers

I like the idea of `std::observer_ptr` as a drop-in replacement for raw pointers that would explicitly refuse ownership.
However, this experimental feature is too permissive to my taste, and does not prevent potential misuses:

```cpp20
auto smart = std::make_unique<Data>();
std::experimental::observer_ptr<Data> observer_1{smart.release()};
std::experimental::observer_ptr<Data> observer_2{new Data};
```

As a disclaimer, I will not be fixing that, but rather present my own view of what a dumb pointer could be.
Also, note that `std::observer_ptr` has detractors such as Bjarne Stroustrup, who expressed in [P1408R0](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1408r0.pdf) that it should be abandonned altogether.

## Basic Class Template

The `DumbPointer` class template depends on the pointed `Type`:

```cpp20
template<class Type>
class DumbPointer
{
public:

    constexpr DumbPointer() noexcept {}
    constexpr DumbPointer(std::nullptr_t) noexcept {}

    /* ... */

    constexpr Type* get() const noexcept
    {
        return pointer_;
    }

private:

    Type* pointer_{nullptr};
};
```

Yes, there is a chance for member functions to be called at compile time if you pass around null pointers.
To convert between compatible dumb pointers, I just use a constructor template.
Conversion of raw pointers never throws, so I save the extra 8 characters and do not check for it in the requirements:

```cpp20
template<class OtherType>
requires (std::convertible_to<OtherType*, Type*>)
constexpr DumbPointer(DumbPointer<OtherType> other) noexcept :
    pointer_{other.get()}
{}
```

## Ensuring a Dumb Pointer

The next step is to support conversion from smart pointers.
This time, we need to check if the base class template (`std::unique_ptr` for instance) is smart and defines how ownership is managed.
We also want to recover the type of the pointed resource to check its convertibility.
One way to do this without relying on the member types of the smart pointer class is to take a template template parameter `Smart`, and constrain it using a concept:

```cpp20
template<template<class> class Smart, class OtherType>
requires (IsConvertibleSmart<Smart, OtherType, Type>)
constexpr DumbPointer(Smart<OtherType> const& pointer) noexcept :
    pointer_{pointer.get()}
{}

// At namespace scope
template<template<class> class Pointer, class OtherType, class Type>
concept IsConvertibleSmart =
std::convertible_to<OtherType*, Type*> && (
    std::same_as<Pointer<OtherType>, std::unique_ptr<OtherType>> ||
    std::same_as<Pointer<OtherType>, std::shared_ptr<OtherType>>
);
```

I did not mark the constructor `explicit`, which is definitely debatable.
The concept does not check if `get()` exists and returns what we expect, because this is already guaranteed for our two candidates here.
It can be easily extended to support smart pointers from Boost, Qt, or your own implementation.

To try and prevent misuse by design, we should delete the constructor if the smart pointer we are trying to convert from is an rvalue reference, kind of like `std::unique_ptr` prevents copy:

```cpp20
template<template<class> class Smart, class OtherType>
requires (IsConvertibleSmart<Smart, OtherType, Type>)
DumbPointer(Smart<OtherType>&&) = delete;
```

## Wrap-Up and Improvements

Assuming class `Data` and its child `SubData` exist, this code compiles:

```cpp20
auto unique = std::make_unique<Data>();
DumbPointer<Data> dumb_1{unique};

auto shared = std::make_shared<SubData>();
DumbPointer<SubData> dumb_2{shared};

dumb_1 = dumb_2;
```

While this one does not:

```cpp20
DumbPointer<Data> dumb_3{std::move(unique)};
DumbPointer<Data> dumb_4{std::make_shared<Data>()};
```

Of course, many useful members such as the dereferencing operator and boolean conversion are still missing; a deduction guide or a `make_dumb` helper would also be welcome.
Finally, there is no explicit support for arrays as in the standard library smart pointers.

One caveat to using template template parameters is that this code will not work when converting from smart pointer classes that have multiple template arguments, for example a `std::unique_ptr` instantiated with a custom deleter.
It can also cause issues if your compiler does not follow [P0522R0](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0522r0.html) and always considers defaulted template parameters.

## The Trouble With Raw Pointers

Let's be real: I will not be coming up with a better solution than what `std::observer_ptr` proposes to wrap raw pointers.
It is not only that I don't have a clue how to, it is also because raw pointers are hopelessly ambiguous.

Somewhere in your code, there might be a function that exposes a pointer as the return value of a function.
If this pointer is a smart one, you already know how ownership is managed: it is conveyed along with the type.
Here, our little trick of deleting the rvalue reference constructor works fine.
If the pointer is raw however, it is difficult to tell if you should take ownership or not from a strict C++ point of view.

The only possibility I see to convey that ownership is already assumed in a way that can be disambiguated by the code is to return an lvalue reference to a raw pointer.
Yeah, nobody does that, and it is simply impossible if you are dealing with C interfaces.
And that is a fundamental limitation of raw pointers: their behavior does not differ whether you use copies or references to pass them around.

If you really want to convey non-ownership of raw pointers with your own dumb pointer class, you should probably mark the corresponding constructor `explicit`, and delete it when dealing with rvalue references.
Tinker with the header: [dumb_pointer.h](dumb_pointer.h).
