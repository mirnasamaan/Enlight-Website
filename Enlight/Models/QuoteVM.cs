using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Data.Context;

namespace Enlight.Models
{
    public class QuoteVM
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public string KnowledgeBase { get; set; }

        public QuoteVM()
        {

        }

        public QuoteVM(Quote quote)
        {
            this.Id = quote.Id;
            this.Name = quote.Name;
            this.Email = quote.Email;
            this.Phone = quote.Phone;
            this.Category = quote.Category;
            this.Type = quote.Type;
            this.Message = quote.Message;
            this.KnowledgeBase = quote.KnowledgeBase;
        }

        public Quote toModel()
        {
            Quote quote = new Quote();
            quote.Id = this.Id;
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