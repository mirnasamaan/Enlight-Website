using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.User
{
    public class UserDatatableData
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<UserDataItem> data { get; set; }
    }
}