using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Quote
{
    public class QuoteDataItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public string KnowledgeBase { get; set; }
        public string Actions { get; set; }
    }
}