using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athena.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string OwnerId { get; set; }
        public string OwnerName { get; set; }
        public int WorkId { get; set; }
        public int RatingId { get; set; }
        public int Score { get; set; } //For sending back to client side
        public string Content { get; set; }
        public DateTime DateAdded { get; set; }
        public List<Comment> Comments { get; set; }
        public bool IsActive { get; set; }
        //public Work Work { get; set; } //causing serialization loop?
    }
}