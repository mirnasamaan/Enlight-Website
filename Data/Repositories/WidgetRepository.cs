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

        public IQueryable<Widget> ListWidgets()
        {
            return _context.Widgets;
        }

        public async Task<Widget> AddWidget(Widget widget)
        {
            _context.Widgets.Add(widget);
            await _context.SaveChangesAsync();
            return widget;
        }
    }
}
