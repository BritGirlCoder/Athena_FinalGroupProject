var MyApp;
(function (MyApp) {
    angular.module('MyApp', ['ngRoute', 'ngResource', "ui.bootstrap", "angular-filepicker"]).config(function ($routeProvider, $locationProvider, filepickerProvider) {
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
                authorize: function (accountService, $q, $location) {
                    var defer = $q.defer();
                    if (accountService.getClaim("admin") == null) {
                        //console.log('Access Denied');
                        $location.path('/accessDenied');
                    }
                    ;
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
                authorize: function (accountService, $q, $location) {
                    var defer = $q.defer();
                    if (accountService.isLoggedIn() == null) {
                        //console.log('Access Denied');
                        $location.path('/login');
                    }
                    ;
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
                authorize: function (accountService, $q, $location) {
                    var defer = $q.defer();
                    if (accountService.isLoggedIn() == null) {
                        //console.log('Access Denied');
                        $location.path('/login');
                    }
                    ;
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
    angular.module('MyApp').factory('authInterceptor', function ($q, $window, $location) {
        return ({
            request: function (config) {
                config.headers = config.headers || {};
                var token = $window.sessionStorage.getItem('token');
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
        });
    });
    angular.module('MyApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})(MyApp || (MyApp = {}));
/// <reference path="ngapp/app.ts" /> 
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AboutController = (function () {
            function AboutController() {
            }
            return AboutController;
        })();
        Controllers.AboutController = AboutController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService, $location) {
                var _this = this;
                this.accountService = accountService;
                this.$location = $location;
                this.getExternalLogins().then(function (results) {
                    _this.externalLogins = results;
                });
            }
            AccountController.prototype.getClaim = function (type) {
                return this.accountService.getClaim(type);
            };
            AccountController.prototype.isLoggedIn = function () {
                return this.accountService.isLoggedIn();
            };
            AccountController.prototype.logout = function () {
                this.accountService.logout();
            };
            AccountController.prototype.getExternalLogins = function () {
                return this.accountService.getExternalLogins();
            };
            return AccountController;
        })();
        Controllers.AccountController = AccountController;
        angular.module('MyApp').controller('AccountController', AccountController);
        var LoginController = (function () {
            function LoginController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.accountService.login(this.loginUser).then(function () {
                    _this.$location.path('/');
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            return LoginController;
        })();
        Controllers.LoginController = LoginController;
        var RegisterController = (function () {
            function RegisterController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
            }
            RegisterController.prototype.register = function () {
                var _this = this;
                //console.log(this.registerUser);
                this.accountService.register(this.registerUser).then(function () {
                    _this.$location.path('/login');
                }).catch(function (results) {
                    //debugger;
                    _this.validationMessages = results;
                });
            };
            return RegisterController;
        })();
        Controllers.RegisterController = RegisterController;
        var ExternalLoginController = (function () {
            function ExternalLoginController($http, $location, accountService) {
                this.$location = $location;
                this.accountService = accountService;
                // if the user is already registered then redirect home else register
                var response = accountService.parseOAuthResponse($location.hash());
                var externalAccessToken = response['access_token'];
                accountService.getUserInfo(externalAccessToken).then(function (userInfo) {
                    if (userInfo.hasRegistered) {
                        accountService.storeUserInfo(response);
                        $location.path('/');
                    }
                    else {
                        $location.path('/externalRegister');
                    }
                });
            }
            return ExternalLoginController;
        })();
        Controllers.ExternalLoginController = ExternalLoginController;
        var ExternalRegisterController = (function () {
            function ExternalRegisterController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
                var response = accountService.parseOAuthResponse($location.hash());
                this.externalAccessToken = response['access_token'];
            }
            ExternalRegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.registerExternal(this.registerUser.email, this.externalAccessToken)
                    .then(function (result) {
                    _this.$location.path('/login');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            };
            return ExternalRegisterController;
        })();
        Controllers.ExternalRegisterController = ExternalRegisterController;
        var ConfirmEmailController = (function () {
            function ConfirmEmailController(accountService, $http, $routeParams, $location) {
                var _this = this;
                this.accountService = accountService;
                this.$http = $http;
                this.$routeParams = $routeParams;
                this.$location = $location;
                var userId = $routeParams['userId'];
                var code = $routeParams['code'];
                accountService.confirmEmail(userId, code)
                    .then(function (result) {
                    _this.$location.path('/');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            }
            return ConfirmEmailController;
        })();
        Controllers.ConfirmEmailController = ConfirmEmailController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AddToListController = (function () {
            function AddToListController(AddToListService, accountService, $routeParams) {
                var _this = this;
                this.AddToListService = AddToListService;
                this.accountService = accountService;
                this.result = " ";
                this.AddToListService.getWork($routeParams['id']).then(function (data) {
                    _this.work = data;
                    _this.rating = {};
                    _this.rating.score = 0;
                    _this.rating.workId = _this.work.id;
                    //console.log(this.work);
                    _this.AddToListService.getUserId().then(function (data) {
                        _this.rating.ownerId = data.ownerId;
                        //console.log('userID: ' + this.rating.ownerId);
                    });
                });
            }
            AddToListController.prototype.submit = function () {
                var _this = this;
                this.result = "Saving...";
                //console.log(this.rating);
                this.AddToListService.addToList(this.rating).then(function (data) {
                    _this.result = data.message;
                });
            };
            return AddToListController;
        })();
        Controllers.AddToListController = AddToListController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AdminController = (function () {
            function AdminController(workService, profileService, $location, $route) {
                this.workService = workService;
                this.profileService = profileService;
                this.$location = $location;
                this.$route = $route;
                this.works = workService.listWorks();
            }
            AdminController.prototype.deleteWork = function (id) {
                var _this = this;
                this.profileService.deleteUserWork(id).then(function () {
                    return _this.$route.reload();
                });
            };
            AdminController.prototype.searchTitle = function (id) {
                this.$location.path('/content/' + id);
            };
            return AdminController;
        })();
        Controllers.AdminController = AdminController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContentModalController = (function () {
            //Pass in the public review property from the editReview method in the ProfileController
            function ContentModalController(data, $uibModalInstance) {
                this.data = data;
                this.$uibModalInstance = $uibModalInstance;
                this.fileURL = this.data;
            }
            ContentModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return ContentModalController;
        })();
        Controllers.ContentModalController = ContentModalController;
        //have to manually register the modal controller
        angular.module("MyApp").controller("ContentModalController", ContentModalController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService) {
                var _this = this;
                this.HomeService = HomeService;
                this.works = [];
                HomeService.getAllWorks().then(function (data) {
                    _this.works = data;
                });
            }
            return HomeController;
        })();
        Controllers.HomeController = HomeController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var NavController = (function () {
            //public transportQuery;
            function NavController(accountService, SearchService, $location) {
                var _this = this;
                this.accountService = accountService;
                this.SearchService = SearchService;
                this.$location = $location;
                this.checkLoggedIn();
                this.checkAdmin();
                this.accountService.getUserInfo(this.accountService.isLoggedIn()).then(function (data) {
                    _this.userInfo = data;
                    _this.userName = _this.userInfo.email;
                    //console.log(this.userInfo);
                });
            }
            NavController.prototype.checkLoggedIn = function () {
                if (this.accountService.isLoggedIn() == null) {
                    this.isLoggedIn = false;
                }
                else {
                    this.isLoggedIn = true;
                }
            };
            NavController.prototype.checkAdmin = function () {
                if (this.accountService.getClaim("admin") == null) {
                    this.isAdmin = false;
                }
                else {
                    this.isAdmin = true;
                }
            };
            NavController.prototype.logout = function () {
                this.accountService.logout();
            };
            return NavController;
        })();
        Controllers.NavController = NavController;
        angular.module("MyApp").controller("NavController", NavController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ProfileController = (function () {
            function ProfileController(profileService, $location, $uibModal, $route) {
                this.profileService = profileService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$route = $route;
                this.listWorkGenres = ["Action", "Adventure", "Crime", "Comedy", "Fantasy", "Historical Fiction", "Horror", "Mystery", "Romance", "Science Fiction", "Thriller", "Drama", "Western"];
                this.getUserReviews();
                this.getUserWorks();
                this.getRead();
                this.getGenres();
            }
            //REVIEWS METHODS
            //fetches the user's reviews
            ProfileController.prototype.getUserReviews = function () {
                this.reviews = this.profileService.listUserReviews();
            };
            //edits the selected review
            ProfileController.prototype.editUserReview = function (review) {
                this.showModal(review);
            };
            //Shows modal for editing review content
            ProfileController.prototype.showModal = function (review) {
                //Opens the modal with the options specified in the argument object
                this.$uibModal.open({
                    templateUrl: '/ngApp/Views/reviewModal.html',
                    controller: 'ReviewModalController',
                    controllerAs: 'controller',
                    resolve: {
                        data: function () { return review; },
                    },
                    size: 'lg'
                });
            };
            ;
            //permanently deletes the selected review
            ProfileController.prototype.deleteUserReview = function (id) {
                var _this = this;
                this.profileService.deleteUserReview(id).then(function () {
                    return _this.$route.reload();
                });
            };
            //redirects user to search page so they can add publication to their read list, or add a review
            ProfileController.prototype.searchRedirect = function () {
                this.$location.url('/search');
            };
            //WORKS METHODS
            //fetches the user's published works
            ProfileController.prototype.getUserWorks = function () {
                this.works = this.profileService.listUserWorks();
            };
            //redirects user to publish page so they can add a new work
            ProfileController.prototype.addUserWorks = function () {
                this.$location.url('/publish');
            };
            //deletes the selected published work
            ProfileController.prototype.deleteUserWorks = function (id) {
                var _this = this;
                this.profileService.deleteUserWork(id).then(function () {
                    return _this.$route.reload();
                });
            };
            //fetches the user's list of already-read works
            ProfileController.prototype.getRead = function () {
                this.readWorks = this.profileService.listReadWorks();
            };
            //Removes a work from the user's list of read works
            ProfileController.prototype.deleteRead = function (work) {
                var _this = this;
                //console.log(work);
                this.profileService.removeRead(work).then(function () {
                    return _this.$route.reload();
                });
            };
            //GENRES Methods
            //Fetches user's existing favorite genres
            ProfileController.prototype.getGenres = function () {
                this.profileService.listFavoriteGenres();
            };
            ProfileController.prototype.updateUser = function () {
                //reload the page
                this.$route.reload();
            };
            ;
            //Handles adding genre selections 
            ProfileController.prototype.toggleSelection = function (genre) {
                var idx = this.selectedGenre.indexOf(genre);
                // is currently selected
                if (idx > -1) {
                    this.selectedGenre.splice(idx, 1);
                }
                else {
                    this.selectedGenre.push(genre);
                }
            };
            ;
            return ProfileController;
        })();
        Controllers.ProfileController = ProfileController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var PublishController = (function () {
            function PublishController(publishService, $location, filepickerService, $scope, $route) {
                this.publishService = publishService;
                this.$location = $location;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$route = $route;
                this.workToAdd = {};
                this.selectedGenre = [];
                this.listWorkTypes = [{ name: "Story" }, { name: "Article" }];
                this.listWorkGenres = ["Action", "Adventure", "Crime", "Comedy", "Fantasy", "Historical Fiction", "Horror", "Mystery", "Non-fiction", "Romance", "Science Fiction", "Science", "Technology", "Thriller", "Drama", "Western"];
            }
            PublishController.prototype.populateWorkWithType = function () {
                this.workToAdd.type = this.selectedType;
            };
            ;
            //Need to work on this
            PublishController.prototype.searchAuthor = function () {
                //passes in the author value to the service method
                var author = this.publishService.findAuthor(this.workToAdd.author);
            };
            ;
            PublishController.prototype.addWork = function () {
                //Call the searchAuthor method
                //this.searchAuthor();            
                this.workToAdd.isActive = true;
                var now = new Date();
                //console.log(now);
                this.workToAdd.dateAdded = now;
                this.workToAdd.genres = this.selectedGenre.toString();
                ;
                console.log(this.workToAdd.genres);
                this.workToAdd.tags = this.enteredTags;
                this.publishService.saveWork(this.workToAdd);
                //reload the page
                this.$route.reload();
            };
            ;
            //Handles adding genre selections 
            PublishController.prototype.toggleSelection = function (genre) {
                var idx = this.selectedGenre.indexOf(genre);
                // is currently selected
                if (idx > -1) {
                    this.selectedGenre.splice(idx, 1);
                }
                else {
                    this.selectedGenre.push(genre);
                }
            };
            ;
            //Used when creating a work        
            PublishController.prototype.pickFile = function () {
                this.filepickerService.pick(
                //{ mimetype: "image/*" },
                this.fileUploaded.bind(this));
            };
            ;
            //Used when creating a work
            PublishController.prototype.fileUploaded = function (file) {
                //save file url to database            
                this.file = file;
                this.$scope.$apply();
                this.workToAdd.fileReference = file.url;
                //console.log("fileReference" + this.workToAdd.fileReference);
            };
            ;
            return PublishController;
        })();
        Controllers.PublishController = PublishController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ReviewController = (function () {
            function ReviewController(reviewService, $routeParams, $location) {
                var _this = this;
                this.reviewService = reviewService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                //If there is already a rating by the user for the work being reviewed, get the rating and store the int value in existingRating.  
                //Otherwise, store a new rating value in newRating, create a new rating object in the repository, and link it to the new review object (and add it to the user's MyRatings list).
                this.review = {};
                this.reviewService.getWork(this.$routeParams['id']).then(function (data) {
                    _this.work = data;
                    _this.review.workId = _this.work.id;
                    //console.log('workId: ' + this.work.id);
                });
                this.reviewService.getUserId().then(function (data) {
                    _this.review.ownerId = data.ownerId;
                    //console.log("Review Owner ID: " + this.review.ownerId);
                });
            }
            ReviewController.prototype.submit = function () {
                var _this = this;
                if (this.review.content == undefined) {
                    console.log('Validation error');
                }
                else if (this.review.ownerId == 0) {
                    console.log('Authentication error');
                }
                else {
                    this.reviewService.createReview(this.review).then(function (data) {
                        if (!data.error) {
                            _this.$location.path('/content/' + _this.work.id);
                        }
                        else {
                            _this.errorMessage = "An error occurred. Make sure you've added this item to your Read list and haven't reviewed it already.";
                        }
                    });
                }
            };
            ReviewController.prototype.addReadingList = function () { };
            ReviewController.prototype.removeReadingList = function () { };
            return ReviewController;
        })();
        Controllers.ReviewController = ReviewController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ReviewModalController = (function () {
            //Pass in the public review property from the editReview method in the ProfileController
            function ReviewModalController(data, $uibModalInstance, reviewService, profileService) {
                this.data = data;
                this.$uibModalInstance = $uibModalInstance;
                this.reviewService = reviewService;
                this.profileService = profileService;
                this.review = this.data;
                this.getWork(this.review);
            }
            ReviewModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            ReviewModalController.prototype.saveReview = function () {
                var _this = this;
                this.reviewService.saveReview(this.review).then(function () {
                    _this.closeModal();
                });
            };
            ReviewModalController.prototype.getWork = function (review) {
                this.work = this.profileService.getWork(review.workId);
            };
            return ReviewModalController;
        })();
        Controllers.ReviewModalController = ReviewModalController;
        //have to manually register the modal controller
        angular.module("MyApp").controller("ReviewModalController", ReviewModalController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var apiURL = 'api/search/';
        var SearchController = (function () {
            function SearchController(SearchService) {
                this.SearchService = SearchService;
                this.query = {};
                this.query.searchFor = "Story";
                this.query.searchBy = "title";
            }
            SearchController.prototype.setParams = function (input) {
                this.query.searchBy = input;
            };
            //TODO: if the user clicks the search button before the query is initialized, there will be an error.
            SearchController.prototype.search = function () {
                var _this = this;
                if (this.query.query == undefined || this.query.query == "") {
                    //Display an error to the view
                    console.log('error');
                }
                else {
                    this.SearchService.search(this.query).then(function (data) {
                        _this.results = data.results;
                        //this.username = this.getUsername();
                    });
                }
            };
            ;
            return SearchController;
        })();
        Controllers.SearchController = SearchController;
        angular.module("MyApp").controller("searchController", SearchController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var WorkDetailsController = (function () {
            function WorkDetailsController(workService, accountService, $uibModal, $routeParams, $sce, $location, $window) {
                var _this = this;
                this.accountService = accountService;
                this.$uibModal = $uibModal;
                this.$sce = $sce;
                this.$location = $location;
                this.$window = $window;
                this.isLoggedIn = false;
                this.checkLoggedIn();
                workService.getWork($routeParams['id']).then(function (data) {
                    _this.work = data;
                    _this.createViewerURL();
                    console.log(_this.work);
                });
            }
            ;
            WorkDetailsController.prototype.checkLoggedIn = function () {
                if (this.accountService.isLoggedIn() == null) {
                    this.isLoggedIn = false;
                }
                else {
                    this.isLoggedIn = true;
                }
            };
            ;
            WorkDetailsController.prototype.createViewerURL = function () {
                this.workViewerURL = this.work.fileReference.replace("https://cdn.filestackcontent.com/", "https://www.filestackapi.com/api/preview/");
            };
            ;
            WorkDetailsController.prototype.launchViewer = function () {
                //this.createViewerURL();
                this.$window.open(this.workViewerURL);
            };
            ;
            return WorkDetailsController;
        })();
        Controllers.WorkDetailsController = WorkDetailsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var AccountService = (function () {
            function AccountService($q, $http, $window) {
                this.$q = $q;
                this.$http = $http;
                this.$window = $window;
            }
            // Store access token and claims in browser session storage
            AccountService.prototype.storeUserInfo = function (userInfo) {
                // store auth token
                this.$window.sessionStorage.setItem('token', userInfo.access_token);
                // store claims
                for (var prop in userInfo) {
                    if (prop.indexOf('claim_') == 0) {
                        this.$window.sessionStorage.setItem(prop, userInfo[prop]);
                    }
                }
            };
            AccountService.prototype.getClaim = function (type) {
                return this.$window.sessionStorage.getItem('claim_' + type);
            };
            AccountService.prototype.login = function (loginUser) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = "grant_type=password&username=" + loginUser.userName + "&password=" + loginUser.password;
                    _this.$http.post('/Token', data, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (result) {
                        _this.storeUserInfo(result);
                        // redirect to home
                        window.location.reload();
                        resolve();
                    }).error(function (result) {
                        reject(result);
                    });
                });
            };
            AccountService.prototype.register = function (userLogin) {
                var _this = this;
                //console.log("service test");
                return this.$q(function (resolve, reject) {
                    _this.$http.post('/api/account/register', userLogin)
                        .then(function (result) {
                        resolve(result);
                    })
                        .catch(function (result) {
                        // flatten error messages
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
                });
            };
            AccountService.prototype.logout = function () {
                // clear all of session storage (including claims)
                this.$window.sessionStorage.clear();
                window.location.reload();
            };
            AccountService.prototype.isLoggedIn = function () {
                return this.$window.sessionStorage.getItem('token');
            };
            // associate external login (e.g., Twitter) with local user account 
            AccountService.prototype.registerExternal = function (email, token) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post('/api/account/registerExternal', { email: email }, { headers: { Authorization: 'Bearer ' + token } })
                        .then(function (result) {
                        resolve(result);
                    })
                        .catch(function (result) {
                        // flatten error messages
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
                });
            };
            // get email, registration status, and provider for current user 
            AccountService.prototype.getUserInfo = function (externalAccessToken) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.get('/api/account/userinfo', { headers: { Authorization: 'Bearer ' + externalAccessToken } })
                        .then(function (result) {
                        resolve(result.data);
                    })
                        .catch(function (result) {
                        // flatten error messages
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        return messages;
                    });
                });
            };
            AccountService.prototype.getExternalLogins = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var url = "api/Account/ExternalLogins?returnUrl=%2FexternalLogin&generateState=true";
                    _this.$http.get(url).then(function (result) {
                        resolve(result.data);
                    }).catch(function (result) {
                        reject(result);
                    });
                });
            };
            AccountService.prototype.confirmEmail = function (userId, code) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = {
                        userId: userId,
                        code: code
                    };
                    _this.$http.post('/api/account/confirmEmail', data).then(function (result) {
                        resolve(result.data);
                    }).catch(function (result) {
                        reject(result);
                    });
                });
            };
            // extract access token from response
            AccountService.prototype.parseOAuthResponse = function (token) {
                var results = {};
                token.split('&').forEach(function (item) {
                    var pair = item.split('=');
                    results[pair[0]] = pair[1];
                });
                return results;
            };
            return AccountService;
        })();
        Services.AccountService = AccountService;
        angular.module('MyApp').service('accountService', AccountService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var AddToListService = (function () {
            function AddToListService($resource) {
                this.$resource = $resource;
                this.workResource = this.$resource("/api/work/:id", null, {
                    addToList: {
                        method: 'POST',
                        url: '/api/work/addToList'
                    },
                    getUserId: {
                        url: "/api/work/getUserId",
                        method: "GET"
                    },
                });
            }
            AddToListService.prototype.getWork = function (id) {
                return this.workResource.get({ id: id }).$promise;
            };
            AddToListService.prototype.getUserId = function () {
                return this.workResource.getUserId().$promise;
            };
            AddToListService.prototype.addToList = function (rating) {
                return this.workResource.addToList(rating).$promise;
            };
            return AddToListService;
        })();
        Services.AddToListService = AddToListService;
        angular.module("MyApp").service("AddToListService", AddToListService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.workResource = this.$resource('api/work/:id');
            }
            HomeService.prototype.getAllWorks = function () {
                return (this.workResource.query().$promise);
            };
            return HomeService;
        })();
        Services.HomeService = HomeService;
        angular.module("MyApp").service("HomeService", HomeService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ProfileService = (function () {
            function ProfileService($resource) {
                this.ReviewsResource = $resource('/api/reviews/:id');
                this.WorksResource = $resource('/api/work/getByUser/');
                this.ReadWorksResource = $resource('api/work/readList/');
                this.WorkByIdResource = $resource('/api/work/:id');
                this.WorkDeleteResource = $resource('api/work/hardDelete/:id');
                this.RemoveReadResource = $resource('api/work/deleteFromList');
                this.GenreResource = $resource('api/genres/:id');
            }
            //list user's reviews
            ProfileService.prototype.listUserReviews = function () {
                return this.ReviewsResource.query();
            };
            //update user's review (redirect to review page with review preloaded)
            ProfileService.prototype.saveUserReview = function () {
                return this.ReviewsResource.save();
            };
            //permanently delete user's review
            ProfileService.prototype.deleteUserReview = function (id) {
                //console.log(id);
                return this.ReviewsResource.delete({ id: id }).$promise;
            };
            //list user's published works
            ProfileService.prototype.listUserWorks = function () {
                return this.WorksResource.query();
            };
            //delete user's published work (soft delete)
            ProfileService.prototype.hideUserWork = function (id) {
                return this.WorkDeleteResource.delete({ id: id });
            };
            //permanently delete a user's published work (hard delete)        
            ProfileService.prototype.deleteUserWork = function (id) {
                //console.log(id);
                return this.WorkByIdResource.delete({ id: id }).$promise;
            };
            //get a single Work by it's ID
            ProfileService.prototype.getWork = function (id) {
                return this.WorkByIdResource.get({ id: id });
            };
            //Show list of read works
            ProfileService.prototype.listReadWorks = function () {
                return this.ReadWorksResource.query();
            };
            //Remove work from list of read works
            ProfileService.prototype.removeRead = function (work) {
                //console.log('profileService.ts' + work);
                return this.RemoveReadResource.save(work).$promise;
            };
            //Show list of favorite genres
            ProfileService.prototype.listFavoriteGenres = function () {
                return this.GenreResource.query();
            };
            return ProfileService;
        })();
        Services.ProfileService = ProfileService;
        angular.module('MyApp').service('profileService', ProfileService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var PublishService = (function () {
            function PublishService($resource) {
                this.PublishResource = $resource('/api/work/:id');
                //this.PublishResourceSearchAuthor = $resource('/api/works/:author');
            }
            //returns a list of users for searching client side
            PublishService.prototype.listProfiles = function () {
                return this.PublishResource.query();
            };
            //simple method for searching all users server side
            PublishService.prototype.findAuthor = function (author) {
                //return this.PublishResourceSearchAuthor.get(author);
                return this.PublishResource.get(author);
            };
            //saves the work to the server side
            PublishService.prototype.saveWork = function (work) {
                return this.PublishResource.save(work);
            };
            return PublishService;
        })();
        Services.PublishService = PublishService;
        angular.module('MyApp').service('publishService', PublishService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ReviewService = (function () {
            //just some function that returns list of reviews, can be modified later
            //public listReviews() {
            //    return this.ReviewResource.query();
            //}
            function ReviewService($resource) {
                this.$resource = $resource;
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
            ReviewService.prototype.getWork = function (id) {
                return this.ReviewResource.get({ id: id }).$promise;
            };
            ReviewService.prototype.getUserId = function () {
                return this.ReviewResource.getUserId().$promise;
            };
            ReviewService.prototype.createReview = function (review) {
                return this.ReviewResource.addReview(review).$promise;
            };
            ReviewService.prototype.saveReview = function (review) {
                return this.ReviewResource.saveReview(review).$promise;
            };
            return ReviewService;
        })();
        Services.ReviewService = ReviewService;
        angular.module('MyApp').service('reviewService', ReviewService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var SearchService = (function () {
            //public transportQuery;
            function SearchService($resource) {
                this.$resource = $resource;
                this.workResource = this.$resource('api/work/:id', null, {
                    search: {
                        url: "/api/work/search",
                        method: "POST"
                    }
                });
            }
            SearchService.prototype.search = function (query) {
                return this.workResource.search(query).$promise;
            };
            return SearchService;
        })();
        Services.SearchService = SearchService;
        angular.module("MyApp").service('SearchService', SearchService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var WorkService = (function () {
            function WorkService($resource) {
                this.WorkResource = $resource('/api/work/:id', null, {
                    deleteRestore: {
                        method: 'DELETE',
                        url: '/api/work/deleteRestore/:id',
                        isArray: false
                    }
                });
            }
            WorkService.prototype.getWork = function (id) {
                //debugger;
                return this.WorkResource.get({ id: id }).$promise;
            };
            WorkService.prototype.softDelete = function (id) {
                //debugger;
                return this.WorkResource.deleteRestore({ id: id }).$promise;
            };
            ;
            WorkService.prototype.listWorks = function () {
                return this.WorkResource.query();
            };
            return WorkService;
        })();
        Services.WorkService = WorkService;
        angular.module('MyApp').service('workService', WorkService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=master.js.map