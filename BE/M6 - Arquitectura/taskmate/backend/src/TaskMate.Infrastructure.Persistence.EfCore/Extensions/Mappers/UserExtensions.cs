using TaskMate.Domain.Entities;
using TaskMate.Infrastructure.Persistence.EfCore.Entities;

namespace TaskMate.Infrastructure.Persistence.EfCore.Extensions.Mappers;

/// <summary>
/// Provides methods to map between User domain objects and UserEntity data objects.
/// </summary>
public static class UserExtensions
{
    /// <summary>
    /// Maps a User domain model to a UserEntity.
    /// </summary>
    public static UserEntity ToDataEntity(this User user)
    {
        ArgumentNullException.ThrowIfNull(user);

        return new UserEntity
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
        };
    }

    /// <summary>
    /// Maps a UserEntity to a User domain model.
    /// </summary>
    public static User ToDomain(this UserEntity entity)
    {
        ArgumentNullException.ThrowIfNull(entity);

        return new User(
            id: entity.Id,
            name: entity.Name,
            email: entity.Email
        );
    }
}
