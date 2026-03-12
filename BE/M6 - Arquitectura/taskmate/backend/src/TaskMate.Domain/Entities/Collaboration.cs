namespace TaskMate.Domain.Entities;

/// <summary>
/// Represents a collaboration relationship between a user and a task item.
/// </summary>
public class Collaboration
{
    /// <summary>
    /// Gets the unique identifier of the collaborating user.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Gets the unique identifier of the task item being collaborated on.
    /// </summary>
    public Guid TaskItemId { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Collaboration"/> class.
    /// </summary>
    /// <param name="userId">The identifier of the collaborating user.</param>
    /// <param name="taskItemId">The identifier of the task item.</param>
    public Collaboration(Guid userId, Guid taskItemId)
    {
        UserId = userId;
        TaskItemId = taskItemId;
    }
}
