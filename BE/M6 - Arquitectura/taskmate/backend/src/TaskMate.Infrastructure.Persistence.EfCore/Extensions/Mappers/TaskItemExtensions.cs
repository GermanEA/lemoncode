using TaskMate.Domain.Entities;
using TaskMate.Infrastructure.Persistence.EfCore.Entities;

namespace TaskMate.Infrastructure.Persistence.EfCore.Extensions.Mappers;

/// <summary>
/// Provides methods to map between TaskItem domain objects and TaskItemEntity data objects.
/// </summary>
public static class TaskItemExtensions
{
    /// <summary>
    /// Maps a TaskItem domain model to a TaskItemEntity.
    /// </summary>
    public static TaskItemEntity ToDataEntity(this TaskItem task)
    {
        ArgumentNullException.ThrowIfNull(task);

        return new TaskItemEntity
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            DueDate = task.DueDate,
            UserId = task.UserId,
        };
    }

    /// <summary>
    /// Maps a TaskItemEntity to a TaskItem domain model.
    /// </summary>
    public static TaskItem ToDomain(this TaskItemEntity entity)
    {
        ArgumentNullException.ThrowIfNull(entity);

        return new TaskItem(
            id: entity.Id,
            title: entity.Title,
            description: entity.Description,
            status: entity.Status,
            dueDate: entity.DueDate,
            userId: entity.UserId
        );
    }

    /// <summary>
    /// Updates a TaskItemEntity from a TaskItem domain model.
    /// </summary>
    public static void UpdateFromDomain(this TaskItemEntity entity, TaskItem task)
    {
        ArgumentNullException.ThrowIfNull(entity);
        ArgumentNullException.ThrowIfNull(task);

        entity.Title = task.Title;
        entity.Description = task.Description;
        entity.Status = task.Status;
        entity.DueDate = task.DueDate;
        entity.UserId = task.UserId;
    }
}
