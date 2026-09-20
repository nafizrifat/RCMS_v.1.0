using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Routing;
using RCMS.Entities;

//using ActionFilterAttribute = System.Web.Http.Filters.ActionFilterAttribute;
//using IActionFilter = System.Web.Http.Filters.IActionFilter;

namespace RCMS.WEB
{
    public class CustomActionFilter : ActionFilterAttribute, IActionFilter
    {
        void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
        {

            Controller controller = filterContext.Controller as Controller;

            var httpSessionStateBase = (((filterContext)).HttpContext).Session;
            if (httpSessionStateBase != null)
            {
                var user = (User) httpSessionStateBase["CurrentUser"];
                if (user == null)
                {
                    AuditManager.AuditOperation("Not Found the USER",true);
                    controller.HttpContext.Response.Redirect("/Login");
                }
            }
            else
            {
                controller.HttpContext.Response.Redirect("/Login");
            }

            
        }
    }
}