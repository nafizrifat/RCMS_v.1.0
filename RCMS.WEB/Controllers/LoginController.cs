using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using RCMS.Entities;

namespace RCMS.WEB.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/
        EntitiesCms _db = new EntitiesCms();
        
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ValidateUserLogin(string loginId, string password)
        {
            var selectedUser = _db.Users.FirstOrDefault(a => a.UserName == loginId && a.Password == password);
            if (selectedUser != null)
            {
                Session["CurrentUser"] = selectedUser;
                //return View("~/Areas/Inventory/Views/Asset/Assets.cshtml");
                //return Redirect("http://localhost:22223/");
               // return RedirectToAction("index", "Home");
                
                return Json(Url.Action("Index", "Cms"));   
            }
            
            AuditManager.AuditOperation("Incorrect User Id or Password", true);
            return Json(false, JsonRequestBehavior.AllowGet);
            //else
            //{
            //    dynamic myDynamic = new System.Dynamic.ExpandoObject();
            //    myDynamic.response = false;
            //    myDynamic.msg = "Please Validate user id and password";
            //   // return myDynamic;
            //    return Json(myDynamic, JsonRequestBehavior.AllowGet);
            //}

            
        }
        
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon(); // it will clear the session at the end of request

            return RedirectToAction("index", "Login");
        }
    }
}