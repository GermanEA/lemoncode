using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoursesOnlineSystem.Models.EntityConfig
{
    public class ProfileConfig : IEntityTypeConfiguration<Profile>
    {
        public void Configure(EntityTypeBuilder<Profile> builder)
        {
            builder.HasKey(p => p.ProfileId);

            builder.HasOne(e => e.Instructor)
                .WithOne(e => e.Profile)
                .IsRequired();

            builder.HasIndex(e => e.InstructorId).IsUnique();

            builder.Property(p => p.Biography)
                .HasMaxLength(1000);

            builder.Property(p => p.Twitter)
                .HasMaxLength(200);

            builder.Property(p => p.LinkedIn)
                .HasMaxLength(200);
        }
    }
}
