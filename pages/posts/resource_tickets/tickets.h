#pragma once

#include <any>
#include <concepts>
#include <functional>
#include <typeinfo>
#include <unordered_map>


template<class Type>
concept Reproducible = Type::is_equality_preserving && Type::is_read_only;

template<class Type>
concept Hashable = requires(Type value)
{
    { std::hash<Type>{}(value) } -> std::convertible_to<std::size_t>;
};


template<Hashable Type>
inline void hashCombine(std::size_t& seed, Type const& value)
{
    seed ^= std::hash<Type>{}(value) + 0x9E3779B9 + (seed << 6) + (seed >> 2);
}


template<class Type>
class Ticket
{
public:

    template<class... Args>
    explicit Ticket(Args const&... args) :
        number_{
            [&args...]()
            {
                auto seed = typeid(Type).hash_code();
                (hashCombine(seed, args), ...);
                return seed;
            }()
        }
    {}

    std::size_t number() const
    {
        return number_;
    }

private:

    std::size_t number_;
};


class Manager
{
public:

    template<Reproducible Type, class... Args>
    Ticket<Type> emplace(Args&&... args)
    {
        Ticket<Type> ticket{args...};

        resources_.try_emplace(
            ticket.number(),
            std::in_place_type_t<Type>{},
            std::forward<Args>(args)...
        );

        return ticket;
    }

    template<class Type>
    Type const& get(Ticket<Type> ticket) const
    {
        return std::any_cast<Type const&>(resources_.at(ticket.number()));
    }

private:

    std::unordered_map<std::size_t, std::any const> resources_;
};
