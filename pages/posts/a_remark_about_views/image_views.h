#include <iostream>
#include <memory>
#include <ranges>


class Image {
public:
    struct Pixel {
        float r;
        float g;
        float b;
    };

    struct UV {
        float u;
        float v;
    };

    struct PixelAndUV {
        Pixel& pixel;
        UV uv;
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

public:
    auto viewIndices() const {
        return std::ranges::iota_view{0U, getPixelCount()};
    }

    auto viewPixels() {
        auto get_pixel = [this](std::size_t i) -> Pixel& { return buffer_[i]; };
        return viewIndices() | std::views::transform(get_pixel);
    }

    auto viewPixelsAndUV() {
        return viewIndices() | std::views::transform([this](std::size_t i) {
            auto u = (static_cast<float>(i % width_) + 0.5f) / width_;
            auto v = (static_cast<float>(i / width_) + 0.5f) / height_;
            return PixelAndUV{buffer_[i], {u, v}};
        });
    }

private:
    std::size_t width_;
    std::size_t height_;
    std::unique_ptr<Pixel[]> buffer_;
};


int main() {
    Image image{4, 3};
    
    for (auto&& pixel : image.viewPixels()) {
        pixel.r = 1;
    }
    
    for (auto&& [pixel, uv] : image.viewPixelsAndUV()) {
        std::cout
            << "At (" << uv.u << ", " << uv.v << ") "
            << "R = " << pixel.r << '\n';
    }
    
    return 0;
}
