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
    public class AboutController : Controller
    {
        //
        // GET: /About/
        private IAboutManager _aManager;

        public AboutController()
        {
            _aManager = new AboutManager();
        }
        public JsonResult SaveAboutDetails(About data)
        //public ActionResult HomeOperations()
        {
            //var file = aObj.ImageFile;

            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pic = System.Web.HttpContext.Current.Request.Files["MyImages"];
                if (pic != null)
                {
                    var originalFilename = Path.GetFileName(pic.FileName);
                    string fileId = Guid.NewGuid().ToString().Replace("-", "");
                    var savePath = @"~/Upload/Image/";

                    var path = Path.Combine(Server.MapPath("~/Upload/Image/"), "1", originalFilename);

                    var physicalPath = Path.Combine(Server.MapPath(savePath), originalFilename);
                    pic.SaveAs(physicalPath);

                    data.AboutImageLink = savePath.Replace("~", "..") + "/" + originalFilename;

                }
                //CV
                var savePathFile = @"~/Upload/Files/";
                var cv = System.Web.HttpContext.Current.Request.Files["MyCv"];
                if (cv != null)
                {
                    var originalCvname = Path.GetFileName(cv.FileName);
                    string cvfileId = Guid.NewGuid().ToString().Replace("-", "");

                    var physicalPathCv = Path.Combine(Server.MapPath(savePathFile), originalCvname);
                    cv.SaveAs(physicalPathCv);

                    data.CvLink = savePathFile.Replace("~", "..") + "/" + originalCvname;
                }
            }

            var aData = _aManager.AddAboutDetails(data);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
            //return null;
        }
        public ActionResult GetAboutDetailsData()
        {
            var data = _aManager.GetAboutDetailsData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetSkillDetailsData()
        {
            var data = _aManager.GetSkillDetailsData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetPersonalDetailsData()
        {
            var data = _aManager.GetPersonalDetailsData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveAboutSkills(List<AboutSkill> skillList)
        {
            var aData = _aManager.SaveAboutSkills(skillList);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SavePersonalData(List<AboutPersonalInfo> personalInfoList)
        {
            var aData = _aManager.SavePersonalData(personalInfoList);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
        }


    }
}