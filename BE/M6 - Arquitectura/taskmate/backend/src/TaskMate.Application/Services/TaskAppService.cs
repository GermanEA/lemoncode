using TaskMate.Application.Abstractions.Services;
using TaskMate.Application.Dtos;
using TaskMate.Application.Extensions.Mappers;
using TaskMate.Crosscutting;
using TaskMate.Crosscutting.Exceptions;
using TaskMate.Crosscutting.Extensions;
using TaskMate.Domain.Abstractions.Repositories;
using TaskMate.Domain.Entities;

namespace TaskMate.Application.Services;

/// <summary>
/// Application service for managing task items.
/// </summary>
public class TaskAppService : ITaskAppService
{
    private readonly ITaskRepository _taskRepository;
    private readonly IUserRepository _userRepository;

    public TaskAppService(ITaskRepository taskRepository, IUserRepository userRepository)
    {
        _taskRepository = taskRepository ?? throw new ArgumentNullException(nameof(taskRepository));
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
    }

    public async Task<Result<IEnumerable<TaskItemDto>>> GetUserTasksAsync(Guid userId)
    {
        try
        {
            var tasks = await _taskRepository.GetTasksByUserIdAsync(userId).EnsureSuccessAsync().ConfigureAwait(false);
            return ResultFactory.Success(tasks.ToDtoList());
        }
        catch (ResultFailureException ex)
        {
            return ResultFactory.PropagateFailure<IEnumerable<TaskItemDto>>(ex.Result);
        }
    }

    public async Task<Result<TaskItemDto>> GetTaskByIdAsync(Guid taskId, Guid userId)
    {
        try
        {
            var task = await _taskRepository.GetTaskByIdAsync(taskId).EnsureSuccessAsync().ConfigureAwait(false);
            CheckOwnership(task, userId).EnsureSuccess();
            return ResultFactory.Success(task.ToDto());
        }
        catch (ResultFailureException ex)
        {
            return ResultFactory.PropagateFailure<TaskItemDto>(ex.Result);
        }
    }

    public async Task<Result<Guid>> AddTaskAsync(AddOrUpdateTaskItemDto dto, Guid userId)
    {
        ArgumentNullException.ThrowIfNull(dto);

        try
        {
            var task = dto.ToEntity(userId);
            await _taskRepository.AddTaskAsync(task).EnsureSuccessAsync().ConfigureAwait(false);
            await _taskRepository.SaveChangesAsync().ConfigureAwait(false);
            return ResultFactory.Success(task.Id);
        }
        catch (ResultFailureException ex)
        {
            return ResultFactory.PropagateFailure<Guid>(ex.Result);
        }
    }

    public async Task<Result> UpdateTaskAsync(Guid taskId, AddOrUpdateTaskItemDto dto, Guid userId)
    {
        ArgumentNullException.ThrowIfNull(dto);

        try
        {
            await CheckOwnershipAsync(taskId, userId).EnsureSuccessAsync().ConfigureAwait(false);
            var task = dto.ToEntity(userId, taskId);
            await _taskRepository.UpdateTaskAsync(task).EnsureSuccessAsync().ConfigureAwait(false);
            await _taskRepository.SaveChangesAsync().ConfigureAwait(false);
            return ResultFactory.Success();
        }
        catch (ResultFailureException ex)
        {
            return ResultFactory.PropagateFailure(ex.Result);
        }
    }

    public async Task<Result> DeleteTaskAsync(Guid taskId, Guid userId)
    {
        try
        {
            await CheckOwnershipAsync(taskId, userId).EnsureSuccessAsync().ConfigureAwait(false);
            await _taskRepository.DeleteTaskAsync(taskId).EnsureSuccessAsync().ConfigureAwait(false);
            await _taskRepository.SaveChangesAsync().ConfigureAwait(false);
            return ResultFactory.Success();
        }
        catch (ResultFailureException ex)
        {
            return ResultFactory.PropagateFailure(ex.Result);
        }
    }

    public async Task<Result> AddCollaboratorAsync(Guid taskId, Guid collaboratorUserId, Guid requestingUserId)
    {
        try
        {
            await CheckOwnershipAsync(taskId, requestingUserId).EnsureSuccessAsync().ConfigureAwait(false);

            var userExists = await _userRepository.UserExistsAsync(collaboratorUserId).EnsureSuccessAsync().ConfigureAwait(false);
            if (!userExists)
            {
                return ResultFactory.NotFound($"User with Id {collaboratorUserId} was not found.");
            }

            var alreadyCollaborates = await _taskRepository.CollaborationExistsAsync(collaboratorUserId, taskId).EnsureSuccessAsync().ConfigureAwait(false);
            if (alreadyCollaborates)
            {
                return ResultFactory.Conflict($"User {collaboratorUserId} is already a collaborator of task {taskId}.");
            }

            var collaboration = new Collaboration(collaboratorUserId, taskId);
            await _taskRepository.AddCollaboratorAsync(collaboration).EnsureSuccessAsync().ConfigureAwait(false);
            await _taskRepository.SaveChangesAsync().ConfigureAwait(false);
            return ResultFactory.Success();
        }
        catch (ResultFailureException ex)
        {
            return ResultFactory.PropagateFailure(ex.Result);
        }
    }

    private async Task<Result> CheckOwnershipAsync(Guid taskId, Guid userId)
    {
        var taskResult = await _taskRepository.GetTaskByIdAsync(taskId).ConfigureAwait(false);
        if (!taskResult.IsSuccess)
        {
            return ResultFactory.PropagateFailure(taskResult);
        }

        return CheckOwnership(taskResult.Value, userId);
    }

    private static Result CheckOwnership(TaskItem task, Guid userId)
    {
        return task.UserId == userId
            ? ResultFactory.Success()
            : ResultFactory.Forbidden($"You do not have permission to access task with Id {task.Id}.");
    }
}
