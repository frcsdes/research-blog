C++ 20 brought us ``std::ranges`` to generalize iterators, and ``std::views`` to consume those ranges.
When they became available, the only thing I really cared about was to bypass `begin()` and `end()` when manipulating containers.
Since then, I realized that the introduction of ranges might be as important as that of iterators.
In the following, I will go over a personal use case of ranges and views to illustrate my point.

## Accessing Image Pixels

In computer graphics programs, we must be able to store images and access their pixels conveniently.
Assuming that our image is a rectangular collection of RGB pixels, a simple implementation will look like this:

```cpp20
class Image {
public:
    struct Pixel {
        float r;
        float g;
        float b;
    };

public:
    Image(std::size_t width, std::size_t height) :
        width_{width},
        height_{height},
        buffer_{std::make_unique<Pixel[]>(getPixelCount())}
    {}

    std::size_t getPixelCount() const {
        return width_ * height_;
    }

private:
    std::size_t width_;
    std::size_t height_;
    std::unique_ptr<Pixel[]> buffer_;
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
