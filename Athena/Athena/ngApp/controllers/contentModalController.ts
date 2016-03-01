namespace MyApp.Controllers {

    export class ContentModalController {

        //Public property to hold the current review
        public fileURL;
        
        //Pass in the public review property from the editReview method in the ProfileController
        constructor(private data, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            this.fileURL = this.data;
        }

        closeModal() {
            this.$uibModalInstance.close();
        }        

    }

    //have to manually register the modal controller
    angular.module("MyApp").controller("ContentModalController", ContentModalController);
}