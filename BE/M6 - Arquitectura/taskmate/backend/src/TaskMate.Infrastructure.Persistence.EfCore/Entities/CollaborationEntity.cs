namespace TaskMate.Infrastructure.Persistence.EfCore.Entities;

/// <summary>
/// Represents a collaboration entity in the database (join table between User and TaskItem).
/// </summary>
public class CollaborationEntity
{
    public Guid UserId { get; set; }
    public Guid TaskItemId { get; set; }
    public UserEntity? User { get; set; }
    public TaskItemEntity? TaskItem { get; set; }
}
