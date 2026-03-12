using TaskMate.Crosscutting;
using TaskMate.Domain.Entities;

namespace TaskMate.Domain.Abstractions.Repositories;

/// <summary>
/// Interface for task item repository operations.
/// </summary>
public interface ITaskRepository
{
    /// <summary>
    /// Adds a new task item asynchronously.
    /// </summary>
    Task<Result> AddTaskAsync(TaskItem task);

    /// <summary>
    /// Updates an existing task item asynchronously.
    /// </summary>
    Task<Result> UpdateTaskAsync(TaskItem task);

    /// <summary>
    /// Deletes a task item asynchronously by its identifier.
    /// </summary>
    Task<Result> DeleteTaskAsync(Guid taskId);

    /// <summary>
    /// Gets a task item by its identifier asynchronously.
    /// </summary>
    Task<Result<TaskItem>> GetTaskByIdAsync(Guid taskId);

    /// <summary>
    /// Gets all task items belonging to a specific user asynchronously.
    /// </summary>
    Task<Result<IEnumerable<TaskItem>>> GetTasksByUserIdAsync(Guid userId);

    /// <summary>
    /// Adds a collaborator to a task item asynchronously.
    /// </summary>
    Task<Result> AddCollaboratorAsync(Collaboration collaboration);

    /// <summary>
    /// Checks whether a collaboration already exists for a given user and task.
    /// </summary>
    Task<Result<bool>> CollaborationExistsAsync(Guid userId, Guid taskItemId);

    /// <summary>
    /// Saves changes to the repository asynchronously.
    /// </summary>
    Task SaveChangesAsync();
}
