namespace MyApp.Services {
    export class ReviewService {
        private ReviewResource;

        //just some function that returns list of reviews, can be modified later
        //public listReviews() {
        //    return this.ReviewResource.query();
        //}
                
        constructor(private $resource: ng.resource.IResourceService) {
            this.ReviewResource = this.$resource('/api/work/:id', null, {
                getUserId: {
                    url: "/api/work/getUserId",
                    method: "GET"
                },
                addReview: {
                    url: "/api/work/addReview",
                    method: "POST"
                },
                saveReview: {
                    url: "api/work/saveReview",
                    method: "POST"
                }
            });
        }

        public getWork(id) {
            return this.ReviewResource.get({ id: id }).$promise;
        }

        public getUserId() {
            return this.ReviewResource.getUserId().$promise;
        }

        public createReview(review) {
            return this.ReviewResource.addReview(review).$promise;
        }

        public saveReview(review) {
            return this.ReviewResource.saveReview(review).$promise;
        }

    }
    angular.module('MyApp').service('reviewService', ReviewService);
}