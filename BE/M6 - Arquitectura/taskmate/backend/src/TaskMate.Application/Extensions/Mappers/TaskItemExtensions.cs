using TaskMate.Application.Dtos;
using TaskMate.Domain.Entities;
using TaskMate.Domain.Enums;

namespace TaskMate.Application.Extensions.Mappers;

/// <summary>
/// Provides mapping methods between TaskItem domain objects and DTOs.
/// </summary>
public static class TaskItemExtensions
{
    /// <summary>
    /// Maps a <see cref="TaskItem"/> domain model to a <see cref="TaskItemDto"/>.
    /// </summary>
    public static TaskItemDto ToDto(this TaskItem task)
    {
        ArgumentNullException.ThrowIfNull(task);

        return new TaskItemDto(
            id: task.Id,
            title: task.Title,
            description: task.Description,
            status: task.Status,
            dueDate: task.DueDate,
            userId: task.UserId
        );
    }

    /// <summary>
    /// Maps an <see cref="IEnumerable{TaskItem}"/> to an <see cref="IEnumerable{TaskItemDto}"/>.
    /// </summary>
    public static IEnumerable<TaskItemDto> ToDtoList(this IEnumerable<TaskItem> tasks)
    {
        return tasks is null
            ? throw new ArgumentNullException(nameof(tasks))
            : tasks.Select(t => t.ToDto());
    }

    /// <summary>
    /// Maps an <see cref="AddOrUpdateTaskItemDto"/> to a <see cref="TaskItem"/> domain entity.
    /// </summary>
    public static TaskItem ToEntity(this AddOrUpdateTaskItemDto dto, Guid userId, Guid? taskId = null)
    {
        ArgumentNullException.ThrowIfNull(dto);

        return new TaskItem(
            id: taskId,
            title: dto.Title!,
            description: dto.Description,
            status: dto.Status ?? TaskItemStatus.Pending,
            dueDate: dto.DueDate,
            userId: userId
        );
    }
}
