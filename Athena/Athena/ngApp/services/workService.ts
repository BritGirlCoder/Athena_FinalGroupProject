namespace MyApp.Services {

    export class WorkService {

        private WorkResource;

        public getWork(id) {
            //debugger;
            return this.WorkResource.get({ id: id }).$promise;
        }

        public softDelete(id: number)
        {
            //debugger;
            return this.WorkResource.deleteRestore({ id: id }).$promise;
        };

        public listWorks() {
            return this.WorkResource.query();
        } 


        constructor($resource: ng.resource.IResourceService) {
            this.WorkResource = $resource('/api/work/:id', null, {
                deleteRestore: {
                    method: 'DELETE',
                    url: '/api/work/deleteRestore/:id',
                    isArray: false
                }
            });

    }
    }

    angular.module('MyApp').service('workService', WorkService);

}

