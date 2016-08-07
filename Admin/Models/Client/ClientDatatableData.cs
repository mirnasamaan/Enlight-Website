using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Client
{
    public class ClientDatatableData
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<ClientDataItem> data { get; set; }
    }
}