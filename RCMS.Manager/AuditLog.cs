using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace RCMS.Manager
{
 public   class AuditLog
    {
        public  string HostName { get; set; }
        public  string IpAddress { get; set; }
        public  string PcName { get; set; }
        public  string Browser { get; set; }
        public string OsInfo { get; set; }
        public string RequestedUrl { get; set; }
        public string Message { get; set; }
    // public static Audit GetAuditLog()
    //  {
    //      try
    //      {
    //          Audit aAudit = new Audit();
    //          var strHostName = System.Net.Dns.GetHostName();
    //          IPHostEntry Host = default(IPHostEntry);
    //          string Hostname = null;
    //          Hostname = System.Environment.MachineName;
    //          Host = Dns.GetHostEntry(Hostname);
    //          string ip = String.Empty;
    //          foreach (IPAddress IP in Host.AddressList)
    //          {
    //              if (IP.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
    //              {
    //                  ip = Convert.ToString(IP);
    //              }
    //          }
    //          var Client_User = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
    //          // var Requested_Url = HttpContext.Current.Request.UrlReferrer.AbsolutePath;
    //          var macAddr =
    //(
    //  from nic in NetworkInterface.GetAllNetworkInterfaces()
    //  where nic.OperationalStatus == OperationalStatus.Up
    //  select nic.GetPhysicalAddress().ToString()
    //).FirstOrDefault();

    //          aAudit.HostName = Hostname;
    //          aAudit.IpAddress = ip;
    //          aAudit.ClientUser = Client_User;
    //          aAudit.MacAddress = macAddr;
    //          return aAudit;
            
    //      }
    //      catch (Exception)
    //      {

    //          return null;
    //      }
         
    //  }
    }

    
}
