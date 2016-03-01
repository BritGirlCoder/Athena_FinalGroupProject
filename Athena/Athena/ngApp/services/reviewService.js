var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ReviewService = (function () {
            function ReviewService() {
            }
            //just some function that returns list of reviews, can be modified later
            ReviewService.prototype.listReviews = function () {
                return this.ReviewResource.query();
            };
            ReviewService.prototype.contstructor = function ($resource) {
                this.ReviewResource = $resource('/api/reviews');
            };
            return ReviewService;
        })();
        Services.ReviewService = ReviewService;
        angular.module('MyApp').service('reviewService', ReviewService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=reviewService.js.map