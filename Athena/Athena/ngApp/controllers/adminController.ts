namespace MyApp.Controllers {

    export class AdminController {
        public works;
    

        public deleteWork(id : number) {
            this.profileService.deleteUserWork(id).then(() =>
                this.$route.reload());
        }

        public searchTitle(id: number) {
            this.$location.path('/content/' + id);
        }

        constructor(private workService: MyApp.Services.WorkService, private profileService: MyApp.Services.ProfileService, private $location: angular.ILocationService, private $route: ng.route.IRouteService) {
            this.works = workService.listWorks();
        }

    }

}
