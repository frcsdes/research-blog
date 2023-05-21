## Introduction

[Uniform Buffer Objects](https://www.khronos.org/opengl/wiki/Uniform_Buffer_Object) (UBOs) were introduced in OpenGL 3.1; they are essentially small, fixed-size buffers of data shared between shader programs.

Take for instance the transformation matrices of the scene's camera, which are often used in many shader programs.
One way to access their value from shaders is through uniforms, bound before each program's execution.
However, this is a typical use case where UBOs offer two advantages over uniforms.
* Rendering is more efficient, as the UBO is only bound once.
* Inside the C++ code, you are not required to expose the camera data to shaders anymore.
  It can be refactored away, reducing coupling between the classes.

In this post, we will create a UBO class template that handles boilerplate OpenGL code and offers a simple syntax to write data inside the buffer:

```cpp20
UBO<
    0, // Binding point
    std140::mat4, // camera_view
    std140::mat4  // camera_proj
>
camera_ubo;

camera_ubo.write<0>(camera_view.data());
camera_ubo.write<1>(camera_proj.data());
```

## Memory Management

A uniform buffer is described by two properties: a binding point, and a memory layout.
For the user, memory is segmented according to the different variables; in our camera example, we store the view and projection as `mat4`.
As for the machine, this segmentation must respect a certain set of rules.
The simplest one is `std140`, which looks like this for floating-point values:

```cpp20
namespace std140
{
    inline GLsizeiptr constexpr scal = sizeof(GLfloat);
    inline GLsizeiptr constexpr vec2 = 2 * scal;
    inline GLsizeiptr constexpr vec3 = 4 * scal;
    inline GLsizeiptr constexpr vec4 = 4 * scal;
    inline GLsizeiptr constexpr mat3 = 3 * vec4;
    inline GLsizeiptr constexpr mat4 = 4 * vec4;
}
```

The binding point and memory layout are the two class template parameters here:

```cpp20
template<GLuint Bind, GLsizeiptr... Size>
class UBO
{
public:

    /* ... */

private:

    GLuint buffer_id_ = 0;
};
```

We will use variable `buffer_id_` to store the buffer index OpenGL provides us.
We request this new buffer inside the constructor, bind it, and initialize it right away:

```cpp20
UBO()
{
    glGenBuffers(1, &buffer_id_);
    glBindBuffer(GL_UNIFORM_BUFFER, buffer_id_);
    glBufferData(GL_UNIFORM_BUFFER, (Size + ...), nullptr, GL_STATIC_DRAW);
    glBindBufferRange(GL_UNIFORM_BUFFER, Bind, buffer_id_, 0, (Size + ...));
}
```

The fold expression `(Size + ...)` sums over the template parameter pack `Size` and returns the total size of the buffer.
In the last line, `glBindBufferRange`  makes the connection between the UBO binding point `Bind` and the newly created buffer.
Memory is freed by the destructor:

```cpp20
~UBO()
{
    glDeleteBuffers(1, &buffer_id_);
}
```

## Writing Data to the Buffer

Now that our buffer is set up, we can populate it with data.
We will use simple member function templates to provide a nice syntax on the user side by hiding the offset calculations.
Memory segments will be referred to by their index `I`: in our example, index `0` points at the camera view matrix, and index `1` at the projection matrix.
We must take care that `I` remains in bounds, which we can check easily in C++ 20.
Compared to `static_assert`, `requires` does not provide a custom error message, but it halts compilation on the spot.

```cpp20
template<std::size_t I>
requires (I < sizeof...(Size))
void write(void const* data) const
{
    glBindBuffer(GL_UNIFORM_BUFFER, buffer_id_);
    glBufferSubData(GL_UNIFORM_BUFFER, offset<I>(), size<I>(), data);
}
```

The role of functions `offset` and `size` is straightforward: they should respectively return the offset before the `I`-th memory segment, and the size of the segment.

```cpp20
template<std::size_t I>
requires (I < sizeof...(Size))
static constexpr GLintptr offset()
{
    if constexpr (I == 0)
        return 0;
    else
        return size<I - 1>() + offset<I - 1>();
}
```

The `if` `constexpr` is needed here: a ternary operator would try to instantiate the recursive calls as well, quickly leading to an integer underflow...
To get the `I`-th element of the `Size` parameter pack, we resort to `<tuple>`:

```cpp20
template<std::size_t I>
requires (I < sizeof...(Size))
static constexpr GLsizeiptr size()
{
    return std::get<I>(std::make_tuple(Size...));
}
```

Note that both functions are static members as they only depend on the template parameters.

## Closing Thoughts

That's about it for our basic UBO class template!
Remember our use case?

```cpp20
UBO<
    0, // Binding point
    std140::mat4, // camera_view
    std140::mat4  // camera_proj
>
camera_ubo;
```

The comments are hinting towards a possible improvement: being able to name the memory segments.
With zero overhead at runtime?
Probably.
Without template ugliness?
Tricky.

Additionally, some operations such as binding could be extracted into separate member functions for more flexibility.
Of course, one should also check if the `gl*` operations performed as expected.
You can find the final header here: [ubo.h](./ubo.h).
