namespace MyApp.Services {

    export class ProfileService {

        //property to hold reviews $resource
        private ReviewsResource;
        //property to hold works $resource
        private WorksResource;
        //property to hold read works $resource
        private ReadWorksResource;
        //property to hold work $resource
        private WorkByIdResource;
        //property to hold work to delete $resource
        private WorkDeleteResource;
        //property to hold review to delete $resource
        private ReviewDelete;
        //property to hold work to soft delete $resource
        private WorkHide;
        //property to hold remove work from read list $resource
        private RemoveReadResource;
        //property to hold genre $resource
        private GenreResource;

        constructor($resource: angular.resource.IResourceService) {
            this.ReviewsResource = $resource('/api/reviews/:id');
            this.WorksResource = $resource('/api/work/getByUser/');
            this.ReadWorksResource = $resource('api/work/readList/')
            this.WorkByIdResource = $resource('/api/work/:id');
            this.WorkDeleteResource = $resource('api/work/hardDelete/:id');
            this.RemoveReadResource = $resource('api/work/deleteFromList');
            this.GenreResource = $resource('api/genres/:id');
        }

        //list user's reviews
        public listUserReviews() {
            return this.ReviewsResource.query();
        }

        //update user's review (redirect to review page with review preloaded)
        public saveUserReview() {
            return this.ReviewsResource.save()
        }

        //permanently delete user's review
        public deleteUserReview(id: number) {
            //console.log(id);
            return this.ReviewsResource.delete({id: id}).$promise;
        }

        //list user's published works
        public listUserWorks() {
            return this.WorksResource.query();
        }
        
        //delete user's published work (soft delete)
        public hideUserWork(id: number) {
            return this.WorkDeleteResource.delete({ id: id });
        }

        //permanently delete a user's published work (hard delete)        
        public deleteUserWork(id: number) {
            //console.log(id);
            return this.WorkByIdResource.delete({ id: id }).$promise;
        }

        //get a single Work by it's ID
        public getWork(id: number) {
            return this.WorkByIdResource.get({ id: id });
        }

        //Show list of read works
        public listReadWorks() {
            return this.ReadWorksResource.query();
        }

        //Remove work from list of read works
        public removeRead(work) {
            //console.log('profileService.ts' + work);
            return this.RemoveReadResource.save(work).$promise;
        }

        //Show list of favorite genres
        public listFavoriteGenres() {
            return this.GenreResource.query();
        }

        //Update user's favorite genres

    }

    angular.module('MyApp').service('profileService', ProfileService);

}