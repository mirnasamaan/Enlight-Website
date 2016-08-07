using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
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
        public async Task<JsonResult> AddContact(ContactVM model)
        {
            Dictionary<string, string> data;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (!ModelState.IsValid)
            {
                data = new Dictionary<string, string>
                {
                    { "success", "false"},
                    { "msg", "Please check validation errors" }
                };
                return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
            }
            else
            {
                Contact contact = await _mr.addContact(model.toModel());
                if (contact != null)
                {
                    data = new Dictionary<string, string>
                    {
                        { "success", "true"},
                        { "msg", "Success!" }
                    };
                    return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    data = new Dictionary<string, string>
                {
                    { "success", "false"},
                    { "msg", "Faliure!" }
                };
                    return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
                }
            }
        }
    }
}