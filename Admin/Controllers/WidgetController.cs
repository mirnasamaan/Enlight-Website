using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Data.Context;
using Admin.Models.Widget;
using System.Threading.Tasks;
using Data.Repositories;

namespace Admin.Controllers
{
    public class WidgetController : Controller
    {
        private WidgetRepository _widRepo;

        public WidgetController()
        {
            _widRepo = new WidgetRepository();
        }

        public ActionResult Add()
        {
            //WidgetVM widget = new WidgetVM();
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<bool> Add(WidgetVM model)
        {
            Widget widget = await _widRepo.AddWidget(model.toModel());
            if(widget != null)
            {
                return true;
            } else
            {
                return false;
            }
        }
    }
}