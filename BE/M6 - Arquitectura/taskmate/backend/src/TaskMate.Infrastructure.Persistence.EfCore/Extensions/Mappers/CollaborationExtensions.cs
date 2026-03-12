using TaskMate.Domain.Entities;
using TaskMate.Infrastructure.Persistence.EfCore.Entities;

namespace TaskMate.Infrastructure.Persistence.EfCore.Extensions.Mappers;

/// <summary>
/// Provides methods to map between Collaboration domain objects and CollaborationEntity data objects.
/// </summary>
public static class CollaborationExtensions
{
    /// <summary>
    /// Maps a Collaboration domain model to a CollaborationEntity.
    /// </summary>
    public static CollaborationEntity ToDataEntity(this Collaboration collaboration)
    {
        ArgumentNullException.ThrowIfNull(collaboration);

        return new CollaborationEntity
        {
            UserId = collaboration.UserId,
            TaskItemId = collaboration.TaskItemId,
        };
    }
}
