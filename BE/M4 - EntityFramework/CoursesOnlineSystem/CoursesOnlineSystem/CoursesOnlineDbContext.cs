using CoursesOnlineSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoursesOnlineSystem
{
    public class CoursesOnlineDbContext : DbContext
    {

        public DbSet<Instructor> Instructors{ get; set; } // Aunque se crea por relación directa con Profile, dejo el DbSet para que me ponga el nombre Instructors
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Profile> Profiles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=coursesSystem;user=sa;password=Lem0nCode!;TrustServerCertificate=true");
            //optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("MYAPP_CONNECTION_STRING"));
            // He tenido que comentar la opción de usar la variable de entorno, porque no la reconoce fuera del tiempo de ejecución de la aplicación
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CoursesOnlineDbContext).Assembly);
        }
    }
}
