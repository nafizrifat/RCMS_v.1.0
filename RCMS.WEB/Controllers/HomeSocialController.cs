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
    public class HomeSocialController : Controller
    {
        private HomeSocialManager _aManager;
        private ResponseModel _aModel;

        public HomeSocialController()
        {
            _aManager = new HomeSocialManager();
            _aModel = new ResponseModel();
        }
        public JsonResult HomeOperations(Home data)
        //public ActionResult HomeOperations()
        {
            //var file = aObj.ImageFile;

            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pic = System.Web.HttpContext.Current.Request.Files["MyImages"];
                var originalFilename = Path.GetFileName(pic.FileName);
                string fileId = Guid.NewGuid().ToString().Replace("-", "");
                //  string userId = GetUserId(); // Function to get user id based on your schema
                var savePath = @"~/Upload/Image/";

                var path = Path.Combine(Server.MapPath("~/Upload/Image/"), "1", originalFilename);
                // pic.SaveAs(path);
                //data.HomeImageLink = path;

                var physicalPath = Path.Combine(Server.MapPath(savePath), originalFilename);
                pic.SaveAs(physicalPath);

                data.HomeImageLink = savePath.Replace("~", "..") + "/" + originalFilename;
            }

            // byte[] imgarr = Convert.FromBase64String(aObj.ImageFile);
            var aData = _aManager.AddNewHome(data);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
            //return null;
        }

        public ActionResult GetHomeOperations()
        {
            var data = _aManager.GetHomeOperations();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return Json(new { success = "Success", data }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetSocalLink()
        {
            var data = _aManager.GetSocalLink();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return Json(new { success = "Success", data }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult SaveSocalLink(Social aObj)
        {
            var aData = _aManager.SaveSocalLink(aObj);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult DeleteSocalLink(int id)
        {
            var aData = _aManager.DeleteSocalLink(id);

            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }
	}
}