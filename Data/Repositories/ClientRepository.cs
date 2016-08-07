using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Data.Context;


namespace Data.Repositories
{
    public class ClientRepository
    {
        private EnlightEntities _ee;

        public ClientRepository ()
        {
            _ee = new EnlightEntities();
        }
        
        public Client GetClientByName(string name)
        {
            return _ee.Clients.FirstOrDefault(i => i.Name == name);
        }

        public async Task<Client> AddClient(Client client)
        {
            _ee.Clients.Add(client);
            await _ee.SaveChangesAsync();
            return client;
        }

        public Client EditClient(Client client)
        {
            try
            {
                Client client_db = _ee.Clients.FirstOrDefault(i => i.ID == client.ID);
                client_db.Logo = client.Logo;
                client_db.Name = client.Name;
                //_ee.Clients.Attach(client_db);
                _ee.Entry(client_db).State = EntityState.Modified;
                _ee.SaveChanges();
            }
            catch (Exception e)
            {

            }
            return client;
        }

        public IQueryable<Client> GetFilteredClients(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            IQueryable<Client> data = _ee.Clients;
            recordsTotal = data.Count();
            if (!string.IsNullOrEmpty(search))
                data = data.Where(i => i.ID.ToString().Contains(search) || i.Name.ToLower().Contains(search.ToLower()));
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
                    data = data.OrderBy(i => i.Name);
                else
                    data = data.OrderByDescending(i => i.Name);
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

        public Client GetClient(int Id)
        {
            return _ee.Clients.FirstOrDefault(i => i.ID == Id);
        }

        public async Task<bool> DeleteClient(int Id)
        {
            try
            {
                Client client = _ee.Clients.FirstOrDefault(i => i.ID == Id);
                _ee.Clients.Remove(client);
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
