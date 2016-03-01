namespace MyApp.Controllers {

    export class ProfileController {
        
        //Holds a list of profiles (admins only)
        public profiles;
        //Holds a single profile
        public profile;       
        //Holds the user's read Works
        public readWorks;
        //Holds the user's reviews
        public reviews;
        //Holds the user's published works
        public works;
        //Holds the user's preferred genres
        public genres;
        //Holds the list of all genres
        public listWorkGenres;
        //Holds selected genre
        public selectedGenre;
        //holds the toggle to show the genres
        public showGenres;

        constructor(private profileService: MyApp.Services.ProfileService, private $location: angular.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $route: ng.route.IRouteService) {
            this.listWorkGenres = ["Action", "Adventure", "Crime", "Comedy", "Fantasy", "Historical Fiction", "Horror", "Mystery", "Romance", "Science Fiction", "Thriller", "Drama", "Western"];
            this.getUserReviews();
            this.getUserWorks();
            this.getRead();
            this.getGenres();
        }

        //REVIEWS METHODS
        //fetches the user's reviews
        getUserReviews() {
            this.reviews = this.profileService.listUserReviews();
        }

        //edits the selected review
        editUserReview(review) {
            this.showModal(review);
        }

        //Shows modal for editing review content
        showModal(review) {            
            //Opens the modal with the options specified in the argument object
            this.$uibModal.open({
                templateUrl: '/ngApp/Views/reviewModal.html',
                controller: 'ReviewModalController',
                controllerAs: 'controller',
                resolve: {
                    data: () => review, //pass the review object to the modal
                },
                size: 'lg'
            });
        };

        //permanently deletes the selected review
        deleteUserReview(id) {
            this.profileService.deleteUserReview(id).then(() =>
                this.$route.reload());
        }

        //redirects user to search page so they can add publication to their read list, or add a review
        searchRedirect() {
            this.$location.url('/search');
        }

        //WORKS METHODS
        //fetches the user's published works
        getUserWorks() {
            this.works = this.profileService.listUserWorks();
        }

        //redirects user to publish page so they can add a new work
        addUserWorks() {
            this.$location.url('/publish');
        }
        
        //deletes the selected published work
        deleteUserWorks(id) {
            this.profileService.deleteUserWork(id).then(() =>
                this.$route.reload());
        }

        //fetches the user's list of already-read works
        getRead() {
            this.readWorks = this.profileService.listReadWorks();
        }

        //Removes a work from the user's list of read works
        deleteRead(work) {
            //console.log(work);
            this.profileService.removeRead(work).then(() =>
                this.$route.reload());
        }

        //GENRES Methods
        //Fetches user's existing favorite genres
        getGenres() {
            this.profileService.listFavoriteGenres();
        }

        updateUser() {            
            //reload the page
            this.$route.reload();
        };

        //Handles adding genre selections 
        toggleSelection(genre) {
            var idx = this.selectedGenre.indexOf(genre); 
            // is currently selected
            if (idx > -1) {
                this.selectedGenre.splice(idx, 1);
            } 
            // is newly selected
            else {
                this.selectedGenre.push(genre);
            }
        };
    }
}