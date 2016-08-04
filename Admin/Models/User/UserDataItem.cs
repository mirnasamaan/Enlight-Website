using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.User
{
    public class UserDataItem
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserToken { get; set; }
        public string CreationDate { get; set; }
        public string LastLoginDate { get; set; }
        public string Actions { get; set; }
    }
}