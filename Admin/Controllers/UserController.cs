using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Data.Repositories;
using System.Threading.Tasks;
using Data.Context;
using Admin.Models.User;
using System.Security.Cryptography;
using System.Text;
using System.Web.Script.Serialization;

namespace Admin.Controllers
{
    public class UserController : Controller
    {
        private UserRepository _userRepo;

        #region Constructor
        public UserController()
        {
            _userRepo = new UserRepository();
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
        public async Task<JsonResult> Add(UserVM model)
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
                if (_userRepo.GetUserByEmail(model.Email) != null)
                {
                    data = new Dictionary<string, string>
                    {
                        { "success", "false"},
                        { "msg", "This email (" + model.Email + ") already exists!" }
                    };
                    return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
                }
                model.Password = GetMd5Hash(model.Password);
                model.UserToken = Guid.NewGuid().ToString();
                model.CreationDate = DateTime.UtcNow.ToLocalTime();
                model.LastLoginDate = DateTime.UtcNow.ToLocalTime();
                await _userRepo.AddUser(model.ToModel());
                data = new Dictionary<string, string>
                    {
                        { "success", "true"},
                        { "msg", "Success!" }
                    };
                return Json(jsSerializer.Serialize(data), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public async Task<JsonResult> Edit(UserVM model)
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
                User user = _userRepo.GetUserByEmail(model.Email);
                if (user.Password != model.Password)
                {
                    model.Password = GetMd5Hash(model.Password);
                    await _userRepo.EditUser(model.ToModel());
                }
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
        public static string GetMd5Hash(string input)
        {
            MD5 md5Hash = MD5.Create();
            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        [HttpPost]
        public ActionResult ListUsers(int draw, int start, int length)
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
            UserDatatableData dataTableData = new UserDatatableData();
            dataTableData.draw = draw;
            dataTableData.data = FilterUsersData(ref recordsTotal, ref recordsFiltered, start, length, search, sortColumn, sortDirection);
            dataTableData.recordsFiltered = recordsFiltered;
            dataTableData.recordsTotal = recordsTotal;
            return Json(dataTableData, JsonRequestBehavior.AllowGet);
        }

        private List<UserDataItem> FilterUsersData(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            List<UserDataItem> widgets = new List<UserDataItem>();
            IQueryable<User> data = _userRepo.GetFilteredUsers(ref recordsTotal, ref recordFiltered, start, length, search, sortColumn, sortDirection);

            if (data != null)
            {
                foreach (var item in data)
                {
                    string lastlogin = "";
                    if (item.LastLoginDate != null)
                    {
                        lastlogin = item.LastLoginDate.Value.ToShortDateString();
                    }
                    string Actions = "<a class='label label-primary' href='/#/User/Details/" + item.ID + "'>Details</a> <a class='label label-primary' href='/#/User/Edit/" + item.ID + "'>Edit</a> <a class='label label-danger' href='/#/User/Delete/" + item.ID + "'>Delete</a>";
                    widgets.Add(new UserDataItem
                    {
                        ID = item.ID,
                        Email = item.Email,
                        CreationDate = item.CreationDate.ToShortDateString(),
                        LastLoginDate = lastlogin,
                        Actions = Actions
                    });
                }
            }
            return widgets;
        }

        [HttpGet]
        public JsonResult GetDetails(int Id)
        {
            User user = _userRepo.GetUser(Id);
            if (user != null)
            {
                string lastlogin = "";
                if(user.LastLoginDate != null)
                {
                    lastlogin = user.LastLoginDate.Value.ToShortDateString();
                }
                UserDataItem data = new UserDataItem() { Email = user.Email, CreationDate = user.CreationDate.ToShortDateString(), LastLoginDate = lastlogin, Password = user.Password, UserToken = user.UserToken };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return null;
            }
        }
        
        [HttpPost]
        public async Task<bool> ConfirmDelete(int id)
        {
            return await _userRepo.DeleteUser(id);
        }
        #endregion

    }
}