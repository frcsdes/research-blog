#include <memory>
#include <type_traits>


template<template<class> class Pointer, class OtherType, class Type>
concept IsConvertibleSmart =
    std::is_convertible_v<OtherType*, Type*> && (
        std::is_same_v<Pointer<Type>, std::unique_ptr<Type>> ||
        std::is_same_v<Pointer<Type>, std::shared_ptr<Type>>
    );


template<class Type>
class DumbPointer {
public:
    constexpr DumbPointer() noexcept {}
    constexpr DumbPointer(nullptr_t) noexcept {}

    template<class OtherType>
    requires (std::is_convertible_v<OtherType*, Type*>)
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

    constexpr Type* get() const noexcept {
        return pointer_;
    }

private:
    Type* pointer_ = nullptr;
};
