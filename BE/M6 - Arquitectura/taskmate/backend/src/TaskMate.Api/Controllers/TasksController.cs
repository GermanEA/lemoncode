using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TaskMate.Api.Extensions;
using TaskMate.Application.Abstractions.Services;
using TaskMate.Application.Dtos;

namespace TaskMate.Api.Controllers;

/// <summary>
/// Controller to manage task items.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ITaskAppService _taskAppService;

    /// <summary>
    /// Initializes a new instance of <see cref="TasksController"/>.
    /// </summary>
    public TasksController(ITaskAppService taskAppService)
    {
        _taskAppService = taskAppService;
    }

    private Guid GetCurrentUserId()
    {
        var sub = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

        return Guid.TryParse(sub, out var userId)
            ? userId
            : throw new InvalidOperationException("JWT 'sub' claim is missing or not a valid Guid.");
    }

    /// <summary>
    /// Returns all tasks belonging to the authenticated user.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var result = await _taskAppService.GetUserTasksAsync(GetCurrentUserId()).ConfigureAwait(false);
        return result.ToActionResult(tasks => Ok(tasks));
    }

    /// <summary>
    /// Returns a task by its identifier (only if it belongs to the authenticated user).
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetTaskById([FromRoute] Guid id)
    {
        var result = await _taskAppService.GetTaskByIdAsync(id, GetCurrentUserId()).ConfigureAwait(false);
        return result.ToActionResult(task => Ok(task));
    }

    /// <summary>
    /// Creates a new task assigned to the authenticated user.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] AddOrUpdateTaskItemDto dto)
    {
        ArgumentNullException.ThrowIfNull(dto);
        var userId = GetCurrentUserId();
        var result = await _taskAppService.AddTaskAsync(dto, userId).ConfigureAwait(false);
        return result.ToActionResult(taskId =>
        {
            var created = new TaskItemDto(
                id: taskId,
                title: dto.Title!,
                description: dto.Description,
                status: dto.Status!.Value,
                dueDate: dto.DueDate,
                userId: userId);

            return CreatedAtAction(nameof(GetTaskById), new { id = taskId }, created);
        });
    }

    /// <summary>
    /// Updates an existing task (only if it belongs to the authenticated user).
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateTask([FromRoute] Guid id, [FromBody] AddOrUpdateTaskItemDto dto)
    {
        ArgumentNullException.ThrowIfNull(dto);
        var result = await _taskAppService.UpdateTaskAsync(id, dto, GetCurrentUserId()).ConfigureAwait(false);
        return result.ToActionResult(() => NoContent());
    }

    /// <summary>
    /// Deletes a task (only if it belongs to the authenticated user).
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteTask([FromRoute] Guid id)
    {
        var result = await _taskAppService.DeleteTaskAsync(id, GetCurrentUserId()).ConfigureAwait(false);
        return result.ToActionResult(() => NoContent());
    }

    /// <summary>
    /// Adds a collaborator to a task (only if the authenticated user owns the task).
    /// </summary>
    [HttpPost("{id:guid}/collaborators/{userId:guid}")]
    public async Task<IActionResult> AddCollaborator([FromRoute] Guid id, [FromRoute] Guid userId)
    {
        var result = await _taskAppService.AddCollaboratorAsync(id, userId, GetCurrentUserId()).ConfigureAwait(false);
        return result.ToActionResult(() => NoContent());
    }
}
