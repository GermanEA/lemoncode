using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoursesOnlineSystem.Models
{
    public class Instructor
    {
        public int InstructorId { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }

        public List<Course> Courses { get; set; } = [];
        public required Profile Profile { get; set; }
    }
}
