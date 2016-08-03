using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Data.Repositories;
using Data.Context;
using Enlight.Models;

namespace Enlight.Controllers
{
    public class HomeController : Controller
    {
        private MainRepository _mr;


        public HomeController ()
        {
            _mr = new MainRepository();
        }


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Main()
        {
            return View();
        }

        public ActionResult ListWidgets()
        {
            List<Widget> allWidgets = _mr.getWidgets();
            List<WidgetVM> allWidgetsVM = new List<WidgetVM>();
            foreach (var widget in allWidgets)
            {
                WidgetVM widgetVM = new WidgetVM(widget);
                allWidgetsVM.Add(widgetVM);
            }
            return Json(allWidgetsVM, JsonRequestBehavior.AllowGet);
        }
    }
}