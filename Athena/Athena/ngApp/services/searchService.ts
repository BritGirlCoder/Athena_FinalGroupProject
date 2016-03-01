namespace MyApp.Services {
    export class SearchService { 
        private workResource;
        //public transportQuery;

        constructor(private $resource: ng.resource.IResourceService) {
            this.workResource = this.$resource('api/work/:id', null, {
                search: {
                    url: "/api/work/search",
                    method: "POST"
                }
            });
        } 

        public search(query) {
            return this.workResource.search(query).$promise;
        }

    }

    angular.module("MyApp").service('SearchService', SearchService);
}