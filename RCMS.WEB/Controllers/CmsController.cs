using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RCMS.Entities;
using RCMS.Manager;
using RCMS.Manager.Interface;
using RCMS.Manager.Manager;

namespace RCMS.WEB.Controllers
{
    public class CmsController : Controller
    {
       

        public CmsController()
        {
            
        }
        //
        // GET: /Cms/
        [CustomActionFilter]
        public ActionResult Index()
        {
            ViewBag.UserName = "Rifat";
            @ViewBag.Dashboard = "active";
            return View();
        }
        [CustomActionFilter]
        public ActionResult Home()
        {
            ViewBag.ActiveHome = "active";
            return View();
        }
        [CustomActionFilter]
        public ActionResult About()
        {
            ViewBag.ActiveAbout = "active";
            return View();
        }
       [CustomActionFilter]
        public ActionResult Hobbies()
        {
            ViewBag.ActiveHobbies = "active";
            return View();
        }
        [CustomActionFilter]
        public ActionResult Portfolio()
        {
            ViewBag.ActivePortfolio = "active";
            return View();
        }
        [CustomActionFilter]
        public ActionResult Blog()
        {
            ViewBag.ActiveBlog = "active";
            return View();
        }
        [CustomActionFilter]
        public ActionResult Message()
        {
            ViewBag.ActiveMessage = "active";
            return View();
        }
        [CustomActionFilter]
        public ActionResult Icons()
        {
            return View();
        }
	}
}