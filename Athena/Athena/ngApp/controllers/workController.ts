namespace MyApp.Controllers {

    export class WorkDetailsController {
        public work;
        public isLoggedIn = false;
        public fileRefReplace;
        public workViewerURL;       

        constructor(workService: MyApp.Services.WorkService, private accountService: MyApp.Services.AccountService, private $uibModal: angular.ui.bootstrap.IModalService, $routeParams: ng.route.IRouteParamsService, private $sce: angular.ISCEService, private $location: angular.ILocationService, private $window: angular.IWindowService) {
            this.checkLoggedIn();
            workService.getWork($routeParams['id']).then((data) => {
                this.work = data;
                this.createViewerURL(); 
                console.log(this.work);               
            });           
        };

        public checkLoggedIn() {
            if (this.accountService.isLoggedIn() == null) {
                this.isLoggedIn = false;
            }
            else {
                this.isLoggedIn = true;
            }
        };

        public createViewerURL() {            
            this.workViewerURL = this.work.fileReference.replace("https://cdn.filestackcontent.com/", "https://www.filestackapi.com/api/preview/");            
        };

        public launchViewer() {
            //this.createViewerURL();
            this.$window.open(this.workViewerURL);
        };

        //These launchViewer and showModal functions are there for future functionality
        //public launchViewer() {
        //    this.createViewerURL();
        //    //debugger;
        //    this.trustedWorkViewerURL = this.$sce.trustAsResourceUrl(this.workViewerURL);
        //    console.log(this.trustedWorkViewerURL);
        //    this.showModal();
        //};

        ////Shows modal for editing review content
        //showModal() {            
        //    //Opens the modal with the options specified in the argument object
        //    this.$uibModal.open({
        //        templateUrl: this.trustedWorkViewerURL,
        //        //templateUrl: '/ngApp/Views/contentModal.html',
        //        controller: 'ReviewModalController',
        //        controllerAs: 'controller',
        //        resolve: {
        //            data: () => this.trustedWorkViewerURL, //pass the URL to the modal
        //        },
        //        size: 'lg'
        //    });
        //};

    }

}