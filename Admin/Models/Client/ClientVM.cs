using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Data;
using System.ComponentModel.DataAnnotations;

namespace Admin.Models.Client
{
    public class ClientVM
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Logo { get; set; }
        public HttpPostedFileBase LogoFile { get; set; }

        public ClientVM ()
        {

        }

        public ClientVM (Data.Context.Client client)
        {
            this.ID = client.ID;
            this.Name = client.Name;
            this.Logo = client.Logo;
        }

        public Data.Context.Client ToModel ()
        {
            Data.Context.Client client = new Data.Context.Client();
            client.ID = this.ID;
            client.Name = this.Name;
            client.Logo = this.Logo;
            return client;
        }
    }

    
}