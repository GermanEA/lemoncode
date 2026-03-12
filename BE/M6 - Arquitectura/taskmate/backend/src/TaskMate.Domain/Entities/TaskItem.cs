using TaskMate.Domain.Enums;

namespace TaskMate.Domain.Entities;

/// <summary>
/// Represents a task item owned by a user.
/// </summary>
public class TaskItem
{
    /// <summary>
    /// Gets the unique identifier of the task.
    /// </summary>
    public Guid Id { get; private set; }

    /// <summary>
    /// Gets the title of the task.
    /// </summary>
    public string Title { get; private set; }

    /// <summary>
    /// Gets the description of the task.
    /// </summary>
    public string? Description { get; private set; }

    /// <summary>
    /// Gets the current status of the task.
    /// </summary>
    public TaskItemStatus Status { get; private set; }

    /// <summary>
    /// Gets the optional due date of the task.
    /// </summary>
    public DateTime? DueDate { get; private set; }

    /// <summary>
    /// Gets the unique identifier of the user who owns the task.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="TaskItem"/> class.
    /// </summary>
    /// <param name="title">The title of the task.</param>
    /// <param name="description">The optional description.</param>
    /// <param name="status">The status of the task.</param>
    /// <param name="dueDate">The optional due date.</param>
    /// <param name="userId">The owner user identifier.</param>
    public TaskItem(string title, string? description, TaskItemStatus status, DateTime? dueDate, Guid userId)
        : this(Guid.NewGuid(), title, description, status, dueDate, userId)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="TaskItem"/> class.
    /// </summary>
    /// <param name="id">The unique identifier for the task. If null, a new GUID will be generated.</param>
    /// <param name="title">The title of the task.</param>
    /// <param name="description">The optional description.</param>
    /// <param name="status">The status of the task.</param>
    /// <param name="dueDate">The optional due date.</param>
    /// <param name="userId">The owner user identifier.</param>
    public TaskItem(Guid? id, string title, string? description, TaskItemStatus status, DateTime? dueDate, Guid userId)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);

        Id = id ?? Guid.NewGuid();
        Title = title;
        Description = description;
        Status = status;
        DueDate = dueDate;
        UserId = userId;
    }
}
