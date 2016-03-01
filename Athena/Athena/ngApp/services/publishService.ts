namespace MyApp.Services {

    export class PublishService {

        private PublishResource;
        private PublishResourceSearchAuthor;

        constructor($resource: angular.resource.IResourceService) {
            this.PublishResource = $resource('/api/work/:id');
            //this.PublishResourceSearchAuthor = $resource('/api/works/:author');
            
        }
        //returns a list of users for searching client side
        public listProfiles() {
            return this.PublishResource.query();
        }

        //simple method for searching all users server side
        public findAuthor(author) {
            //return this.PublishResourceSearchAuthor.get(author);
            return this.PublishResource.get(author);
        }

        //saves the work to the server side
        public saveWork(work) {
            return this.PublishResource.save(work);
        }
    }

    angular.module('MyApp').service('publishService', PublishService);

}