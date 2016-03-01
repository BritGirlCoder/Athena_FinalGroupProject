namespace MyApp.Controllers {

    export class AddToListController {
        public work;
        public rating;
        public result = " ";

        constructor(private AddToListService: MyApp.Services.AddToListService, private accountService: MyApp.Services.AccountService, $routeParams: ng.route.IRouteParamsService) {
            this.AddToListService.getWork($routeParams['id']).then((data) => {
                this.work = data;
                this.rating = {};
                this.rating.score = 0;
                this.rating.workId = this.work.id;
                //console.log(this.work);

                this.AddToListService.getUserId().then((data) => {
                    this.rating.ownerId = data.ownerId;
                    //console.log('userID: ' + this.rating.ownerId);
                });
            });
        }

        public submit() {
            this.result = "Saving...";
            //console.log(this.rating);
            this.AddToListService.addToList(this.rating).then((data) => {
                this.result = data.message;
            });
        }
    }

}