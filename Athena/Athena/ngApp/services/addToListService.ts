namespace MyApp.Services {

    export class AddToListService {     
        private workResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.workResource = this.$resource("/api/work/:id", null, {
                addToList: {
                    method: 'POST',
                    url: '/api/work/addToList'
                },
                getUserId: {
                    url: "/api/work/getUserId",
                    method: "GET"
                },
            })
        }

        public getWork(id) {
            return this.workResource.get({ id: id }).$promise;
        }

        public getUserId() {
            return this.workResource.getUserId().$promise;
        }

        public addToList(rating) {
            return this.workResource.addToList(rating).$promise;
        }
    }

    angular.module("MyApp").service("AddToListService", AddToListService);

}