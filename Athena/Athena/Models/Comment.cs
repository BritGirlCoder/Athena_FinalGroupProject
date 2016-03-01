using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athena.Models
{
    public class Comment
    {
        public int Id { get; set; }
        //Used for MyComments
        public ApplicationUser Owner { get; set; }
        //Used for ProfileComments
        public ApplicationUser Profile { get; set; }
        public Work Subject { get; set; }
        public string Content { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsActive { get; set; }
    }
}