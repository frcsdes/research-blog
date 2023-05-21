## Motivation

In GLSL code, [swizzling](https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling) offers a handy syntax to manipulate vectors.
Inside a cubemap vertex shader for instance, you may use it like this:

```glsl
vec3 reverse_z = vec3(model_position.xy, -model_position.z);
vec4 projected = camera_proj * vec4(mat3(camera_view) * reverse_z, 1.0);
gl_Position = projected.xyww;
```

Solutions were found to reproduce this in C++, that each have their shortcomings.
* Explicitly declaring data members `vec.xyz` or functions `vec.xyz()` in the vector class.
  While close to the GLSL syntax, language is the limit here: accounting for all possible combinations of `xyzw`, `rgba`, `stpq`, and `uv` requires 5106 members total.
* Boost QVM proposes the `XYZ(vec)` syntax, with much the same issue.
* GLM has three approaches to the problem.
  As above, macros can be leveraged to generate thousands of members; additionally, the `swizzle` function does the job two ways:

```cpp20
glm::swizzle(vec, glm::X, glm::Y, glm::Z); // at run time
glm::swizzle<glm::X, glm::Y, glm::Z>(vec); // at compile time
```

Unsatisfied with the previous, I put my two cents on the question and settled on a tradeoff using `vec["xyz"]`.
The underlying code has some limitations, but nice properties too:
* Only standard C++ features are used, and there is no macro magic at work.
* Swizzles can span arbitrary dimensions, i.e. output vectors of any length.
* Extra subscript characters can be added in a single line of code.
* The operator works at compile time.
* Syntax is reasonably short and clear:

```cpp20
Vec<int, 4> constexpr sequence{1, 4, 9, 16};
Vec<int, 4> constexpr reversed = sequence["wzyx"];
std::cout << sequence << reversed;

// Outputs:
// 1 4 9 16
// 16 9 4 1
```

## A Simple Vector Class

Let's start off by building a simple `Vec` data structure.
The template parameters will be its `Type` and `Size`, mimicking `std::array`; in fact, I will use an `std::array` to store the vector coefficients:

```cpp20
template<class Type, std::size_t Size>
struct Vec
{
    std::array<Type, Size> coefficients;

    /* ... */
};
```

We then create an output stream operator for the vector structure that simply folds over the pack of coefficients provided by `std::apply`:

```cpp20
friend std::ostream& operator<<(std::ostream& os, Vec const& vec)
{
    std::apply(
        [&os](auto&&... c)
        {
            ((os << c << ' '), ...) << '\n';
        },
        vec.coefficients
    );

    return os;
}
```

Another version that does not print final separation characters can be found on [cppreference](https://en.cppreference.com/w/cpp/utility/apply).

## Swizzling Operator

To swizzle using a string, we must first transform characters into their corresponding axis; a simple `switch` statement will do.
For brevity, I shrunk the number of lines and omitted `[[fallthrough]]` but admittedly, this utility function could be more legible.

```cpp20
constexpr std::size_t axisIndex(char axis)
{
    switch (axis)
    {
    case 'x': case 'r': case 's': case 'u': return 0;
    case 'y': case 'g': case 't': case 'v': return 1;
    case 'z': case 'b': case 'p':           return 2;
    case 'w': case 'a': case 'q':           return 3;
    }

    return 0;
}
```

The swizzling operator takes strings as `char` array references so that their length can be deduced as template parameter `N`.
It returns a vector holding the same `Type` with length `N - 1`, because of the null termination character.

```cpp20
template<std::size_t N>
constexpr auto operator[](char const (&axes)[N]) const
{
    return [this, &axes]<std::size_t... I>(std::index_sequence<I...>)
    {
        return Vec<Type, N - 1>{coefficients.at(axisIndex(axes[I]))...};
    }(
        std::make_index_sequence<N - 1>{}
    );
}
```

Done!
The templated lambda deduces a pack of `std::size_t` from its parameter, and is invoked right away on an `std::index_sequence` instance.
Inside the lambda, we iterate over the characters and fetch their corresponding axis index.

One caveat: besides using `at()`, there is no bounds checking on the axes...

## What About Assignment?

This swizzling operator quickly shows its limits as it only copies the subscripted coefficients into a new `Vec`.
Enabling assignment is actually straightforward: the swizzling operator should form an `std::tuple` of references to coefficients when called on non-const instances.
Then in a wrapper class, you can add proper assignment operators and reach a working prototype in no time.
However, a number of subtleties - mostly related to move semantics - have to be taken into account, leading to rather lenghty code.
Also, [rebind vs. assign-through](https://thephd.github.io/to-bind-and-loose-a-reference-optional) is a consideration.

Suggestions welcome!
Header file here: [swizzling.h](./swizzling.h).
