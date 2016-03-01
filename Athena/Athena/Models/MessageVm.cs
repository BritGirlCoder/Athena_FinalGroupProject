using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athena.Models
{
    public class MessageVm
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public bool Error { get; set; }
    }
}