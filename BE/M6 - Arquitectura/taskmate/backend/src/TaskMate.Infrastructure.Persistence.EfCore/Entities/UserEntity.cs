namespace TaskMate.Infrastructure.Persistence.EfCore.Entities;

/// <summary>
/// Represents a user entity in the database.
/// </summary>
public class UserEntity
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public ICollection<TaskItemEntity> OwnedTasks { get; set; } = new List<TaskItemEntity>();
    public ICollection<CollaborationEntity> Collaborations { get; set; } = new List<CollaborationEntity>();
}
