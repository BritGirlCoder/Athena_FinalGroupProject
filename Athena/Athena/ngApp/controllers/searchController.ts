namespace MyApp.Controllers {
    const apiURL = 'api/search/';
    export class SearchController {

        public query;
        public results;        

        constructor(private SearchService: MyApp.Services.SearchService) {
            this.query = {};
            this.query.searchFor = "Story";
            this.query.searchBy = "title";
        }

        public setParams(input) {
            this.query.searchBy = input;
        }

        //TODO: if the user clicks the search button before the query is initialized, there will be an error.
        public search() {
            if (this.query.query == undefined || this.query.query == "") {
                //Display an error to the view
                console.log('error');
            }
            else {
                this.SearchService.search(this.query).then((data) => {
                    this.results = data.results;                    
                    //this.username = this.getUsername();
                })
            }
        };        

    }

    angular.module("MyApp").controller("searchController", SearchController);
}



