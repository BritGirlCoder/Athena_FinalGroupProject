using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athena.Models
{
    public class ReviewVm
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string OwnerId { get; set; }
        public int WorkId { get; set; }
        public int NewRating { get; set; } //To create a new rating and attach it to the review
        public int RatingId { get; set; } //To attach an existing rating object
    }
}