using Athena.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace Athena.API
{
    public class WorkController : ApiController
    {
        private IWorkRepository repo;

        public WorkController(IWorkRepository repo)
        {
            this.repo = repo;
        }

        //Get all works
        public IHttpActionResult Get()
        {
            return Ok(repo.GetWorks());
        }

        //Get a single work
        [HttpGet]
        [Route("api/work/{id}")]
        public IHttpActionResult Get(int id)
        {
            var data = repo.GetWorkById(id);
            return Ok(data);
        }

        //Save or add a work
        [Authorize]
        public IHttpActionResult Post(Work work)
        {            
            string userId = User.Identity.GetUserId();
            repo.AddOrUpdateWork(work, userId);
            return Ok();
        }

        //The following methods require a route in all services that call them:
        [Route("api/work/search")]
        public IHttpActionResult Post(QueryVm query)
        {
            return Ok(repo.Search(query));
        }

        [Route("api/work/addReview")]
        [Authorize]
        public IHttpActionResult Post(ReviewVm review)
        {
            return Ok(repo.AddReview(review));
        }

        [Route("api/work/saveReview")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult SaveReview(Review review)
        {
            var data = repo.SaveReview(review);
            return Ok(data);
        }

        [Route("api/work/addToList")]
        [Authorize]
        //Adds to Read list
        public IHttpActionResult AddToList(Rating rating)
        {
            return Ok(repo.AddToList(rating));
        }

        [Route("api/work/readList")]
        [Authorize]
        //Gets User's Read List
        public IHttpActionResult GetReadWorksByUser()
        {
            string userId = User.Identity.GetUserId();
            return Ok(repo.GetReadByUser(userId));
        }

        [Route("api/work/deleteFromList")]
        [Authorize]
        [HttpPost]
        //Removes from Read list
        public IHttpActionResult RemoveFromList(Work work)
        {
            string userId = User.Identity.GetUserId();
            repo.RemoveFromList(work, userId);
            return Ok();
        }

        //Get reviews by user
        [Route("api/reviews")]
        public IHttpActionResult GetReviewsByUser()
        {
            string userId = User.Identity.GetUserId();
            return Ok(repo.GetReviewsByUser(userId));
        }

        //Soft Delete review by ID
        [Route("api/reviews/{id}")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult DeleteRestoreReview(int id)
        {
            repo.DeleteRestoreReview(id);
            return Ok();
        }

        //Hard Delete review by ID
        [Route("api/reviews/{id}")]
        [Authorize]
        [HttpDelete]
        public IHttpActionResult HardDeleteReview(int id)
        {
            var user = User.Identity as ClaimsIdentity;

            if (!(user.HasClaim("user", "true") || user.HasClaim("admin", "true")))
            {
                return Unauthorized();
            }

            repo.HardDeleteReview(id);
            return Ok();
        }

        //Get works by user
        [Route("api/work/getByUser")]
        public IHttpActionResult GetWorksByUser()
        {
            string userId = User.Identity.GetUserId();
            return Ok(repo.GetWorksByUser(userId));
        }

        //Delete/restore work
        [Route("api/work/deleteRestore/{id}")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult DeleteRestore(int id)
        {
            //Users have to be able to hide their own work, even if not admins

            var user = User.Identity as ClaimsIdentity;

            if (!(user.HasClaim("user", "true") || user.HasClaim("admin", "true")))
            {
                return Unauthorized();
            }

            repo.DeleteRestoreWork(id);
            return Ok();
        }

        //permanently delete a work
        [Route("api/work/{id}")]
        [Authorize]
        [HttpDelete]
        public IHttpActionResult HardDelete(int id)
        {
            var user = User.Identity as ClaimsIdentity;

            if (!(user.HasClaim("user", "true") || user.HasClaim("admin", "true")))
            {
                return Unauthorized();
            }           

            repo.HardDeleteWork(id);
            return Ok();
        }

        [Route("api/genres/{id}")]
        [HttpGet]
        public IHttpActionResult GetGenresByUser()
        {
            string userId = User.Identity.GetUserId();
            var genres = repo.GetGenresByUser(userId);
            return Ok(genres);
        }

        //get current user
        [Route("api/work/getUser")]
        public IHttpActionResult GetUser()
        {
            string userId = User.Identity.GetUserId();
            var data = repo.GetUserById(userId);
            return Ok(data);
        }

        //get current user's ID
        [Route("api/work/getUserId")]
        public IHttpActionResult GetUserId()
        {
            ReviewVm returnObject = new ReviewVm();
            returnObject.OwnerId = User.Identity.GetUserId();
            return Ok(returnObject);
        }
    }
}
