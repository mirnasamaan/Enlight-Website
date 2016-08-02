using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Data;

namespace Admin.Models.User
{
    public class UserVM
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public System.DateTime CreationDate { get; set; }
        public string UserToken { get; set; }

        public UserVM ()
        {

        }

        public UserVM (Data.Context.User user)
        {
            this.ID = user.ID;
            this.Email = user.Email;
            this.Password = user.Password;
            this.CreationDate = user.CreationDate;
            this.UserToken = user.UserToken;
        }

        public Data.Context.User ToModel ()
        {
            Data.Context.User user = new Data.Context.User();
            user.ID = this.ID;
            user.Email = this.Email;
            user.Password = this.Password;
            user.CreationDate = this.CreationDate;
            user.UserToken = this.UserToken;
            return user;
        }
    }

    
}