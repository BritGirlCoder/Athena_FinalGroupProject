namespace MyApp.Controllers {

    export class ReviewModalController {

        //Public property to hold the current review
        public review;
        public work;

        //Pass in the public review property from the editReview method in the ProfileController
        constructor(private data, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private reviewService: MyApp.Services.ReviewService, private profileService: MyApp.Services.ProfileService) {
            this.review = this.data;
            this.getWork(this.review)
        }

        closeModal() {
            this.$uibModalInstance.close();
        }

        saveReview() {
            this.reviewService.saveReview(this.review).then(() => {
                this.closeModal();
            });
        }

        getWork(review) {
            this.work = this.profileService.getWork(review.workId);
        }

    }

    //have to manually register the modal controller
    angular.module("MyApp").controller("ReviewModalController", ReviewModalController);
}