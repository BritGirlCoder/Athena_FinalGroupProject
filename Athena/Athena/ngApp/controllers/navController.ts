namespace MyApp.Controllers {

    export class NavController {
        public isLoggedIn;
        public isAdmin;
        public userInfo;
        public userName;
        public userId; //for routing to the user's profile page
        //public transportQuery;

        constructor(private accountService: MyApp.Services.AccountService, private SearchService: MyApp.Services.SearchService, private $location: angular.ILocationService) {
            this.checkLoggedIn();
            this.checkAdmin();
            this.accountService.getUserInfo(this.accountService.isLoggedIn()).then((data) => {
                this.userInfo = data;
                this.userName = this.userInfo.email;
                //console.log(this.userInfo);
            });
        }

        public checkLoggedIn() {
            if (this.accountService.isLoggedIn() == null) {
                this.isLoggedIn = false;
            }
            else {
                this.isLoggedIn = true;
            }
        }

        public checkAdmin() {
            if (this.accountService.getClaim("admin") == null) {
                this.isAdmin = false;
            }
            else {
                this.isAdmin = true;
            }
        }

        public logout() {
            this.accountService.logout();
        }

        //public search() {
        //    this.SearchService.transportQuery = this.transportQuery;
        //    console.log(this.transportQuery);
        //    console.log(this.SearchService.transportQuery);
        //    this.$location.path('/search');
        //}
    }

    angular.module("MyApp").controller("NavController", NavController);

}