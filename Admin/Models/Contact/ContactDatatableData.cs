using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Contact
{
    public class ContactDatatableData
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<ContactDataItem> data { get; set; }
    }
}