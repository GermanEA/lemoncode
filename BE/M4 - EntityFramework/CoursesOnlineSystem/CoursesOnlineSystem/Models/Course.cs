using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoursesOnlineSystem.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public int InstructorId { get; set; }

        public required Instructor Instructor { get; set; }
        public List<Student> Students { get; set; } = [];
    }
}
