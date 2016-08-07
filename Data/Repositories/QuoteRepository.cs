using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Data.Context;

namespace Data.Repositories
{
    public class QuoteRepository
    {
        private EnlightEntities _ee;

        public QuoteRepository ()
        {
            _ee = new EnlightEntities();
        }
        
        public IQueryable<Quote> GetFilteredQuotes(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            IQueryable<Quote> data = _ee.Quotes;
            recordsTotal = data.Count();
            if (!string.IsNullOrEmpty(search))
                data = data.Where(i => i.Id.ToString().Contains(search) || i.Name.ToLower().Contains(search.ToLower()) || i.Email.Equals(search)
                || i.Phone.Equals(search) || i.Category.Equals(search) || i.Type.Equals(search) || i.Message.Equals(search) || i.KnowledgeBase.Equals(search));
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
                    data = data.OrderBy(i => i.Category);
                else
                    data = data.OrderByDescending(i => i.Category);
            }
            if (sortColumn == 4)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.Type);
                else
                    data = data.OrderByDescending(i => i.Type);
            }
            if (sortColumn == 5)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.Message);
                else
                    data = data.OrderByDescending(i => i.Message);
            }
            if (sortColumn == 6)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.KnowledgeBase);
                else
                    data = data.OrderByDescending(i => i.KnowledgeBase);
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

        public Quote GetQuoteById(int id)
        {
            return _ee.Quotes.FirstOrDefault(i => i.Id == id);
        }

        public Quote GetQuote(int Id)
        {
            return _ee.Quotes.FirstOrDefault(i => i.Id == Id);
        }

        public async Task<bool> DeleteQuote(int Id)
        {
            try
            {
                Quote quote = _ee.Quotes.FirstOrDefault(i => i.Id == Id);
                _ee.Quotes.Remove(quote);
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
