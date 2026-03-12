using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskMate.Infrastructure.Persistence.EfCore.Entities;

namespace TaskMate.Infrastructure.Persistence.EfCore.EntityConfigurations;

/// <summary>
/// Configures the UserEntity model.
/// </summary>
internal sealed class UserConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Name)
            .IsRequired()
            .HasMaxLength(200);
        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(300);
        builder.HasIndex(u => u.Email)
            .IsUnique();
    }
}
