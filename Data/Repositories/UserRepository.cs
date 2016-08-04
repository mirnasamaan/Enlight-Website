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

        public async Task<User> AddUser(User user)
        {
            _ee.Users.Add(user);
            await _ee.SaveChangesAsync();
            return user;
        }

        public async Task<User> EditUser(User user)
        {
            _ee.Users.Attach(user);
            _ee.Entry(user).State = EntityState.Modified;
            await _ee.SaveChangesAsync();
            return user;
        }

        public IQueryable<User> GetFilteredUsers(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            IQueryable<User> data = _ee.Users;
            recordsTotal = data.Count();
            if (!string.IsNullOrEmpty(search))
                data = data.Where(i => i.ID.ToString().Contains(search) || i.Email.ToLower().Contains(search.ToLower()) || i.CreationDate.Equals(search)
                || i.LastLoginDate.Equals(search));
            data = data.OrderByDescending(i => i.ID);
            if (sortColumn == 0)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.ID);
                else
                    data = data.OrderByDescending(i => i.ID);
            }
            if (sortColumn == 1)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.Email);
                else
                    data = data.OrderByDescending(i => i.Email);
            }
            if (sortColumn == 2)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.CreationDate);
                else
                    data = data.OrderByDescending(i => i.CreationDate);
            }
            if (sortColumn == 3)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.LastLoginDate);
                else
                    data = data.OrderByDescending(i => i.LastLoginDate);
            }
            if (data == null)
            {
                recordFiltered = 0;
                data = null;
            }
            else
            {
                recordFiltered = data.Count();
                data = data.Skip(start).Take(length);
            }
            return data;
        }

        public User GetUser(int Id)
        {
            return _ee.Users.FirstOrDefault(i => i.ID == Id);
        }

        public async Task<bool> DeleteUser(int Id)
        {
            try
            {
                User user = _ee.Users.FirstOrDefault(i => i.ID == Id);
                _ee.Users.Remove(user);
                await _ee.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

    }
}
