namespace TaskMate.Domain.Enums;

/// <summary>
/// Represents the status of a task item.
/// </summary>
public enum TaskItemStatus
{
    /// <summary>
    /// The task is pending and has not been started.
    /// </summary>
    Pending,

    /// <summary>
    /// The task is currently in progress.
    /// </summary>
    InProgress,

    /// <summary>
    /// The task has been completed.
    /// </summary>
    Completed,
}
