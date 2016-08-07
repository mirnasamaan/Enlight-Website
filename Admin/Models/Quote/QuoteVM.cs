using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Data;
using System.ComponentModel.DataAnnotations;

namespace Admin.Models.Quote
{
    public class QuoteVM
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public string KnowledgeBase { get; set; }

        public QuoteVM ()
        {

        }

        public QuoteVM (Data.Context.Quote quote)
        {
            this.ID = quote.Id;
            this.Name = quote.Name;
            this.Email = quote.Email;
            this.Phone = quote.Phone;
            this.Category = quote.Category;
            this.Type = quote.Type;
            this.Message = quote.Message;
            this.KnowledgeBase = quote.KnowledgeBase;
        }

        public Data.Context.Quote ToModel ()
        {
            Data.Context.Quote quote = new Data.Context.Quote();
            quote.Id = this.ID;
            quote.Name = this.Name;
            quote.Email = this.Email;
            quote.Phone = this.Phone;
            quote.Category = this.Category;
            quote.Type = this.Type;
            quote.Message = this.Message;
            quote.KnowledgeBase = this.KnowledgeBase;
            return quote;
        }
    }

    
}