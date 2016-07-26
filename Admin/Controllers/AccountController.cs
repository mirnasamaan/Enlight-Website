using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Admin.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        //[HttpPost]
        //public ActionResult Login(LoginVM model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(model);
        //    }

        //    var response = Request["g-recaptcha-response"];
        //    const string secret = "6Lc1gSATAAAAAORh5OINsJPrtzcIpJ4oOxdO-nTe";
        //    var client = new WebClient();
        //    var reply =
        //        client.DownloadString(
        //            string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secret, response));
        //    var captchaResponse = JsonConvert.DeserializeObject<CaptchaResponse>(reply);
        //    if (!captchaResponse.Success)
        //    {
        //        if (captchaResponse.ErrorCodes.Count <= 0) return View();

        //        var error = captchaResponse.ErrorCodes[0].ToLower();
        //        switch (error)
        //        {
        //            case ("missing-input-secret"):
        //                ModelState.AddModelError("Captcha", "The secret parameter is missing.");
        //                break;
        //            case ("invalid-input-secret"):
        //                ModelState.AddModelError("Captcha", "The secret parameter is invalid or malformed.");
        //                break;

        //            case ("missing-input-response"):
        //                ModelState.AddModelError("Captcha", "Please solve the captcha again.");
        //                break;
        //            case ("invalid-input-response"):
        //                ModelState.AddModelError("Captcha", "Please solve the captcha again.");
        //                break;

        //            default:
        //                ModelState.AddModelError("Captcha", "Error occured. Please try again.");
        //                break;
        //        }
        //        return View(model);
        //    }
        //    else
        //    {

        //        bool isAuthenticated = _ur.isValidPassword(model.Email, model.Password);

        //        if (!isAuthenticated)
        //        {
        //            ModelState.AddModelError("AuthError", "The email or password you've entered is not valid");

        //            return View(model);
        //        }

        //        FormsAuthentication.SetAuthCookie(model.Email, true);
        //        User user = _ur.GetUserByEmail(model.Email);
        //        int admin_id = user.ID;
        //        log_repo.InsertLog(admin_id, "User with ID: " + admin_id + " has just logged in", "Login-Account");
        //        _ur.UpdateLastLogin(user);
        //        return RedirectToAction("Index", "Dashboard");
        //    }
        //}

        //[Authorize(Roles = "Admin, B2B, B2C")]
        //public ActionResult Logout()
        //{
        //    //Session["Balance"] = 0;
        //    var authCookie = HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName];
        //    authCookie.Expires = DateTime.Now.AddDays(-1);
        //    authCookie.Value = null;
        //    authCookie = null;
        //    FormsAuthentication.SignOut();
        //    return RedirectToAction("Login", "Account");
        //}
    }
}