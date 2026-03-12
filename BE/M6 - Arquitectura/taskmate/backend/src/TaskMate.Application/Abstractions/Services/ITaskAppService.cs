using TaskMate.Application.Dtos;
using TaskMate.Crosscutting;

namespace TaskMate.Application.Abstractions.Services;

/// <summary>
/// Interface for the task application service.
/// </summary>
public interface ITaskAppService
{
    /// <summary>
    /// Gets all tasks belonging to the specified user.
    /// </summary>
    Task<Result<IEnumerable<TaskItemDto>>> GetUserTasksAsync(Guid userId);

    /// <summary>
    /// Gets a task by its identifier, verifying ownership.
    /// </summary>
    Task<Result<TaskItemDto>> GetTaskByIdAsync(Guid taskId, Guid userId);

    /// <summary>
    /// Creates a new task assigned to the specified user.
    /// </summary>
    Task<Result<Guid>> AddTaskAsync(AddOrUpdateTaskItemDto dto, Guid userId);

    /// <summary>
    /// Updates an existing task, verifying ownership.
    /// </summary>
    Task<Result> UpdateTaskAsync(Guid taskId, AddOrUpdateTaskItemDto dto, Guid userId);

    /// <summary>
    /// Deletes a task, verifying ownership.
    /// </summary>
    Task<Result> DeleteTaskAsync(Guid taskId, Guid userId);

    /// <summary>
    /// Adds a collaborator to a task, verifying that the requesting user owns the task.
    /// </summary>
    Task<Result> AddCollaboratorAsync(Guid taskId, Guid collaboratorUserId, Guid requestingUserId);
}
