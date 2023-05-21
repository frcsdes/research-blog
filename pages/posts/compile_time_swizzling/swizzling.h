#pragma once

#include <array>
#include <ostream>
#include <tuple>
#include <type_traits>


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


template<class Type, std::size_t Size>
struct Vec
{
    std::array<Type, Size> coefficients;

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
};
