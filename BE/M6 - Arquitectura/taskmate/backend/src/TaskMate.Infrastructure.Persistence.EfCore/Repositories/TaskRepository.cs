using Microsoft.EntityFrameworkCore;
using TaskMate.Crosscutting;
using TaskMate.Domain.Abstractions.Repositories;
using TaskMate.Domain.Entities;
using TaskMate.Infrastructure.Persistence.EfCore.Context;
using TaskMate.Infrastructure.Persistence.EfCore.Extensions.Mappers;

namespace TaskMate.Infrastructure.Persistence.EfCore.Repositories;

/// <summary>
/// EF Core implementation of <see cref="ITaskRepository"/>.
/// </summary>
public class TaskRepository(TaskMateDbContext context) : RepositoryBase(context), ITaskRepository
{
    private readonly TaskMateDbContext _context = context;

    /// <inheritdoc/>
    public async Task<Result> AddTaskAsync(TaskItem task)
    {
        ArgumentNullException.ThrowIfNull(task);
        await _context.TaskItems.AddAsync(task.ToDataEntity()).ConfigureAwait(false);
        return ResultFactory.Success();
    }

    /// <inheritdoc/>
    public async Task<Result> UpdateTaskAsync(TaskItem task)
    {
        ArgumentNullException.ThrowIfNull(task);

        var entity = await _context.TaskItems.FindAsync(task.Id).ConfigureAwait(false);
        if (entity is null)
        {
            return ResultFactory.NotFound($"Unable to find a task with Id {task.Id}.");
        }

        entity.UpdateFromDomain(task);
        return ResultFactory.Success();
    }

    /// <inheritdoc/>
    public async Task<Result> DeleteTaskAsync(Guid taskId)
    {
        if (!await _context.TaskItems.AnyAsync(t => t.Id == taskId).ConfigureAwait(false))
        {
            return ResultFactory.NotFound($"Unable to find a task with Id {taskId}.");
        }

        if (IsInMemoryDb())
        {
            var entity = await _context.TaskItems.FindAsync(taskId).ConfigureAwait(false);
            _context.TaskItems.Remove(entity!);
        }
        else
        {
            await _context.TaskItems.Where(t => t.Id == taskId)
                .ExecuteDeleteAsync().ConfigureAwait(false);
        }

        return ResultFactory.Success();
    }

    /// <inheritdoc/>
    public async Task<Result<TaskItem>> GetTaskByIdAsync(Guid taskId)
    {
        var entity = await _context.TaskItems
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == taskId)
            .ConfigureAwait(false);

        return entity is null
            ? ResultFactory.NotFound<TaskItem>($"Unable to find a task with Id {taskId}.")
            : ResultFactory.Success(entity.ToDomain());
    }

    /// <inheritdoc/>
    public async Task<Result<IEnumerable<TaskItem>>> GetTasksByUserIdAsync(Guid userId)
    {
        var tasks = await _context.TaskItems
            .Where(t => t.UserId == userId)
            .AsNoTracking()
            .Select(t => t.ToDomain())
            .ToListAsync()
            .ConfigureAwait(false);

        return ResultFactory.Success(tasks.AsEnumerable());
    }

    /// <inheritdoc/>
    public async Task<Result> AddCollaboratorAsync(Collaboration collaboration)
    {
        ArgumentNullException.ThrowIfNull(collaboration);
        await _context.Collaborations.AddAsync(collaboration.ToDataEntity()).ConfigureAwait(false);
        return ResultFactory.Success();
    }

    /// <inheritdoc/>
    public async Task<Result<bool>> CollaborationExistsAsync(Guid userId, Guid taskItemId)
    {
        var exists = await _context.Collaborations
            .AnyAsync(c => c.UserId == userId && c.TaskItemId == taskItemId)
            .ConfigureAwait(false);

        return ResultFactory.Success(exists);
    }

    /// <inheritdoc/>
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync().ConfigureAwait(false);
}
