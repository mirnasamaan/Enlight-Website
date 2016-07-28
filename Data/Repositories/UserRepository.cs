using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Context;

namespace Data.Repositories
{
    public class UserRepository
    {
        private EnlightEntities _ee;

        public UserRepository ()
        {
            _ee = new EnlightEntities();
        }

        public User GetUserByEmail(string email)
        {
            return _ee.Users.FirstOrDefault(i => i.Email.ToLower() == email.ToLower());
        }
    }
}
