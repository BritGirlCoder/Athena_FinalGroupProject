namespace MyApp.Controllers {

    export class PublishController {

        //Holds a single Work to add
        public workToAdd;
        //Holds the list of work types (story, article)
        public listWorkTypes;
        //Holds the selected Type
        public selectedType;
        //Holds the list of genres
        public listWorkGenres;
        //Holds selected genre
        public selectedGenre;
        //holds the user-entered tags
        public enteredTags;
        //Holds the uploaded file information
        public file;
        //property to hold any validation errors
        public validationErrors;

        constructor(private publishService: MyApp.Services.PublishService, private $location: angular.ILocationService, private filepickerService, private $scope: ng.IScope, private $route: ng.route.IRouteService) {
            this.workToAdd = {};
            this.selectedGenre = [];
            this.listWorkTypes = [{ name: "Story" }, { name: "Article" }];
            this.listWorkGenres = ["Action", "Adventure", "Crime", "Comedy", "Fantasy", "Historical Fiction", "Horror", "Mystery", "Non-fiction", "Romance", "Science Fiction", "Science", "Technology", "Thriller", "Drama", "Western"];
        }

        populateWorkWithType() {
            this.workToAdd.type = this.selectedType;
        };

        //Need to work on this
        searchAuthor() {
            //passes in the author value to the service method
            var author = this.publishService.findAuthor(this.workToAdd.author);
        };

        addWork() {
            //Call the searchAuthor method
            //this.searchAuthor();            
            this.workToAdd.isActive = true;
            var now = new Date();
            //console.log(now);
            this.workToAdd.dateAdded = now;
            this.workToAdd.genres = this.selectedGenre.toString();;
            console.log(this.workToAdd.genres);
            this.workToAdd.tags = this.enteredTags;
            this.publishService.saveWork(this.workToAdd);
            //reload the page
            this.$route.reload();
        };

        //Handles adding genre selections 
        toggleSelection(genre) {
            var idx = this.selectedGenre.indexOf(genre); 
            // is currently selected
            if (idx > -1) {
                this.selectedGenre.splice(idx, 1);
            } 
            // is newly selected
            else {
                this.selectedGenre.push(genre);
            }
        };

        //Used when creating a work        
        public pickFile() {
            this.filepickerService.pick(
                //{ mimetype: "image/*" },
                this.fileUploaded.bind(this)
            );
        };

        //Used when creating a work
        public fileUploaded(file) {
            //save file url to database            
            this.file = file;
            this.$scope.$apply();
            this.workToAdd.fileReference = file.url;
            //console.log("fileReference" + this.workToAdd.fileReference);
        };

    }
}