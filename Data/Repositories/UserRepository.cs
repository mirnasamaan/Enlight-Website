using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
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

        public bool isValidPassword (string Email, string Password)
        {
            if (_ee.Users.Any(i => i.Email == Email))
            {
                if (_ee.Users.FirstOrDefault(i => i.Email == Email).Password == Password)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public void UpdateLastLogin(User entity)
        {
            _ee.Users.Attach(entity);
            _ee.Entry(entity).State = EntityState.Modified;
            _ee.SaveChanges();
        }
    }
}
