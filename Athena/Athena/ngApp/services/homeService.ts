namespace MyApp.Services {

    export class HomeService {
        private workResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.workResource = this.$resource('api/work/:id');
        }

        public getAllWorks() {
            return (this.workResource.query().$promise);
        }
    }

    angular.module("MyApp").service("HomeService", HomeService);

}