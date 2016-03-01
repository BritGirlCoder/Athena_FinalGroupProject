namespace Athena.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        Subject_Id = c.Int(),
                        Review_Id = c.Int(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                        ApplicationUser_Id1 = c.String(maxLength: 128),
                        Owner_Id = c.String(maxLength: 128),
                        Profile_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Works", t => t.Subject_Id)
                .ForeignKey("dbo.Reviews", t => t.Review_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id1)
                .ForeignKey("dbo.AspNetUsers", t => t.Owner_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Profile_Id)
                .Index(t => t.Subject_Id)
                .Index(t => t.Review_Id)
                .Index(t => t.ApplicationUser_Id)
                .Index(t => t.ApplicationUser_Id1)
                .Index(t => t.Owner_Id)
                .Index(t => t.Profile_Id);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        RegisterDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                        Work_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Works", t => t.Work_Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex")
                .Index(t => t.Work_Id);
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Works",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        ExternalAuthor = c.String(),
                        ExternalTranslator = c.String(),
                        Type = c.String(),
                        Content = c.String(),
                        Description = c.String(),
                        Genres = c.String(),
                        Tags = c.String(),
                        AvgRating = c.Single(nullable: false),
                        RatingCount = c.Int(nullable: false),
                        DateAdded = c.DateTime(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                        FileReference = c.String(),
                        IsActive = c.Boolean(nullable: false),
                        Status = c.String(),
                        MyTags = c.String(),
                        RRValue = c.Int(nullable: false),
                        RRCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Ratings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Score = c.Int(nullable: false),
                        WorkId = c.Int(nullable: false),
                        OwnerId = c.String(),
                        ReviewId = c.Int(nullable: false),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Works", t => t.WorkId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.WorkId)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.Reviews",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OwnerId = c.String(),
                        OwnerName = c.String(),
                        WorkId = c.Int(nullable: false),
                        RatingId = c.Int(nullable: false),
                        Score = c.Int(nullable: false),
                        Content = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Works", t => t.WorkId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.WorkId)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.WorkAuthors",
                c => new
                    {
                        WorkId = c.Int(nullable: false),
                        ApplicationUserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.WorkId, t.ApplicationUserId })
                .ForeignKey("dbo.Works", t => t.WorkId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId, cascadeDelete: true)
                .Index(t => t.WorkId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.WorkReading",
                c => new
                    {
                        WorkId = c.Int(nullable: false),
                        ApplicationUserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.WorkId, t.ApplicationUserId })
                .ForeignKey("dbo.Works", t => t.WorkId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId, cascadeDelete: true)
                .Index(t => t.WorkId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.WorkFavorites",
                c => new
                    {
                        WorkId = c.Int(nullable: false),
                        ApplicationUserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.WorkId, t.ApplicationUserId })
                .ForeignKey("dbo.Works", t => t.WorkId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId, cascadeDelete: true)
                .Index(t => t.WorkId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.WorkToRead",
                c => new
                    {
                        WorkId = c.Int(nullable: false),
                        ApplicationUserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.WorkId, t.ApplicationUserId })
                .ForeignKey("dbo.Works", t => t.WorkId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId, cascadeDelete: true)
                .Index(t => t.WorkId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.WorkRead",
                c => new
                    {
                        WorkId = c.Int(nullable: false),
                        ApplicationUserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.WorkId, t.ApplicationUserId })
                .ForeignKey("dbo.Works", t => t.WorkId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId, cascadeDelete: true)
                .Index(t => t.WorkId)
                .Index(t => t.ApplicationUserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Comments", "Profile_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Comments", "Owner_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Comments", "ApplicationUser_Id1", "dbo.AspNetUsers");
            DropForeignKey("dbo.Reviews", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Ratings", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Comments", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "Work_Id", "dbo.Works");
            DropForeignKey("dbo.Reviews", "WorkId", "dbo.Works");
            DropForeignKey("dbo.Comments", "Review_Id", "dbo.Reviews");
            DropForeignKey("dbo.Ratings", "WorkId", "dbo.Works");
            DropForeignKey("dbo.WorkRead", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.WorkRead", "WorkId", "dbo.Works");
            DropForeignKey("dbo.WorkToRead", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.WorkToRead", "WorkId", "dbo.Works");
            DropForeignKey("dbo.WorkFavorites", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.WorkFavorites", "WorkId", "dbo.Works");
            DropForeignKey("dbo.WorkReading", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.WorkReading", "WorkId", "dbo.Works");
            DropForeignKey("dbo.Comments", "Subject_Id", "dbo.Works");
            DropForeignKey("dbo.WorkAuthors", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.WorkAuthors", "WorkId", "dbo.Works");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.WorkRead", new[] { "ApplicationUserId" });
            DropIndex("dbo.WorkRead", new[] { "WorkId" });
            DropIndex("dbo.WorkToRead", new[] { "ApplicationUserId" });
            DropIndex("dbo.WorkToRead", new[] { "WorkId" });
            DropIndex("dbo.WorkFavorites", new[] { "ApplicationUserId" });
            DropIndex("dbo.WorkFavorites", new[] { "WorkId" });
            DropIndex("dbo.WorkReading", new[] { "ApplicationUserId" });
            DropIndex("dbo.WorkReading", new[] { "WorkId" });
            DropIndex("dbo.WorkAuthors", new[] { "ApplicationUserId" });
            DropIndex("dbo.WorkAuthors", new[] { "WorkId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.Reviews", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Reviews", new[] { "WorkId" });
            DropIndex("dbo.Ratings", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Ratings", new[] { "WorkId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", new[] { "Work_Id" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Comments", new[] { "Profile_Id" });
            DropIndex("dbo.Comments", new[] { "Owner_Id" });
            DropIndex("dbo.Comments", new[] { "ApplicationUser_Id1" });
            DropIndex("dbo.Comments", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Comments", new[] { "Review_Id" });
            DropIndex("dbo.Comments", new[] { "Subject_Id" });
            DropTable("dbo.WorkRead");
            DropTable("dbo.WorkToRead");
            DropTable("dbo.WorkFavorites");
            DropTable("dbo.WorkReading");
            DropTable("dbo.WorkAuthors");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.Reviews");
            DropTable("dbo.Ratings");
            DropTable("dbo.Works");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Comments");
        }
    }
}
