using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Widget
{
    public class WidgetDatatableData
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<WidgetDataItem> data { get; set; }
    }
}