using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Data.Context;

namespace Enlight.Models
{
    public class ContactVM
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
        public string Message { get; set; }

        public ContactVM()
        {

        }

        public ContactVM(Contact contact)
        {
            this.Id = contact.Id;
            this.Name = contact.Name;
            this.Email = contact.Email;
            this.Phone = contact.Phone;
            this.Message = contact.Message;
        }

        public Contact toModel()
        {
            Contact contact = new Contact();
            contact.Id = this.Id;
            contact.Name = this.Name;
            contact.Email = this.Email;
            contact.Phone = this.Phone;
            contact.Message = this.Message;
            return contact;
        }
    }
}