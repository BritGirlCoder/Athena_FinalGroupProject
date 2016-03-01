var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var SearchController = (function () {
            function SearchController() {
                this.message = "searching....";
            }
            return SearchController;
        })();
        Controllers.SearchController = SearchController;
        angular.module("MyApp").controller("searchController", SearchController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=searchController.js.map