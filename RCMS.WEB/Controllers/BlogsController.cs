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
    public class BlogsController : Controller
    {
        private IBlogsManager _aManager;
        public BlogsController()
        {
            _aManager = new BlogsManager();
        }

        //
         //GET: /Blogs/
        public ActionResult Index()
        {
            AuditManager.AuditOperation("Blog List");
            return View();
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult SaveBlogs(Blog aObj)
        {
            //    var aData = _aManager.SaveBlogs(aObj);
            //    return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

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
            var aData = _aManager.SaveBlogs(aObj);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetBlogData(int isLoadAllData)
        {
            var data = _aManager.GetBlogData(isLoadAllData);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CheckSequence(int id)
        {
            var aData = _aManager.CheckBlogSequence(id);

            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }

       
        public ActionResult DeleteBlog(int id)
        {
            var aData = _aManager.DeleteBlog(id);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult BlogDetails(int blogId)
        {
            AuditManager.AuditOperation("Blog");
            Session["blogId"] = blogId;
            return View("~/Views/SinglePage/BlogDetails.cshtml");

        }

        public ActionResult GetBlogDataFromSeverSession()
        {
            try
            {
                int blogId = (int)Session["blogId"];

                var data = _aManager.GetBlogDataFromSeverSession(blogId);
                return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                
                return null;
            }

        }
    }
}