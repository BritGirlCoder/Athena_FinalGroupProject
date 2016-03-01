var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ReviewController = (function () {
            function ReviewController() {
            }
            return ReviewController;
        })();
        Controllers.ReviewController = ReviewController;
        angular.module('MyApp').controller('reviewController', ReviewController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=reviewController.js.map