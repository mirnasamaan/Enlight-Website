using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Data.Context;
using Admin.Models.Widget;
using System.Threading.Tasks;
using Data.Repositories;
using System.Web.Script.Serialization;

namespace Admin.Controllers
{
    [Authorize]
    public class WidgetController : Controller
    {
        private WidgetRepository _widRepo;

        #region Constructor
        public WidgetController()
        {
            _widRepo = new WidgetRepository();
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
        public async Task<ActionResult> Add(WidgetVM model)
        {
            if (!ModelState.IsValid)
            {
                return View("Add");
            }
            else
            {
                await _widRepo.AddWidget(model.toModel());
                return View("List");
            }
        }

        [HttpPost]
        public async Task<JsonResult> Edit(WidgetVM model)
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
                if (model.Id == 5 || model.Id == 7)
                {
                    model.Content = _widRepo.GetWidget(model.Id.Value).WidgetContent;
                }
                await _widRepo.EditWidget(model.toModel());
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
        public ActionResult ListWidgets(int draw, int start, int length)
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
            WidgetDatatableData dataTableData = new WidgetDatatableData();
            dataTableData.draw = draw;
            dataTableData.data = FilterWidgetsData(ref recordsTotal, ref recordsFiltered, start, length, search, sortColumn, sortDirection);
            dataTableData.recordsFiltered = recordsFiltered;
            dataTableData.recordsTotal = recordsTotal;
            return Json(dataTableData, JsonRequestBehavior.AllowGet);
        }

        private List<WidgetDataItem> FilterWidgetsData(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            List<WidgetDataItem> widgets = new List<WidgetDataItem>();
            IQueryable<Widget> data = _widRepo.GetFilteredWidgets(ref recordsTotal, ref recordFiltered, start, length, search, sortColumn, sortDirection);

            if (data != null)
            {
                foreach (var item in data)
                {
                    string Actions = "<a class='label label-primary' href='/#/Widget/Details/" + item.Id + "'>Details</a> <a class='label label-primary' href='/#/Widget/Edit/" + item.Id + "'>Edit</a> <a class='label label-danger' href='/#/Widget/Delete/" + item.Id + "'>Delete</a>";
                    widgets.Add(new WidgetDataItem
                    {
                        ID = item.Id,
                        Name = item.Name,
                        Title = item.Title,
                        Subtitle = item.SubTitle,
                        Order = item.WidgetOrder,
                        Actions = Actions
                    });
                }
            }
            return widgets;
        }

        [HttpGet]
        public JsonResult GetDetails(int Id)
        {
            Widget widget = _widRepo.GetWidget(Id);
            if (widget != null)
            {
                return Json(new WidgetVM(widget), JsonRequestBehavior.AllowGet);
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

            bool success = await _widRepo.DeleteWidget(id);
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