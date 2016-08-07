using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Quote
{
    public class QuoteDatatableData
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<QuoteDataItem> data { get; set; }
    }
}