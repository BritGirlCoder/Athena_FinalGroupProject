using Athena.Models;
using Generic_Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;


namespace Athena.API
{
    public class WorkRepository : GenericRepository, IWorkRepository
    {
        private IGenericRepository repo;
        private ApplicationDbContext db = new ApplicationDbContext();
        
        public WorkRepository(IGenericRepository repo)
        {
            this.repo = repo;
        }

        //Gets all Works
        public ICollection<Work> GetWorks()
        {
            return repo.Query<Work>().Where(w=>w.IsActive==true).ToList();
        }

        //Gets a specific work
        public Work GetWorkById(int id)
        {
            //return repo.Find<Work>(id);
            var data = repo.Query<Work>().Where(w => w.Id == id).Include(w => w.Reviews).Include(w => w.Authors).FirstOrDefault();
            return data;
        }

        //Gets Works authored by the logged in user
        public List<Work> GetWorksByUser(string userId) {

            var user = GetUserById(userId);            
            //var data = repo.Query<Work>().Where(w => w.Authors.Contains(user)).ToList();
            var data = repo.Query<ApplicationUser>().Where(u => u.Id == userId).Include(u => u.MyWorks).FirstOrDefault();
            return data.MyWorks;
        }

        //Gets Works Read (added to read list) by the logged in user
        public List<Work> GetReadByUser(string userId)
        {
            //returns all works in logged-in user's Read list
            var user = GetUserById(userId);
            var data = repo.Query<ApplicationUser>().Where(u => u.Id == userId).Include(u => u.Read).FirstOrDefault();
            return data.Read;
        }

        //Gets Reviews authored by the logged in user
        public ICollection<Review> GetReviewsByUser(string userId)
        {
            //returns undeleted reviews for the logged in user
            var data = repo.Query<Review>().Where(r => r.OwnerId == userId).ToList();
            return data;
        }

        //Gets Works matching a query
        public QueryVm Search(QueryVm query)
        {
            IQueryable<Work> results = Enumerable.Empty<Work>().AsQueryable();
            QueryVm returnObj = new QueryVm();

            //List<Work> workList = db.Works.Where(w => w.Type.ToLower().Contains(query.Query)).ToList();


            if (query.SearchBy == "title")
            {
                results = (from w in db.Works
                               where w.Type == query.SearchFor
                               && w.Title.ToLower().Contains(query.Query.ToLower())
                               select w).Include(w => w.Authors);
            }
            else if (query.SearchBy == "author")
            {
                results = (from w in db.Works
                           where w.Type == query.SearchFor
                           && w.ExternalAuthor.ToLower().Contains(query.Query.ToLower())
                           select w).Include(w => w.Authors);
            }
            else if (query.SearchBy == "genre")
            {
                results = (from w in db.Works
                           where w.Type == query.SearchFor
                           && w.Genres.ToLower().Contains(query.Query.ToLower())
                           select w).Include(w => w.Authors);
            }
            else if (query.SearchBy == "tag")
            {
                results = (from w in db.Works
                           where w.Type == query.SearchFor
                           && w.Tags.ToLower().Contains(query.Query.ToLower())
                           select w).Include(w => w.Authors);
            }

            returnObj.Results = results.ToList();
            return returnObj;
        }

        //Adds or updates a Work
        public void AddOrUpdateWork(Work work, string Id)
        {
            ApplicationUser currentUser = GetUserById(Id);
            if (work.Id == 0)
            {
                Work workToAdd = new Work();
                workToAdd = work;
                workToAdd = initializeLists(workToAdd);                
                work.Authors.Add(currentUser);
                work.LastUpdated = DateTime.Now;
                repo.Add<Work>(work);
                currentUser.MyWorks.Add(workToAdd);
            }
            else
            {
                Work original = repo.Find<Work>(work.Id);
                original.Title = work.Title;
                original.Authors = work.Authors;
                original.Translators = work.Translators;
                original.ExternalAuthor = work.ExternalAuthor;
                original.ExternalTranslator = work.ExternalTranslator;
                original.Type = work.Type;
                original.Content = work.Content;
                original.Description = work.Description;
                original.Genres = work.Genres;
                original.Tags = work.Tags;
                original.AvgRating = work.AvgRating;
                original.DateAdded = work.DateAdded;
                original.LastUpdated = DateTime.Now;
                original.Reviews = work.Reviews;
                original.Comments = work.Comments;
                original.FileReference = work.FileReference;
                original.IsActive = work.IsActive;                
            }

            repo.SaveChanges();
        }

        //Adds a review
        public MessageVm AddReview(ReviewVm review)
        {
            Work subject = repo.Query<Work>().Where(w => w.Id == review.WorkId).Include(w => w.Reviews).FirstOrDefault();
            ApplicationUser owner = GetUserById(review.OwnerId);
            Rating subjectRating = new Rating();
            MessageVm returnObj = new MessageVm();;
            bool quit = false;

            //Find the user's rating for this work:
            int i = 0;
            while (!quit && i < owner.MyRatings.Count){
                if (owner.MyRatings[i].WorkId == review.WorkId)
                {
                    subjectRating = owner.MyRatings[i];
                    quit = true;
                }
                i++;
            }

            //Set error flag if no rating was found:
            if (subjectRating.Score == 0)
            {
                returnObj.Error = true;
            }

            //Check if the user has already created a review of this work:
            quit = false;
            int j = 0;
            while (!quit && j < owner.MyReviews.Count)
            {
                if (owner.MyReviews[j].WorkId == review.WorkId)
                {
                    returnObj.Error = true;
                    quit = true;
                }
                j++;
            }

            if (!returnObj.Error)
            {
                Review reviewToAdd = new Review
                {
                    OwnerId = review.OwnerId,
                    OwnerName = owner.UserName,
                    Content = review.Content,
                    Score = subjectRating.Score,
                    DateAdded = DateTime.Now,
                    IsActive = true,
                };

                if (subject.Reviews.Count == 0)
                {
                    subject.Reviews = new List<Review>();
                }

                owner.MyReviews.Add(reviewToAdd);
                subject.Reviews.Add(reviewToAdd);
                repo.SaveChanges();
            }

            return returnObj;
        }

