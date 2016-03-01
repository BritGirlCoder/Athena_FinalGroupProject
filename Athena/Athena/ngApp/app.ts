namespace MyApp {

    angular.module('MyApp', ['ngRoute', 'ngResource', "ui.bootstrap", "angular-filepicker"]).config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider, filepickerProvider: any) => {
        $routeProvider
            .when('/', {
                templateUrl: '/ngApp/views/home.html',
                controller: MyApp.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .when('/about', {
                templateUrl: '/ngApp/views/about.html',
                controller: MyApp.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .when('/login', {
                templateUrl: '/ngApp/views/login.html',
                controller: MyApp.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .when('/register', {
                templateUrl: '/ngApp/views/register.html',
                controller: MyApp.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .when('/externalLogin', {
                templateUrl: '/ngApp/views/externalLogin.html',
                controller: MyApp.Controllers.ExternalLoginController,
                controllerAs: 'controller'
            })
            .when('/externalRegister', {
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: MyApp.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            })
            .when('/confirmEmail', {
                templateUrl: '/ngApp/views/confirmEmail.html',
                controller: MyApp.Controllers.ConfirmEmailController,
                controllerAs: 'controller'
            })
            .when('/content/:id', {
                templateUrl: '/ngApp/views/content.html',
                controller: MyApp.Controllers.WorkDetailsController,
                controllerAs: 'controller'
            })
            .when('/search', {
                templateUrl: '/ngApp/views/search.html',
                controller: MyApp.Controllers.SearchController,
                controllerAs: 'controller'
            })
            .when('/review/:id', {
                templateUrl: '/ngApp/views/review.html',
                controller: MyApp.Controllers.ReviewController,
                controllerAs: 'controller'
            })
            .when('/addToList/:id', {
                templateUrl: 'ngApp/views/addToList.html',
                controller: MyApp.Controllers.AddToListController,
                controllerAs: 'controller'
            })
            .when('/admin', {
                templateUrl: '/ngApp/views/admin.html',
                controller: MyApp.Controllers.AdminController,
                controllerAs: 'controller',
                resolve: {
                    authorize: function (accountService: MyApp.Services.AccountService, $q: ng.IQService, $location: angular.ILocationService) {
                        var defer = $q.defer();
                        if (accountService.getClaim("admin") == null) {
                            //console.log('Access Denied');
                            $location.path('/accessDenied');
                        };
                        defer.resolve();
                        return defer.promise;
                    }
                },
            })
            .when('/publish', {
                templateUrl: '/ngApp/views/publish.html',
                controller: MyApp.Controllers.PublishController,
                controllerAs: 'controller',
                resolve: {
                    authorize: function (accountService: MyApp.Services.AccountService, $q: ng.IQService, $location: angular.ILocationService) {
                        var defer = $q.defer();
                        if (accountService.isLoggedIn() == null) {
                            //console.log('Access Denied');
                            $location.path('/login');
                        };
                        defer.resolve();
                        return defer.promise;
                    }
                },
            })
            .when('/profile', {
                templateUrl: '/ngApp/views/profile.html',
                controller: MyApp.Controllers.ProfileController,
                controllerAs: 'controller',
                resolve: {
                    authorize: function (accountService: MyApp.Services.AccountService, $q: ng.IQService, $location: angular.ILocationService) {
                        var defer = $q.defer();
                        if (accountService.isLoggedIn() == null) {
                            //console.log('Access Denied');
                            $location.path('/login');
                        };
                        defer.resolve();
                        return defer.promise;
                    }
                },
            })
            .when('/accessDenied', {
                templateUrl: '/ngApp/views/accessDenied.html',
            })
            .otherwise({
                templateUrl: '/ngApp/views/notFound.html'
            });

        $locationProvider.html5Mode(true);

        filepickerProvider.setKey("AOq251UJISh6jm9381q64z");
    });

    angular.module('MyApp').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                let token = $window.sessionStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                }
                return response || $q.when(response);
            }
        })
    );


    angular.module('MyApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

}