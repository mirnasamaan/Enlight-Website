using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Data.Context;


namespace Data.Repositories
{
    public class ContactRepository
    {
        private EnlightEntities _ee;

        public ContactRepository ()
        {
            _ee = new EnlightEntities();
        }
        
        public IQueryable<Contact> GetFilteredContacts(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            IQueryable<Contact> data = _ee.Contacts;
            recordsTotal = data.Count();
            if (!string.IsNullOrEmpty(search))
                data = data.Where(i => i.Id.ToString().Contains(search) || i.Name.ToLower().Contains(search.ToLower()) || i.Email.Equals(search)
                || i.Phone.Equals(search) || i.Message.Equals(search));
            data = data.OrderByDescending(i => i.Id);
            if (sortColumn == 0)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.Id);
                else
                    data = data.OrderByDescending(i => i.Id);
            }
            if (sortColumn == 1)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.Name);
                else
                    data = data.OrderByDescending(i => i.Name);
            }
            if (sortColumn == 2)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.Email);
                else
                    data = data.OrderByDescending(i => i.Email);
            }
            if (sortColumn == 3)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.Message);
                else
                    data = data.OrderByDescending(i => i.Message);
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

        public Contact GetContactById(int id)
        {
            return _ee.Contacts.FirstOrDefault(i => i.Id == id);
        }

        public Contact GetContact(int Id)
        {
            return _ee.Contacts.FirstOrDefault(i => i.Id == Id);
        }

        public async Task<bool> DeleteContact(int Id)
        {
            try
            {
                Contact contact = _ee.Contacts.FirstOrDefault(i => i.Id == Id);
                _ee.Contacts.Remove(contact);
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
