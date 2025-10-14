using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoursesOnlineSystem.Models
{
    public class Profile
    {
        public int ProfileId { get; set; }
        public required string Biography{ get; set; }
        public required string Twitter { get; set; }
        public required string LinkedIn { get; set; }
        public int InstructorId { get; set; }

        public required Instructor Instructor { get; set; }
    }
}
