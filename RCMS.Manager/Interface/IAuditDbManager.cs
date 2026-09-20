using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;

namespace RCMS.Manager.Interface
{
  public  interface IAuditDbManager
    {
      void SaveAuditLog(Audit data);
    }
}
