using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Context;

namespace Data.Repositories
{
    public class MainRepository
    {
        private EnlightEntities _ee;

        public MainRepository()
        {
            _ee = new EnlightEntities();
        }

        public List<Widget> getWidgets()
        {
            return _ee.Widgets.OrderBy(i => i.WidgetOrder).ToList();
        }
    }
}
