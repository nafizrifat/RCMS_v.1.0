using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using RCMS.Entities;
using RCMS.Manager.Interface;
using RCMS.Manager.Manager;

namespace RCMS.WEB.Controllers
{
    public class DashboardController : Controller
    {
        //
        // GET: /Dashboard/VisitorCount
        //public ActionResult Index()
        //{
        //    return View();
        //}
        IDashboardManager _aManager;
        public DashboardController()
        {
            _aManager = new DashboardManager();
        }
        public ActionResult VisitorCount()
        {
            var data = _aManager.GetVisitorCount();

            return Json(data.Data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetTotalVisitorCount()
        {
            var data = _aManager.GetTotalVisitorCount();

            return Json(data.Data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadLayoutData()
        {

            User objUser = ((User)(Session["CurrentUser"]));
            var data = _aManager.LoadLayoutData(objUser);

            return Json(data.Data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetUniqueVisitorByDate(DateTime aDate)
        {
            User objUser = ((User)(Session["CurrentUser"]));
            var data = _aManager.GetUniqueVisitorByDate(aDate);

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
           
        }
        public ActionResult SaveImage(UplodImage aObj)
        {
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pic = System.Web.HttpContext.Current.Request.Files["MyImages"];
                var originalFilename = Path.GetFileName(pic.FileName);
                string fileId = Guid.NewGuid().ToString().Replace("-", "");
               var savePath = @"~/Upload/Uploader/";

                //check the file name alrady exsits
                string finalPath = Server.MapPath(savePath + aObj.ImageName + ".jpeg");
                    
                bool exists = System.IO.File.Exists(finalPath);
                if (exists)
                {
                    return Json(new { Status = false, Message = "File with this name already exist" }, JsonRequestBehavior.AllowGet);
                }
               // var physicalPath = Path.Combine(finalPath);

                pic.SaveAs(finalPath);

                aObj.ImageLink = savePath.Replace("~", "..") +  aObj.ImageName + ".jpeg";
              var data =   _aManager.SaveImage(aObj);
              return Json(data, JsonRequestBehavior.AllowGet);
            }
            //var aData = _aManager.SavePortfolioWork(aObj);
            //return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
            //return null;
            return Json(new { Status = false, Message = "Sorry, Please try again" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadAllImage()
        {
            var data = _aManager.LoadAllImage();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult DeleteImage(int id)
        {
            try
            {
                var aData = _aManager.DeleteImage(id);
                if (aData != null)
                {

                    string finalPath = Server.MapPath(aData.ImageLink);

                    if (System.IO.File.Exists(finalPath))
                    {
                        System.IO.File.Delete(finalPath);
                    }
                    return Json(new { Status = true, Message = "Deleted successfully" }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { Status = false, Message = "Sorry! Some error happned." }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(new { Status = false, Message = "Sorry! Some error happned." }, JsonRequestBehavior.AllowGet); 
            }

        }

        public ActionResult ProcessLocation()
        {
            QueryGeographicalLocationAsync();
            return null;
        }

        public  async Task<IPLocation> QueryGeographicalLocationAsync()
        {

            var data = _aManager.GetAllUnprocessedVisitorData();
            foreach (var aData in (IEnumerable<Audit>) data.Data)
            {
                IPLocation ipInfo = new IPLocation();
                var ipAddress = aData.IpAddress;
                HttpClient client = new HttpClient();
                var url = String.Format(@"http://api.ipstack.com/{0}?access_key=49b60cc2a88e3b3c4e2fd414326ec900",
                    ipAddress);
                string info = new WebClient().DownloadString(url);
                ipInfo = JsonConvert.DeserializeObject<IPLocation>(info);
                //  string result = await client.DownloadString(String.Format(@"http://api.ipstack.com/{0}? access_key = 49b60cc2a88e3b3c4e2fd414326ec900,", ipAddress));

                // return JsonConvert.DeserializeObject<IPGeographicalLocation>(result);
            }
           

       
            return null;
            ;
        }

        public class IpInfo
        {

            [JsonProperty("ip")]
            public string Ip { get; set; }

            [JsonProperty("hostname")]
            public string Hostname { get; set; }

            [JsonProperty("city")]
            public string City { get; set; }

            [JsonProperty("region")]
            public string Region { get; set; }

            [JsonProperty("country")]
            public string Country { get; set; }

            [JsonProperty("loc")]
            public string Loc { get; set; }

            [JsonProperty("org")]
            public string Org { get; set; }

            [JsonProperty("postal")]
            public string Postal { get; set; }
        }

        public class IPLocation
        {
            [JsonProperty("ip")]
            public string IP { get; set; }

            [JsonProperty("country_code")]

            public string CountryCode { get; set; }

            [JsonProperty("country_name")]

            public string CountryName { get; set; }

            [JsonProperty("region_code")]

            public string RegionCode { get; set; }

            [JsonProperty("region_name")]

            public string RegionName { get; set; }

            [JsonProperty("city")]

            public string City { get; set; }

            [JsonProperty("zip_code")]

            public string ZipCode { get; set; }

            [JsonProperty("time_zone")]

            public string TimeZone { get; set; }

            [JsonProperty("latitude")]

            public float Latitude { get; set; }

            [JsonProperty("longitude")]

            public float Longitude { get; set; }

            [JsonProperty("metro_code")]

            public int MetroCode { get; set; }



        }
    }
}