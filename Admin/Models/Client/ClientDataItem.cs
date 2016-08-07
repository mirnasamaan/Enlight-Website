using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Client
{
    public class ClientDataItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Actions { get; set; }
    }
}