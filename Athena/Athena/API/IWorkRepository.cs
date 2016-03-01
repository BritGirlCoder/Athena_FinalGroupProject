using System.Collections.Generic;
using Athena.Models;

namespace Athena.API
{
    public interface IWorkRepository
    {
        void AddOrUpdateWork(Work work, string Id);
        MessageVm AddReview(ReviewVm review);
        MessageVm AddToList(Rating rating);
        void DeleteRestoreReview(int id);
        void DeleteRestoreWork(int id);
        List<string> GetGenresByUser(string userId);
        List<Work> GetReadByUser(string userId);
        ICollection<Review> GetReviewsByUser(string userId);
        ApplicationUser GetUserById(string userId);
        Work GetWorkById(int id);
        ICollection<Work> GetWorks();
        List<Work> GetWorksByUser(string userId);
        void HardDeleteRating(int id);
        void HardDeleteReview(int id);
        void HardDeleteWork(int id);
        Work initializeLists(Work work);
        void RemoveFromList(Work work, string UserId);
        Review SaveReview(Review review);
        QueryVm Search(QueryVm query);
    }
}