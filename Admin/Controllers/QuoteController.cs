using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Data.Repositories;
using System.Threading.Tasks;
using Data.Context;
using Admin.Models.Quote;
using System.Security.Cryptography;
using System.Text;
using System.Web.Script.Serialization;

namespace Admin.Controllers
{
    [Authorize]
    public class QuoteController : Controller
    {
        private QuoteRepository _quoteRepo;

        #region Constructor
        public QuoteController()
        {
            _quoteRepo = new QuoteRepository();
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
        public ActionResult ListQuotes(int draw, int start, int length)
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
            QuoteDatatableData dataTableData = new QuoteDatatableData();
            dataTableData.draw = draw;
            dataTableData.data = FilterQuotesData(ref recordsTotal, ref recordsFiltered, start, length, search, sortColumn, sortDirection);
            dataTableData.recordsFiltered = recordsFiltered;
            dataTableData.recordsTotal = recordsTotal;
            return Json(dataTableData, JsonRequestBehavior.AllowGet);
        }

        private List<QuoteDataItem> FilterQuotesData(ref int recordsTotal, ref int recordFiltered, int start, int length, string search, int sortColumn, string sortDirection)
        {
            List<QuoteDataItem> contacts = new List<QuoteDataItem>();
            IQueryable<Quote> data = _quoteRepo.GetFilteredQuotes(ref recordsTotal, ref recordFiltered, start, length, search, sortColumn, sortDirection);

            if (data != null)
            {
                foreach (var item in data)
                {
                    string Actions = "<a class='label label-primary' href='/#/Quote/Details/" + item.Id + "'>Details</a> <a class='label label-danger' href='/#/Quote/Delete/" + item.Id + "'>Delete</a>";
                    string msg = item.Message.Length > 200 ? item.Message.Substring(0, 200) : item.Message;
                    contacts.Add(new QuoteDataItem
                    {
                        ID = item.Id,
                        Name = item.Name,
                        Email = item.Email,
                        Phone = item.Phone,
                        Category = item.Category,
                        Type = item.Type,
                        Message = msg,
                        KnowledgeBase = item.KnowledgeBase,
                        Actions = Actions
                    });
                }
            }
            return contacts;
        }

        [HttpGet]
        public JsonResult GetDetails(int Id)
        {
            Quote quote = _quoteRepo.GetQuote(Id);
            if (quote != null)
            {
                QuoteDataItem data = new QuoteDataItem() {
                    Name = quote.Name,
                    Email = quote.Email,
                    Phone = quote.Phone,
                    Category = quote.Category,
                    Type = quote.Type,
                    Message = quote.Message,
                    KnowledgeBase = quote.KnowledgeBase
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

            bool success = await _quoteRepo.DeleteQuote(id);
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