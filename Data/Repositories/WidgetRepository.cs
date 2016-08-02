using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Context;
using System.Data.Entity;

namespace Data.Repositories
{
    public class WidgetRepository
    {
        public readonly EnlightEntities _context;

        public WidgetRepository()
        {
            _context = new EnlightEntities();
        }
        
        public List<Widget> ListWidgets()
        {
            return _context.Widgets.ToList();
        }

        public Widget GetWidget(int Id)
        {
            return _context.Widgets.FirstOrDefault(i => i.Id == Id);
        }

        public async Task<Widget> AddWidget(Widget widget)
        {
            _context.Widgets.Add(widget);
            await _context.SaveChangesAsync();
            return widget;
        }

        public IQueryable<Widget> GetFilteredWidgets(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            IQueryable<Widget> data = _context.Widgets;
            recordsTotal = data.Count();
            if (!string.IsNullOrEmpty(search))
                data = data.Where(i => i.Id.ToString().Contains(search) || i.Name.ToLower().Contains(search.ToLower()) || i.Title.ToLower().Contains(search.ToLower())
                || i.SubTitle.ToLower().Contains(search.ToLower()) || (i.WidgetOrder != null && i.WidgetOrder.Value.ToString().Contains(search)));
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
                    data = data.OrderBy(i => i.Title);
                else
                    data = data.OrderByDescending(i => i.Title);
            }
            if (sortColumn == 3)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.SubTitle);
                else
                    data = data.OrderByDescending(i => i.SubTitle);
            }
            if (sortColumn == 4)
            {
                if (sortDirection == "asc")
                    data = data.OrderBy(i => i.WidgetOrder);
                else
                    data = data.OrderByDescending(i => i.WidgetOrder);
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

    }
}
