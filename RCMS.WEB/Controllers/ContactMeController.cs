using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using RCMS.Entities;
using RCMS.Manager;
using RCMS.Manager.Interface;
using RCMS.Manager.Manager;

namespace RCMS.WEB.Controllers
{
    public class ContactMeController : Controller
    {
        //
        // GET: /ContactMe/
        //public ActionResult Index()
        //{
        //    return View();
        //}
        private IContactMeManager _aManager;

        public ContactMeController()
        {
            _aManager = new ContactMeManager();
        }
        //public class Audit
        //{
        //    public string HostName { get; set; }
        //    public string IpAddress { get; set; }
        //    public string PcName { get; set; }
        //    public string Browser { get; set; }
        //}

        //private AuditLog GetAuditLog(HttpRequestBase request)
        //{
        //    AuditLog audit = new AuditLog();
        //    string PCName = Dns.GetHostEntry(Request.ServerVariables["REMOTE_ADDR"]).HostName;
        ////  var  userAgent = Request.Headers["User-Agent"]; 
        //    if (Request.UserAgent != null)
        //    {
        //        string strUserAgent = Request.UserAgent.ToString().ToLower();
        //        string browser = Request.Browser.Browser;
        //        audit.Browser = browser;
        //    }
        //    string ip = Request.UserHostAddress;
        //    audit.IpAddress = ip;
        //    audit.PcName = PCName;
        //    return audit;
        //}
        public ActionResult SendMessae(Message aObj)
        {
          //  AuditManager.AuditOperation();
            AuditManager.AuditOperation("Send Message");
              //  var xx = Request.ServerVariables["REMOTE_ADDR"];
            
            //var audit = GetAuditLog(Request);
            var audit = AuditManager.GetAuditLog();
           // string PCName2 = Dns.GetHostEntry(Request.ServerVariables["REMOTE_ADDR"]).HostName;
            if (_aManager.CheckTodaysQuotaForMessage(audit))
            {
                String returnMessage = "Sorry! Your per day message sending limit are over";
                if (audit != null)
                {
                    returnMessage += ", for your IP" + audit.IpAddress + " and PC Name" + audit.PcName;
                }
                return Json(new { success = false, Message = returnMessage }, JsonRequestBehavior.AllowGet);
            }
            aObj.Ip = audit.IpAddress;
            aObj.PcName = audit.PcName;// + "--" + PCName2;
            aObj.Browser = audit.Browser;
            var aData = _aManager.SendMessae(aObj);
            return Json(aData, JsonRequestBehavior.AllowGet);

        }

        

        public ActionResult LoadAllMessageData()
        {
            var data = _aManager.LoadAllMessageData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
           
        }
        public ActionResult MarkMessageAsRead(int id)
        {
            var data = _aManager.MarkMessageAsRead(id);
            return Json(new { success = false, Message = "success" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteMessage(int id)
        {
            var aData = _aManager.DeleteMessage(id);
            return Json(new { success = aData.Status, aData }, JsonRequestBehavior.AllowGet);
        }

    }
}