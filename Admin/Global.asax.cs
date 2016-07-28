using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;

namespace Admin
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            var authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];

            if (authCookie != null)
            {
                //var ticket = FormsAuthentication.Decrypt(authCookie.Value);
                //FormsIdentity formsIdentity = new FormsIdentity(ticket);
                //ClaimsIdentity claimsIdentity = new ClaimsIdentity(formsIdentity);
                //var repo = new UserRepositories();
                //var user = repo.GetUserByEmail(ticket.Name);
                //claimsIdentity.AddClaim(
                //        new Claim(ClaimTypes.Role, user.Role));
                //ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                //HttpContext.Current.User = claimsPrincipal;
            }
        }
    }
}
