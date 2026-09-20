using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RCMS.Manager;
using RCMS.Manager.Interface;
using RCMS.Manager.Manager;

namespace RCMS.WEB.Controllers
{
    public class CmsDataController : Controller
    {
        private IHomeSocialManager _aIHomeSocialManager;
        private ResponseModel _aModel;
        private ICmsManager _aCmsManager;
        public CmsDataController()
        {
            _aIHomeSocialManager = new HomeSocialManager();
            _aModel = new ResponseModel();
            _aCmsManager = new CmsManager();
        }
        public ActionResult GetHomeOperations()
        {
            var data = _aCmsManager.GetHomeOperations();
            //var data = _aManager.GetHomeOperations();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            //return null;

        }
	}
}