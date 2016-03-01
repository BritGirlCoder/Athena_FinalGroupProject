using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Athena.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.MyWorks = new List<Work>();
            this.Read = new List<Work>();
            this.Reading = new List<Work>();
            this.ToRead = new List<Work>();
            this.Favorites = new List<Work>();

            this.FavoriteGenres = new List<string>();
            this.MyReviews = new List<Review>();
            this.MyRatings = new List<Rating>();
            this.MyComments = new List<Comment>();
            this.ProfileComments = new List<Comment>();
            this.RegisterDate = DateTime.Now;
            this.IsActive = true;
        }
        //Added in the inverse property annotations so EF knows how to link the ApplicationUser and Work tables together
        //[InverseProperty("Authors")]
        [JsonIgnore]
        public List<Work> MyWorks { get; set; }
        //[InverseProperty("PastReaders")]
        [JsonIgnore]
        public List<Work> Read { get; set; }
        //[InverseProperty("CurrentReaders")]
        public List<Work> Reading { get; set; }
        //[InverseProperty("FutureReaders")]
        public List<Work> ToRead { get; set; }
        //[InverseProperty("FavoritedBy")]
        public List<Work> Favorites { get; set; }

        public List<string> FavoriteGenres { get; set; }
        public List<Review> MyReviews { get; set; }
        public List<Rating> MyRatings { get; set; }
        public List<Comment> MyComments { get; set; }
        public List<Comment> ProfileComments { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsActive { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public IDbSet<Work> Works { get; set; }
        public IDbSet<Review> Reviews { get; set; }
        public IDbSet<Comment> Comments { get; set; }


        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        //Implementation of Fluent API
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //This maps the various ApplicationUser type properties in Work to a lookup table to correctly handle the many-to-many relationships.  One lookup table is created for each ApplicationUser type property in Work
            modelBuilder.Entity<Work>()
                .HasMany(w => w.Authors)
                .WithMany(w => w.MyWorks)
                .Map(w =>
                {
                    w.ToTable("WorkAuthors");
                    w.MapLeftKey("WorkId");
                    w.MapRightKey("ApplicationUserId");
                });
            modelBuilder.Entity<Work>()
                .HasMany(w => w.PastReaders)
                .WithMany(w => w.Read)
                .Map(w =>
                {
                    w.ToTable("WorkRead");
                    w.MapLeftKey("WorkId");
                    w.MapRightKey("ApplicationUserId");
                });
            modelBuilder.Entity<Work>()
                .HasMany(w => w.CurrentReaders)
                .WithMany(w => w.Reading)
                .Map(w =>
                {
                    w.ToTable("WorkReading");
                    w.MapLeftKey("WorkId");
                    w.MapRightKey("ApplicationUserId");
                });
            modelBuilder.Entity<Work>()
                .HasMany(w => w.FutureReaders)
                .WithMany(w => w.ToRead)
                .Map(w =>
                {
                    w.ToTable("WorkToRead");
                    w.MapLeftKey("WorkId");
                    w.MapRightKey("ApplicationUserId");
                });
            modelBuilder.Entity<Work>()
                .HasMany(w => w.FavoritedBy)
                .WithMany(w => w.Favorites)
                .Map(w =>
                {
                    w.ToTable("WorkFavorites");
                    w.MapLeftKey("WorkId");
                    w.MapRightKey("ApplicationUserId");
                });
            //These set the foreign key for the two Comment type properties in ApplicationUser
            //modelBuilder.Entity<Comment>()
            //    .HasOptional(c => c.Owner)
            //    .WithMany(u => u.MyComments);
            //modelBuilder.Entity<Comment>()
            //    .HasOptional(c => c.Profile)
            //    .WithMany(u => u.ProfileComments);            
        }

        public static ApplicationDbContext Create()
        {            
            return new ApplicationDbContext();
        }
    }
}
