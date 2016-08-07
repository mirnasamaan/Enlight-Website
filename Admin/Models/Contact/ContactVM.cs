using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Data;
using System.ComponentModel.DataAnnotations;

namespace Admin.Models.Contact
{
    public class ContactVM
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }

        public ContactVM ()
        {

        }

        public ContactVM (Data.Context.Contact contact)
        {
            this.ID = contact.Id;
            this.Name = contact.Name;
            this.Email = contact.Email;
            this.Phone = contact.Phone;
            this.Message = contact.Message;
        }

        public Data.Context.Contact ToModel ()
        {
            Data.Context.Contact contact = new Data.Context.Contact();
            contact.Id = this.ID;
            contact.Name = this.Name;
            contact.Email = this.Email;
            contact.Phone = this.Phone;
            contact.Message = this.Message;
            return contact;
        }
    }

    
}