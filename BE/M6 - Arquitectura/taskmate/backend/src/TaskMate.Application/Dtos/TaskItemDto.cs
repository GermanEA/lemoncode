using TaskMate.Domain.Enums;

namespace TaskMate.Application.Dtos;

/// <summary>
/// Data Transfer Object for TaskItem.
/// </summary>
public class TaskItemDto
{
    /// <summary>
    /// Gets or sets the task identifier.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the title of the task.
    /// </summary>
    public string Title { get; set; }

    /// <summary>
    /// Gets or sets the description of the task.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Gets or sets the status of the task.
    /// </summary>
    public TaskItemStatus Status { get; set; }

    /// <summary>
    /// Gets or sets the optional due date of the task.
    /// </summary>
    public DateTime? DueDate { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the user who owns the task.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="TaskItemDto"/> class.
    /// </summary>
    public TaskItemDto(Guid id, string title, string? description, TaskItemStatus status, DateTime? dueDate, Guid userId)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);

        Id = id;
        Title = title;
        Description = description;
        Status = status;
        DueDate = dueDate;
        UserId = userId;
    }
}
