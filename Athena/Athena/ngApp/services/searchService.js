var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var SearchService = (function () {
            function SearchService() {
            }
            return SearchService;
        })();
        Services.SearchService = SearchService;
        angular.module("MyApp").service('searchService', SearchService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=searchServices.js.map