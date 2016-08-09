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
using System.Net.Mail;

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
                    SendMail(model);
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

        private void SendMail(ContactVM contact)
        {
            MailMessage message = new MailMessage();
            message.To.Add("info@enlightworld.com");
            message.From = new MailAddress("noreply@enlightworld.com", "No Reply");
            message.Subject = "Enlight Contact Form Submission";
            message.IsBodyHtml = true;
            string msg = "<p>Contsct form submitted with the following details.</p></br>";
            msg = msg + "<p>Name: " + contact.Name + "</p></br><p>Email: " + contact.Email + "</p></br>";
            msg = msg + "<p>Phone: " + contact.Phone + "</p></br><p>Message: " + contact.Message + "</p></br>";
            message.Body = msg;

            try
            {
                System.Net.Mail.SmtpClient smtp = new SmtpClient("relay-hosting.secureserver.net", 25);
                smtp.Send(message);
            }
            catch (Exception ex)
            {
            }
        }
    }
}