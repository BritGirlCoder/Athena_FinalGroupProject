namespace MyApp.Controllers {
    export class ReviewController {
        public work;
        public review;
        public alreadyRated: boolean;
        public existingRating: number;
        public newRating: number;
        public errorMessage;

        constructor(private reviewService: MyApp.Services.ReviewService, private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService) {
            //If there is already a rating by the user for the work being reviewed, get the rating and store the int value in existingRating.  
            //Otherwise, store a new rating value in newRating, create a new rating object in the repository, and link it to the new review object (and add it to the user's MyRatings list).
            this.review = {};
            this.reviewService.getWork(this.$routeParams['id']).then((data) => {
                this.work = data;
                this.review.workId = this.work.id;
                //console.log('workId: ' + this.work.id);
            })

            this.reviewService.getUserId().then((data) => {          
                this.review.ownerId = data.ownerId;
                //console.log("Review Owner ID: " + this.review.ownerId);
            })
        }

        public submit() {
            if (this.review.content == undefined) {
                console.log('Validation error');
            }
            else if (this.review.ownerId == 0) {
                console.log('Authentication error');
            }
            else {
                this.reviewService.createReview(this.review).then((data) => {
                    if (!data.error) {
                        this.$location.path('/content/' + this.work.id);
                    }
                    else {
                        this.errorMessage = "An error occurred. Make sure you've added this item to your Read list and haven't reviewed it already.";
                    }
                })
            }
        }

        public addReadingList() { }

        public removeReadingList() { }
    }

}

