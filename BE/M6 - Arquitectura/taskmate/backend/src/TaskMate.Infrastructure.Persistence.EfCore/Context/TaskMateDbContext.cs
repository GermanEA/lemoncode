using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using TaskMate.Infrastructure.Persistence.EfCore.Entities;

namespace TaskMate.Infrastructure.Persistence.EfCore.Context;

/// <summary>
/// Represents the database context for the TaskMate application.
/// </summary>
[SuppressMessage("Design", "CA1062:Validate arguments of public methods", Justification = "EF Core checks nulls internally.")]
public class TaskMateDbContext : DbContext
{
    /// <summary>
    /// Initializes a new instance of the <see cref="TaskMateDbContext"/> class.
    /// </summary>
    public TaskMateDbContext(DbContextOptions options) : base(options)
    {
    }

    /// <summary>
    /// Gets or sets the DbSet for User entities.
    /// </summary>
    public DbSet<UserEntity> Users { get; set; }

    /// <summary>
    /// Gets or sets the DbSet for TaskItem entities.
    /// </summary>
    public DbSet<TaskItemEntity> TaskItems { get; set; }

    /// <summary>
    /// Gets or sets the DbSet for Collaboration entities.
    /// </summary>
    public DbSet<CollaborationEntity> Collaborations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TaskMateDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
