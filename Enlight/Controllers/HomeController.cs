using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using Data.Repositories;
using Data.Context;
using Enlight.Models;


namespace Enlight.Controllers
{
    public class HomeController : Controller
    {
        private MainRepository _mr;


        public HomeController()
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


        public ActionResult ListClients()
        {
            List<Client> allClients = _mr.getClients();
            List<ClientsVM> allClientsVM = new List<ClientsVM>();
            foreach (var client in allClients)
            {
                ClientsVM clientVM = new ClientsVM(client);
                allClientsVM.Add(clientVM);
            }
            return Json(allClientsVM, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public async Task<bool> AddContact(ContactVM model)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            else
            {
                Contact contact = await _mr.addContact(model.toModel());
                if (contact != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }


        [HttpPost]
        public async Task<bool> AddQuote(QuoteVM model)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            else
            {
                Quote quote = await _mr.addQuote(model.toModel());
                if (quote != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}   
