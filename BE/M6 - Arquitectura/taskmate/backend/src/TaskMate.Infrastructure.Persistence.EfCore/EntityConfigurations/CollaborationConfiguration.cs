using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskMate.Infrastructure.Persistence.EfCore.Entities;

namespace TaskMate.Infrastructure.Persistence.EfCore.EntityConfigurations;

/// <summary>
/// Configures the CollaborationEntity model (join table between User and TaskItem).
/// </summary>
internal sealed class CollaborationConfiguration : IEntityTypeConfiguration<CollaborationEntity>
{
    public void Configure(EntityTypeBuilder<CollaborationEntity> builder)
    {
        builder.ToTable("Collaborations");
        builder.HasKey(c => new { c.UserId, c.TaskItemId });
        builder.HasOne(c => c.User)
            .WithMany(u => u.Collaborations)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(c => c.TaskItem)
            .WithMany(t => t.Collaborations)
            .HasForeignKey(c => c.TaskItemId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
