using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;


namespace RCMS.Manager.Interface
{
    public interface IContactMeManager
    {
        ResponseModel SendMessae(Message aObj);
        bool CheckTodaysQuotaForMessage(Audit audit);
        ResponseModel LoadAllMessageData();
        ResponseModel MarkMessageAsRead(int id);
        ResponseModel DeleteMessage(int id);
    }
}
