using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athena.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public int WorkId { get; set; }
        public string OwnerId { get; set; }
        public int ReviewId { get; set; }
    }
}