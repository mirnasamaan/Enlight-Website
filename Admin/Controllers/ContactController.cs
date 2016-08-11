using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Data.Repositories;
using System.Threading.Tasks;
using Data.Context;
using Admin.Models.Contact;
using System.Security.Cryptography;
using System.Text;
using System.Web.Script.Serialization;

namespace Admin.Controllers
{
    [Authorize]
    public class ContactController : Controller
    {
        private ContactRepository _contactRepo;

        #region Constructor
        public ContactController()
        {
            _contactRepo = new ContactRepository();
        }
        #endregion

        #region Pages
        public ActionResult List()
        {
            return View();
        }

        public ActionResult Details()
        {
            return View();
        }

        public ActionResult Delete()
        {
            return View();
        }
        #endregion

        #region Utilities
        [HttpPost]
        public ActionResult ListContacts(int draw, int start, int length)
        {
            string search = Request.Form["search[value]"];
            int sortColumn = -1;
            string sortDirection = "asc";
            if (Request.Form["order[0][column]"] != null)
            {
                sortColumn = int.Parse(Request.Form["order[0][column]"]);
            }
            if (Request.Form["order[0][dir]"] != null)
            {
                sortDirection = Request.Form["order[0][dir]"];
            }
            int recordsTotal = 0;
            int recordsFiltered = 0;
            ContactDatatableData dataTableData = new ContactDatatableData();
            dataTableData.draw = draw;
            dataTableData.data = FilterContactsData(ref recordsTotal, ref recordsFiltered, start, length, search, sortColumn, sortDirection);
            dataTableData.recordsFiltered = recordsFiltered;
            dataTableData.recordsTotal = recordsTotal;
            return Json(dataTableData, JsonRequestBehavior.AllowGet);
        }

        private List<ContactDataItem> FilterContactsData(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            List<ContactDataItem> contacts = new List<ContactDataItem>();
            IQueryable<Contact> data = _contactRepo.GetFilteredContacts(ref recordsTotal, ref recordFiltered, start, length, search, sortColumn, sortDirection);

            if (data != null)
            {
                foreach (var item in data)
                {
                    string Actions = "<a class='label label-primary' href='/#/Contact/Details/" + item.Id + "'>Details</a> <a class='label label-danger' href='/#/Contact/Delete/" + item.Id + "'>Delete</a>";
                    string msg = item.Message.Length > 200 ? item.Message.Substring(0, 200) : item.Message;
                    contacts.Add(new ContactDataItem
                    {
                        ID = item.Id,
                        Name = item.Name,
                        Email = item.Email,
                        Phone = item.Phone,
                        Message = msg,
                        Actions = Actions
                    });
                }
            }
            return contacts;
        }

        [HttpGet]
        public JsonResult GetDetails(int Id)
        {
            Contact contact = _contactRepo.GetContact(Id);
            if (contact != null)
            {
                ContactDataItem data = new ContactDataItem() {
                    Name = contact.Name,
                    Email = contact.Email,
                    Phone = contact.Phone,
                    Message = contact.Message
                };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return null;
            }
        }
        
        [HttpPost]
        public async Task<JsonResult> ConfirmDelete(int id)
        {
            Dictionary<string, string> data;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            bool success = await _contactRepo.DeleteContact(id);
            if (success)
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
                        { "msg", "Error!" }
                    };
                return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

    }
}