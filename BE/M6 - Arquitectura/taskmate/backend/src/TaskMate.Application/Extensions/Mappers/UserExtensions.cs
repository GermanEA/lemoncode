using TaskMate.Application.Dtos;
using TaskMate.Domain.Entities;

namespace TaskMate.Application.Extensions.Mappers;

/// <summary>
/// Provides mapping methods between User domain objects and DTOs.
/// </summary>
public static class UserExtensions
{
    /// <summary>
    /// Maps a <see cref="User"/> domain model to a <see cref="UserDto"/>.
    /// </summary>
    public static UserDto ToDto(this User user)
    {
        ArgumentNullException.ThrowIfNull(user);
        return new UserDto(user.Id, user.Name, user.Email);
    }
}
