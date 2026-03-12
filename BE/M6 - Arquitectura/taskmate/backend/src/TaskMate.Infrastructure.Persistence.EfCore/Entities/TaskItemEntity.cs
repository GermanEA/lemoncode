using TaskMate.Domain.Enums;

namespace TaskMate.Infrastructure.Persistence.EfCore.Entities;

/// <summary>
/// Represents a task item entity in the database.
/// </summary>
public class TaskItemEntity
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public TaskItemStatus Status { get; set; }
    public DateTime? DueDate { get; set; }
    public Guid UserId { get; set; }
    public UserEntity? User { get; set; }
    public ICollection<CollaborationEntity> Collaborations { get; set; } = new List<CollaborationEntity>();
}
