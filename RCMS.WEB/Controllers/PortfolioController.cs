using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RCMS.Entities;
using RCMS.Manager.Interface;
using RCMS.Manager.Manager;

namespace RCMS.WEB.Controllers
{
    public class PortfolioController : Controller
    {
        private IPortfolioManager _aManager;

        public PortfolioController()
        {
            _aManager = new PortfolioManager();
        }

        //
        public ActionResult SavePortfolioType(PortfolioType aObj)
        {
            var aData = _aManager.SavePortfolioType(aObj);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
            // return null;

        }


        public ActionResult GetWorkTypeData()
        {
            var data = _aManager.GetWorkTypeData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult DeleteWorkTypeData(int id)
        {
            var aData = _aManager.DeleteWorkTypeData(id);

            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }
        // GET: /Portfolio/PortfolioType
        public JsonResult PortfolioType()
        {
            // var data = _aManager.GetAllGroup();
             var data = _aManager.PortfolioTypeDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult SavePortfolioWork(Work aObj)
        {
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

                aObj.ImageLink = savePath.Replace("~", "..") + "/" + originalFilename;
            }
            var aData = _aManager.SavePortfolioWork(aObj);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }

     
        public ActionResult GetPortfolioData(int isLoadAllData)
        {
            var data = _aManager.GetPortfolioData(isLoadAllData);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }


        public ActionResult DeletePortfolio(int id)
        {
            var aData = _aManager.DeletePortfolio(id);

            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult CheckSequence(int id)
        {
            var aData = _aManager.CheckPortfolioSequence(id);

            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetPortfolioDataDetails(int portfolioId)
        {
            AuditManager.AuditOperation("Profile");
            Session["portfolioId"] = portfolioId;
            return View("~/Views/SinglePage/PortfolioDetails.cshtml");

        }

        public ActionResult GetPortfolioDataFromSeverSession()
        {
            try
            {
                int portfolioId = (int)Session["portfolioId"];
                
                var data = _aManager.GetPortfolioDataFromSeverSession(portfolioId);
                return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                
                return null;
            }

        }
        public ActionResult GetNextPreviousPortfolio(int flag)
        {
            try
            {
                AuditManager.AuditOperation("Profile");
                int portfolioId = (int)Session["portfolioId"];

                var newPortfolioId = _aManager.GetNextPreviousPortfolio(portfolioId, flag);
                if (newPortfolioId > 0)
                {
                    Session["portfolioId"] = newPortfolioId;
                    var data = _aManager.GetPortfolioDataFromSeverSession(newPortfolioId);
                    return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { resoponse = false }, JsonRequestBehavior.AllowGet);
               
            }
            catch (Exception)
            {
                
                return null;
            }

        }
        public ActionResult PortfolioList()
        {
            AuditManager.AuditOperation("PortfolioList");
            return View("~/Views/LandingPage/_PortfolioList.cshtml");

        }
     

    }
}