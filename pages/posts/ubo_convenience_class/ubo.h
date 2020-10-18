//#include <OpenGL wrapper headers>
#include <GL/gl.h>
#include <tuple>


namespace std140 {
    inline GLsizeiptr constexpr scal = 4;
    inline GLsizeiptr constexpr vec2 = 2 * scal;
    inline GLsizeiptr constexpr vec3 = 4 * scal;
    inline GLsizeiptr constexpr vec4 = 4 * scal;
    inline GLsizeiptr constexpr mat3 = 3 * vec4;
    inline GLsizeiptr constexpr mat4 = 4 * vec4;
}


template<GLuint Bind, GLsizeiptr... Size>
class UBO {
public:
    UBO() {
        glGenBuffers(1, &buffer_id_);
        glBindBuffer(GL_UNIFORM_BUFFER, buffer_id_);
        glBufferData(GL_UNIFORM_BUFFER, (Size + ...), nullptr, GL_STATIC_DRAW);
        glBindBufferRange(GL_UNIFORM_BUFFER, Bind, buffer_id_, 0, (Size + ...));
    }

    ~UBO() {
        glDeleteBuffers(1, &buffer_id_);
    }

    template<std::size_t I>
    requires (I < sizeof...(Size))
    void write(GLvoid const* data) {
        glBindBuffer(GL_UNIFORM_BUFFER, buffer_id_);
        glBufferSubData(GL_UNIFORM_BUFFER, offset<I>(), size<I>(), data);
    }

private:
    template<std::size_t I>
    requires (I < sizeof...(Size))
    static constexpr GLintptr offset() noexcept {
        if constexpr (I == 0)
            return 0;
        else
            return size<I - 1>() + offset<I - 1>();
    }

    template<std::size_t I>
    requires (I < sizeof...(Size))
    static constexpr GLsizeiptr size() noexcept {
        return std::get<I>(std::forward_as_tuple(Size...));
    }

private:
    GLuint buffer_id_ = 0;
};
