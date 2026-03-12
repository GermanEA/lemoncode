using Moq;
using TaskMate.Application.Dtos;
using TaskMate.Application.Services;
using TaskMate.Crosscutting;
using TaskMate.Domain.Abstractions.Repositories;
using TaskMate.Domain.Entities;
using TaskMate.Domain.Enums;
using Xunit;

namespace TaskMate.Application.UnitTests.Services;

public class TaskAppServiceTests
{
    private readonly Mock<ITaskRepository> _taskRepositoryMock = new();
    private readonly Mock<IUserRepository> _userRepositoryMock = new();
    private readonly TaskAppService _service;

    private readonly Guid _userId = Guid.NewGuid();
    private readonly Guid _otherUserId = Guid.NewGuid();
    private readonly Guid _taskId = Guid.NewGuid();

    public TaskAppServiceTests()
    {
        _service = new TaskAppService(_taskRepositoryMock.Object, _userRepositoryMock.Object);
    }

    [Fact]
    public async Task AddTaskAsync_ReturnsSuccess_WhenValid()
    {
        var dto = new AddOrUpdateTaskItemDto { Title = "My Task", Status = TaskItemStatus.Pending };
        _taskRepositoryMock.Setup(r => r.AddTaskAsync(It.IsAny<TaskItem>())).ReturnsAsync(ResultFactory.Success());
        _taskRepositoryMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _service.AddTaskAsync(dto, _userId);

        Assert.True(result.IsSuccess);
        Assert.NotEqual(Guid.Empty, result.Value);
    }

    [Fact]
    public async Task GetUserTasksAsync_ReturnsTasks_ForGivenUser()
    {
        var tasks = new List<TaskItem>
        {
            new(_taskId, "Task 1", null, TaskItemStatus.Pending, null, _userId),
        };
        _taskRepositoryMock.Setup(r => r.GetTasksByUserIdAsync(_userId)).ReturnsAsync(ResultFactory.Success(tasks.AsEnumerable()));

        var result = await _service.GetUserTasksAsync(_userId);

        Assert.True(result.IsSuccess);
        Assert.Single(result.Value!);
    }

    [Fact]
    public async Task GetTaskByIdAsync_ReturnsForbidden_WhenTaskBelongsToAnotherUser()
    {
        var task = new TaskItem(_taskId, "Task", null, TaskItemStatus.Pending, null, _otherUserId);
        _taskRepositoryMock.Setup(r => r.GetTaskByIdAsync(_taskId)).ReturnsAsync(ResultFactory.Success(task));

        var result = await _service.GetTaskByIdAsync(_taskId, _userId);

        Assert.False(result.IsSuccess);
        Assert.Equal(ResultStatus.Forbidden, result.Status);
    }

    [Fact]
    public async Task GetTaskByIdAsync_ReturnsNotFound_WhenTaskDoesNotExist()
    {
        _taskRepositoryMock.Setup(r => r.GetTaskByIdAsync(_taskId))
            .ReturnsAsync(ResultFactory.NotFound<TaskItem>($"Unable to find a task with Id {_taskId}."));

        var result = await _service.GetTaskByIdAsync(_taskId, _userId);

        Assert.False(result.IsSuccess);
        Assert.Equal(ResultStatus.NotFound, result.Status);
    }

    [Fact]
    public async Task UpdateTaskAsync_ReturnsForbidden_WhenTaskBelongsToAnotherUser()
    {
        var task = new TaskItem(_taskId, "Task", null, TaskItemStatus.Pending, null, _otherUserId);
        _taskRepositoryMock.Setup(r => r.GetTaskByIdAsync(_taskId)).ReturnsAsync(ResultFactory.Success(task));

        var dto = new AddOrUpdateTaskItemDto { Title = "Updated", Status = TaskItemStatus.InProgress };
        var result = await _service.UpdateTaskAsync(_taskId, dto, _userId);

        Assert.False(result.IsSuccess);
        Assert.Equal(ResultStatus.Forbidden, result.Status);
    }

    [Fact]
    public async Task DeleteTaskAsync_ReturnsSuccess_WhenUserOwnsTask()
    {
        var task = new TaskItem(_taskId, "Task", null, TaskItemStatus.Pending, null, _userId);
        _taskRepositoryMock.Setup(r => r.GetTaskByIdAsync(_taskId)).ReturnsAsync(ResultFactory.Success(task));
        _taskRepositoryMock.Setup(r => r.DeleteTaskAsync(_taskId)).ReturnsAsync(ResultFactory.Success());
        _taskRepositoryMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _service.DeleteTaskAsync(_taskId, _userId);

        Assert.True(result.IsSuccess);
    }
}
