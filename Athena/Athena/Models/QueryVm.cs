using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athena.Models
{
    //TODO
    public class QueryVm
    {
        public int Id { get; set; }
        public string SearchFor { get; set; }
        public string SearchBy { get; set; }
        public string Query { get; set; }
        public List<Work> Results { get; set; }
    }
}