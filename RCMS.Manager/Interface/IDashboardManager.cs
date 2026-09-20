using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;

namespace RCMS.Manager.Interface
{
    public interface IDashboardManager
    {
        ResponseModel GetVisitorCount();
        ResponseModel GetTotalVisitorCount();
        ResponseModel LoadLayoutData(User aUser);
        ResponseModel GetUniqueVisitorByDate(DateTime aDate);
        ResponseModel SaveImage(UplodImage aObj);
        ResponseModel LoadAllImage();
        UplodImage DeleteImage(int id);
        ResponseModel GetAllUnprocessedVisitorData();
    }
}
