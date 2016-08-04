using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Data;
using System.ComponentModel.DataAnnotations;

namespace Admin.Models.User
{
    public class UserVM
    {
        public int ID { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public DateTime? CreationDate { get; set; }
        public string UserToken { get; set; }
        public DateTime? LastLoginDate { get; set; }

        public UserVM ()
        {

        }

        public UserVM (Data.Context.User user)
        {
            this.ID = user.ID;
            this.Email = user.Email;
            this.Password = user.Password;
            this.CreationDate = user.CreationDate;
            this.LastLoginDate = user.LastLoginDate;
            this.UserToken = user.UserToken;
        }

        public Data.Context.User ToModel ()
        {
            Data.Context.User user = new Data.Context.User();
            user.ID = this.ID;
            user.Email = this.Email;
            user.Password = this.Password;
            if (this.CreationDate != null)
            {
                user.CreationDate = this.CreationDate.Value;
            }
            if (this.LastLoginDate != null)
            {
                user.LastLoginDate = this.LastLoginDate.Value;
            }
            user.UserToken = this.UserToken;
            return user;
        }
    }

    
}