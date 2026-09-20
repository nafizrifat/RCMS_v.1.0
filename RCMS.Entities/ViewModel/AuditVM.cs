using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCMS.Entities.ViewModel
{
    public class AuditVM
    {
        public String AuditDate { get; set; }
        public String IpAddress { get; set; }
        public String PcName { get; set; }
        public String Browser { get; set; }
        public String OsInfo { get; set; }
        public int Count { get; set; }
    }
}