        //Updates a review
        public Review SaveReview(Review review) {
                        
            Review original = repo.Find<Review>(review.Id);
            original.Comments = review.Comments;
            original.Content = review.Content;
            original.DateAdded = review.DateAdded;
            original.IsActive = review.IsActive;
            original.OwnerId = review.OwnerId;
            original.OwnerName = review.OwnerName;
            original.WorkId = review.WorkId;

            repo.SaveChanges();

            return original;
        }

        //Adds a work to the user's read list
        public MessageVm AddToList(Rating rating)
        {
            Work subject = repo.Find<Work>(rating.WorkId);
            ApplicationUser owner = GetUserById(rating.OwnerId);
            string message = "Success.";
            bool cont = true;

            foreach (Rating i in owner.MyRatings)
            {
                if (i.WorkId == rating.WorkId)
                {
                    message = "This item is already in your list.";
                    cont = false;
                }
            }

            if (cont)
            {
                //Calculate new average rating for work:
                subject.AvgRating = ((subject.AvgRating * subject.RatingCount) + rating.Score) / (subject.RatingCount + 1);
                subject.RatingCount++;

                //Add work to user's list:
                owner.Read.Add(subject);

                //Add rating to user's ratings:
                owner.MyRatings.Add(rating);

                repo.SaveChanges();
            }

            MessageVm returnObj = new MessageVm();
            returnObj.Message = message;
            return returnObj;
        }

        //Removes a work from the user's read list
        public void RemoveFromList(Work work, string UserId) {
            //We remove the work from the user's read list, but we also need to delete any associated ratings & reviews
            //Get the user
            var user = repo.Query<ApplicationUser>().Where(u => u.Id == UserId).Include(u => u.Read).FirstOrDefault();
            var read = repo.Query<Work>().Where(w => w.Id == work.Id).Include(w => w.CurrentReaders).FirstOrDefault();
            //Fetch any rating where the rating WorkId matches the work being removed, and the ownerID matches the user who rated the work
            var rating = repo.Query<Rating>().Where(r => r.WorkId == work.Id && r.OwnerId == user.Id).FirstOrDefault();
            //Also fetch any review where the review WorkId matches the work being removed, and the ownerId matches the user that reviewed the work
            var review = repo.Query<Review>().Where(r => r.WorkId == work.Id && r.OwnerId == user.Id).FirstOrDefault();
            
            //If there's an existing rating, delete it           
            if (rating != null)
            {
                //Remove rating from user's ratings:
                user.MyRatings.Remove(rating);
                //Delete rating
                HardDeleteRating(rating.Id);
                //Calculate new average rating for work:
                read.AvgRating = ((read.AvgRating * read.RatingCount) + rating.Score) / (read.RatingCount + 1);
                //We're removing one rating
                read.RatingCount--;               
            }

            if (review != null)
            {
                //Remove review from user's reviews:
                user.MyReviews.Remove(review);
                //Delete review
                HardDeleteReview(review.Id);                
            }
                        
            //Remove work from user's list (we do NOT delete the work):
            user.Read.Remove(read);
            //Remove user from work's list of current readers
            read.CurrentReaders.Remove(user);
            //Save changes to DB
            repo.SaveChanges();
        }

        //future functionality retrieve a user's favorite genres
        public List<string> GetGenresByUser(string userId)
        {
            var user = GetUserById(userId);
            var data = repo.Query<ApplicationUser>().Where(u => u.Id == userId).Include(u => u.FavoriteGenres).FirstOrDefault();
            return data.FavoriteGenres;
        }

        //Soft Delete Work (Switch):
        public void DeleteRestoreWork(int id)
        {
            Work work = repo.Find<Work>(id);

            if (work.IsActive)
            {
                work.IsActive = false;
                repo.SaveChanges();
            }
            else
            {
                work.IsActive = true;
                repo.SaveChanges();
            }
        }

        //Soft Delete Review
        public void DeleteRestoreReview(int id)
        {
            Review review = repo.Find<Review>(id);

            if (review.IsActive)
            {
                review.IsActive = false;
                repo.SaveChanges();
            }
            else
            {
                review.IsActive = true;
                repo.SaveChanges();
            }
        }

        //Hard Delete Work
        public void HardDeleteWork(int id)
        {
            repo.Delete<Work>(id);
            repo.SaveChanges();
        }

        //Hard Delete Review
        public void HardDeleteReview(int id)
        {
            repo.Delete<Review>(id);
            repo.SaveChanges();
        }

        //Hard Delete Rating
        public void HardDeleteRating(int id)
        {
            repo.Delete<Rating>(id);
            repo.SaveChanges();
        }

        public ApplicationUser GetUserById(string userId)
        {
            return repo.Query<ApplicationUser>().Where(u => u.Id == userId).Include(u => u.MyRatings).Include(u => u.MyReviews).FirstOrDefault(); //use .include before FirstOrDefault to include foreign tables
        }

        public Work initializeLists(Work work) {
            work.Authors = new List<ApplicationUser>();
            work.Translators = new List<ApplicationUser>();
            work.Reviews = new List<Review>();
            work.Comments = new List<Comment>();
            return work;
        }

        //Need a method to set a user to banned, and to hard delete a user

        //Need methods for adding works to user lists (probably need a view model for this as well)
    }
}