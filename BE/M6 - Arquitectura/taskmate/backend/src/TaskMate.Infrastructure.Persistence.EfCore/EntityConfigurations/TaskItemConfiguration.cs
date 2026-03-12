using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskMate.Infrastructure.Persistence.EfCore.Entities;

namespace TaskMate.Infrastructure.Persistence.EfCore.EntityConfigurations;

/// <summary>
/// Configures the TaskItemEntity model.
/// </summary>
internal sealed class TaskItemConfiguration : IEntityTypeConfiguration<TaskItemEntity>
{
    public void Configure(EntityTypeBuilder<TaskItemEntity> builder)
    {
        builder.ToTable("TaskItems");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(200);
        builder.Property(t => t.Description)
            .HasMaxLength(1000);
        builder.Property(t => t.Status)
            .IsRequired();
        builder.Property(t => t.DueDate)
            .IsRequired(false);
        builder.HasOne(t => t.User)
            .WithMany(u => u.OwnedTasks)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
