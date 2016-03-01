namespace MyApp.Controllers {

    export class HomeController {
        public works = [];

        constructor(private HomeService: MyApp.Services.HomeService) {
            HomeService.getAllWorks().then((data) => {
                this.works = data;
            });

            
        }
    }

}