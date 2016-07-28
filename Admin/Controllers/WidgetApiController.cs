using Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Description;
using Data.Repositories;

namespace Admin.Controllers
{
    public class WidgetApiController : ApiController
    {
        //private EnlightEntities db = new EnlightEntities();
        //private WidgetRepository _widRepo;

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        this.db.Dispose();
        //    }

        //    base.Dispose(disposing);
        //}

        //private List<Widget> NextWidgetAsync()
        //{
        //    return _widRepo.ListWidgets().ToList();
        //}

        //private Widget Add(Widget widget)
        //{
        //    return _widRepo.AddWidget(widget);
        //}
    }
}
