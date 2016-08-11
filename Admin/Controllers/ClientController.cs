using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Data.Repositories;
using System.Threading.Tasks;
using Data.Context;
using System.Security.Cryptography;
using System.Text;
using System.Web.Script.Serialization;
using Admin.Models.Client;
using System.IO;
using System.Drawing;

namespace Admin.Controllers
{
    [Authorize]
    public class ClientController : Controller
    {
        private ClientRepository _clientRepo;

        #region Constructor
        public ClientController()
        {
            _clientRepo = new ClientRepository();
        }
        #endregion

        #region Pages
        public ActionResult Add()
        {
            return View();
        }

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

        public ActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Add(ClientVM model)
        {
            Dictionary<string, string> data;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            if (!ModelState.IsValid || model.LogoFile == null || model.LogoFile.ContentLength <= 0)
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
                if (_clientRepo.GetClientByName(model.Name) != null)
                {
                    data = new Dictionary<string, string>
                    {
                        { "success", "false"},
                        { "msg", "This client (" + model.Name + ") already exists!" }
                    };
                    return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
                }

                bool exists = System.IO.Directory.Exists(Server.MapPath("~/Uploads/Clients"));
                if (!exists)
                    System.IO.Directory.CreateDirectory(Server.MapPath("~/Uploads/Clients"));
                Random rnd = new Random();
                var fileName = Path.GetFileNameWithoutExtension(model.LogoFile.FileName) + "_" + rnd.Next(1, 10000) + Path.GetExtension(model.LogoFile.FileName);
                var path = Path.Combine(Server.MapPath("~/Uploads/Clients"), fileName);
                model.LogoFile.SaveAs(path);
                model.Logo = fileName;

                await _clientRepo.AddClient(model.ToModel());
                data = new Dictionary<string, string>
                    {
                        { "success", "true"},
                        { "msg", "Success!" }
                    };
                return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public async Task<JsonResult> Edit(ClientVM model)
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
                if (model.LogoFile != null && model.LogoFile.ContentLength > 0)
                {
                    bool exists = System.IO.Directory.Exists(Server.MapPath("~/Uploads/Clients"));
                    if (!exists)
                        System.IO.Directory.CreateDirectory(Server.MapPath("~/Uploads/Clients"));
                    Random rnd = new Random();
                    var fileName = Path.GetFileNameWithoutExtension(model.LogoFile.FileName) + "_" + rnd.Next(1, 10000) + Path.GetExtension(model.LogoFile.FileName);
                    var path = Path.Combine(Server.MapPath("~/Uploads/Clients"), fileName);
                    model.LogoFile.SaveAs(path);
                    model.Logo = fileName;
                }
                else
                {
                    model.Logo = _clientRepo.GetClient(model.ID).Logo;
                }
                _clientRepo.EditClient(model.ToModel());
                data = new Dictionary<string, string>
                    {
                        { "success", "true"},
                        { "msg", "Success!" }
                    };
                return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Utilities
        [HttpPost]
        public ActionResult ListClients(int draw, int start, int length)
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
            ClientDatatableData dataTableData = new ClientDatatableData();
            dataTableData.draw = draw;
            dataTableData.data = FilterClientsData(ref recordsTotal, ref recordsFiltered, start, length, search, sortColumn, sortDirection);
            dataTableData.recordsFiltered = recordsFiltered;
            dataTableData.recordsTotal = recordsTotal;
            return Json(dataTableData, JsonRequestBehavior.AllowGet);
        }

        private List<ClientDataItem> FilterClientsData(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            List<ClientDataItem> clients = new List<ClientDataItem>();
            IQueryable<Client> data = _clientRepo.GetFilteredClients(ref recordsTotal, ref recordFiltered, start, length, search, sortColumn, sortDirection);

            if (data != null)
            {
                foreach (var item in data)
                {
                    string Actions = "<a class='label label-primary' href='/#/Client/Details/" + item.ID + "'>Details</a> <a class='label label-primary' href='/#/Client/Edit/" + item.ID + "'>Edit</a> <a class='label label-danger' href='/#/Client/Delete/" + item.ID + "'>Delete</a>";
                    clients.Add(new ClientDataItem
                    {
                        ID = item.ID,
                        Name = item.Name,
                        Logo = item.Logo,
                        Actions = Actions
                    });
                }
            }
            return clients;
        }

        [HttpGet]
        public JsonResult GetDetails(int Id)
        {
            Client client = _clientRepo.GetClient(Id);
            if (client != null)
            {
                ClientDataItem data = new ClientDataItem() { ID = client.ID, Name = client.Name, Logo = client.Logo };
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

            bool success = await _clientRepo.DeleteClient(id);
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