#pragma once

#include <concepts>
#include <memory>


template<template<class> class Pointer, class OtherType, class Type>
concept IsConvertibleSmart =
std::convertible_to<OtherType*, Type*> && (
    std::same_as<Pointer<OtherType>, std::unique_ptr<OtherType>> ||
    std::same_as<Pointer<OtherType>, std::shared_ptr<OtherType>>
);


template<class Type>
class DumbPointer
{
public:

    constexpr DumbPointer() noexcept {}
    constexpr DumbPointer(std::nullptr_t) noexcept {}

    template<class OtherType>
    requires (std::convertible_to<OtherType*, Type*>)
    constexpr DumbPointer(DumbPointer<OtherType> other) noexcept :
        pointer_{other.get()}
    {}

    template<template<class> class Smart, class OtherType>
    requires (IsConvertibleSmart<Smart, OtherType, Type>)
    constexpr DumbPointer(Smart<OtherType> const& pointer) noexcept :
        pointer_{pointer.get()}
    {}

    template<template<class> class Smart, class OtherType>
    requires (IsConvertibleSmart<Smart, OtherType, Type>)
    DumbPointer(Smart<OtherType>&&) = delete;

    constexpr Type* get() const noexcept
    {
        return pointer_;
    }

private:

    Type* pointer_{nullptr};
};
