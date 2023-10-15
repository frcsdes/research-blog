C++ 20 brought us [ranges](https://en.cppreference.com/w/cpp/ranges) as a generalization of iterators, and a number of views to manipulate those ranges expressively.
Views can be leveraged to complement the interface of classes that expose a resource under different levels of abstraction.
Let's explore this idea on a simple example: a class that holds a 2D image.

## Accessing Image Pixels

In computer graphics programs, we must be able to store images and access their pixels conveniently.
Assuming that our image is a rectangular collection of RGB pixels, a simple implementation will look like this:

```cpp20
struct Pixel
{
    float r;
    float g;
    float b;
};

class Image
{
public:

    Image(std::size_t width, std::size_t height) :
        width_{width},
        height_{height},
        buffer_{getPixelCount()}
    {}

    auto getPixelCount() const
    {
        return buffer_.size();
    }

private:

    std::size_t width_;
    std::size_t height_;
    std::vector<Pixel> buffer_;
};
```

PBRT example
More dimensions
UV coordinates

Performance: not necessarily forward

Responsibility to the class
=> before: indices
=> now: every possible byproduct

No control over type
=> header definition
=> order is important
