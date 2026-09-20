using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RCMS.Entities;
using RCMS.Manager.Interface;
using RCMS.Manager.Manager;

namespace RCMS.WEB.Controllers
{
    public class HobbiesController : Controller
    {
        //
        // GET: /Hobbies/
        //public ActionResult Index()
        //{
        //    return View(); 
        //}
        private IHobbiesManager _aManager;      
        public HobbiesController()
        {
            _aManager=new HobbiesManager();
        }
        public ActionResult SaveHobby(Hobby aObj)
        {
            var aData = _aManager.SaveHobby(aObj);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetHobbiesData()
        {
            var data = _aManager.GetHobbiesData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }
          
        public ActionResult DeleteHobby(int id)
        {
            var aData = _aManager.DeleteHobby(id);

            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }
	}
}