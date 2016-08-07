using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Data.Context;

namespace Enlight.Models
{
    public class ClientsVM
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }


        public ClientsVM()
        {

        }


        public ClientsVM(Client client)
        {
            this.ID = client.ID;
            this.Name = client.Name;
            this.Logo = client.Logo;
        }


        public Client toModel()
        {
            Client client = new Client();
            client.ID = this.ID;
            client.Name = this.Name;
            client.Logo = this.Logo;
            return client;
        }
    }
}