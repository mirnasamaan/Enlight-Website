using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Widget
{
    public class WidgetDataItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public int? Order { get; set; }
        public string Actions { get; set; }
    }
}