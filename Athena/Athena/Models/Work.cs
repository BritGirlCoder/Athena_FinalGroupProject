using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athena.Models
{
    public class Work
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<ApplicationUser> Authors { get; set; }
        public List<ApplicationUser> Translators { get; set; }

        //testing of the inverse properties method to fix DB - DW
        //Inverse property for ApplicationUser.Reading
        public List<ApplicationUser> CurrentReaders { get; set; }
        //Inverse property for ApplicationUser.Read
        public List<ApplicationUser> PastReaders { get; set; }
        //Inverse property for ApplicationUser.ToRead
        public List<ApplicationUser> FutureReaders { get; set; }
        //Inverse property for ApplicationUser.Favorites
        public List<ApplicationUser> FavoritedBy { get; set; }

        public string ExternalAuthor { get; set; }
        public string ExternalTranslator { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public string Genres { get; set; }
        public string Tags { get; set; }
        public float AvgRating { get; set; }
        public int RatingCount { get; set; }
        public List<Rating> Ratings { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime LastUpdated { get; set; }
        public List<Review> Reviews { get; set; }
        public List<Comment> Comments { get; set; }
        public string FileReference { get; set; }
        public bool IsActive { get; set; }
        
        //User List Properties:
        public string Status { get; set; } //ToRead, Reading, Read
        //public int MyRating { get; set; } //Depricated: [To access this for other users looking at a review, use Review.Owner.Read.<find work by title or id>.MyRating and only allow users to review things in their Read list]
        public string MyTags { get; set; }
        public int RRValue { get; set; } //Re-read value
        public int RRCount { get; set; } //Re-read count
    }
}