using System;
using System.Linq;
using System.Net;
using System.Web;
using RCMS.Entities;
using RCMS.Manager.Interface;
using RCMS.Manager.Manager;

namespace RCMS.WEB
{
    public static class AuditManager
    {
        public static Audit GetAuditLog()
        {
            try
            {
                // NEW APPROACH:
                // Store the request in a variable instead of repeatedly
                // accessing HttpContext.Current.Request.
                HttpRequest request = HttpContext.Current.Request;

                Audit audit = new Audit();

                // NEW APPROACH:
                // Get the visitor IP while accounting for Cloudflare,
                // reverse proxies, and load balancers.
                audit.IpAddress = GetClientIpAddress(request);

                // NEW APPROACH:
                // The actual visitor computer name cannot normally be
                // retrieved over the internet.
                //
                // REMOVE:
                // Dns.GetHostEntry(...).HostName
                //
                // Reverse DNS could return an ISP/proxy hostname,
                // block the request, or throw an exception.
                audit.PcName = "Not Available";

                // NEW APPROACH:
                // Detect a basic operating system from the User-Agent.
                audit.OsInfo = GetOperatingSystem(request.UserAgent);

                // Browser information reported by ASP.NET.
                audit.Browser = request.Browser != null
                    ? request.Browser.Browser
                    : "Unknown";

                // The current page being visited.
                audit.Url = request.Url != null
                    ? request.Url.AbsolutePath
                    : "";

                // The previous page that directed the visitor here.
                audit.RequestedUrl = request.UrlReferrer != null
                    ? request.UrlReferrer.AbsoluteUri
                    : "";

                audit.AuditTime = DateTime.Now;

                return audit;
            }
            catch (Exception ex)
            {
                // Keep your existing fallback behavior.
                return new Audit
                {
                    Browser = ex.Message,
                    IpAddress = "N/A",
                    PcName = "Not Available",
                    AuditTime = DateTime.Now
                };
            }
        }

        // NEW APPROACH:
        // Determine the most likely original visitor IP address.
        private static string GetClientIpAddress(HttpRequest request)
        {
            if (request == null)
            {
                return "Unknown";
            }

            /*
             * NEW APPROACH:
             * Cloudflare places the original visitor IP in this header.
             *
             * Only trust this header when your website is actually behind
             * Cloudflare and direct access to the server is restricted.
             */
            string cloudflareIp = request.Headers["CF-Connecting-IP"];

            if (IsValidIpAddress(cloudflareIp))
            {
                return NormalizeIpAddress(cloudflareIp);
            }

            /*
             * NEW APPROACH:
             * Proxies and load balancers commonly use X-Forwarded-For.
             *
             * Example:
             * 73.15.10.20, 10.0.0.5, 10.0.0.6
             *
             * The first address is normally the original visitor.
             */
            string forwardedFor = request.Headers["X-Forwarded-For"];

            if (!string.IsNullOrWhiteSpace(forwardedFor))
            {
                string forwardedIp = forwardedFor
                    .Split(',')
                    .Select(ip => ip.Trim())
                    .FirstOrDefault(IsValidIpAddress);

                if (!string.IsNullOrWhiteSpace(forwardedIp))
                {
                    return NormalizeIpAddress(forwardedIp);
                }
            }

            /*
             * NEW APPROACH:
             * Use the direct connection address when the request was not
             * forwarded through a recognized proxy.
             */
            string remoteIp = request.ServerVariables["REMOTE_ADDR"];

            if (string.IsNullOrWhiteSpace(remoteIp))
            {
                remoteIp = request.UserHostAddress;
            }

            return IsValidIpAddress(remoteIp)
                ? NormalizeIpAddress(remoteIp)
                : "Unknown";
        }

        // NEW APPROACH:
        // Confirm that a header contains a real IP address.
        private static bool IsValidIpAddress(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return false;
            }

            IPAddress parsedAddress;

            return IPAddress.TryParse(
                value.Trim(),
                out parsedAddress);
        }

        // NEW APPROACH:
        // Convert IPv4-mapped IPv6 addresses such as
        // ::ffff:192.168.1.10 into 192.168.1.10.
        private static string NormalizeIpAddress(string value)
        {
            IPAddress parsedAddress;

            if (!IPAddress.TryParse(value.Trim(), out parsedAddress))
            {
                return "Unknown";
            }

            if (parsedAddress.IsIPv4MappedToIPv6)
            {
                parsedAddress = parsedAddress.MapToIPv4();
            }

            return parsedAddress.ToString();
        }

        // NEW APPROACH:
        // Basic operating-system detection from the User-Agent.
        private static string GetOperatingSystem(string userAgent)
        {
            if (string.IsNullOrWhiteSpace(userAgent))
            {
                return "Unknown";
            }

            if (userAgent.IndexOf(
                    "Windows NT 10.0",
                    StringComparison.OrdinalIgnoreCase) >= 0)
            {
                // Windows 10 and Windows 11 usually use the same token.
                return "Windows 10/11";
            }

            if (userAgent.IndexOf(
                    "Android",
                    StringComparison.OrdinalIgnoreCase) >= 0)
            {
                return "Android";
            }

            if (userAgent.IndexOf(
                    "iPhone",
                    StringComparison.OrdinalIgnoreCase) >= 0 ||
                userAgent.IndexOf(
                    "iPad",
                    StringComparison.OrdinalIgnoreCase) >= 0)
            {
                return "iOS/iPadOS";
            }

            if (userAgent.IndexOf(
                    "Mac OS X",
                    StringComparison.OrdinalIgnoreCase) >= 0)
            {
                return "macOS";
            }

            if (userAgent.IndexOf(
                    "Linux",
                    StringComparison.OrdinalIgnoreCase) >= 0)
            {
                return "Linux";
            }

            return "Unknown";
        }

        public static void AuditOperation()
        {
            try
            {
                IAuditDbManager auditManager = new AuditDbManager();
                Audit data = GetAuditLog();

                auditManager.SaveAuditLog(data);
            }
            catch (Exception)
            {
                // TODO: Add application logging here.
            }
        }

        public static void AuditOperation(string msg)
        {
            try
            {
                IAuditDbManager auditManager = new AuditDbManager();
                Audit data = GetAuditLog();

                data.Message = msg;

                auditManager.SaveAuditLog(data);
            }
            catch (Exception)
            {
                // TODO: Add application logging here.
            }
        }

        public static void AuditOperation(string msg, bool isAdmin)
        {
            try
            {
                IAuditDbManager auditManager = new AuditDbManager();
                Audit data = GetAuditLog();

                data.Message = msg;
                data.IsAdmin = isAdmin;

                auditManager.SaveAuditLog(data);
            }
            catch (Exception)
            {
                // TODO: Add application logging here.
            }
        }
    }
}

//using System;
//using System.Collections.Generic;
//using System.Globalization;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Threading.Tasks;
//using System.Web;
//using Newtonsoft.Json;
//using RCMS.Entities;
//using RCMS.Manager;
//using RCMS.Manager.Interface;
//using RCMS.Manager.Manager;

//namespace RCMS.WEB
//{
//    public static class AuditManager
//    {

//        public static Audit GetAuditLog()
//        {
//            try
//            {
//                //  var x = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
//                Audit audit = new Audit();
//                string PCName = Dns.GetHostEntry(HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"]).HostName;

//                //  var  userAgent = Request.Headers["User-Agent"]; 

//                if (HttpContext.Current.Request.UserAgent != null)
//                {
//                    string strUserAgent = HttpContext.Current.Request.UserAgent.ToString().ToLower();
//                    try
//                    {
//                        audit.OsInfo = strUserAgent.Split('(', ')')[1];

//                    }
//                    catch (Exception)
//                    {

//                        audit.OsInfo = "Not Found";
//                    }

//                }
//                if (HttpContext.Current.Request.UrlReferrer != null)
//                {
//                    audit.RequestedUrl = HttpContext.Current.Request.UrlReferrer.AbsolutePath;
//                }
//                else
//                {
//                    audit.RequestedUrl = "";
//                }


//                audit.Url = HttpContext.Current.Request.Url.AbsolutePath;

//                string ip = HttpContext.Current.Request.UserHostAddress;
//             //   GetUserCountryByIp(ip);
//         //     var x=  QueryGeographicalLocationAsync(ip);
//                audit.Browser = HttpContext.Current.Request.Browser.Browser;
//                audit.IpAddress = ip;
//                audit.PcName = PCName;

//                audit.AuditTime = DateTime.Now;

//                return audit;
//            }
//            catch (Exception ex)
//            {

//                Audit audit = new Audit();
//                audit.Browser = ex.Message;
//                audit.IpAddress = "N/A";
//                return audit;
//            }
//        }

//         public static void AuditOperation()
//        {
//             try
//             {
//                 IAuditDbManager _auditManager = new AuditDbManager();
//                 var data = GetAuditLog();
//                 _auditManager.SaveAuditLog(data);
//             }
//            catch (Exception ex)
//            {


//                //return audit;
//            }
//        }
//         public static void AuditOperation(string msg)
//         {
//             try
//             {
//                 IAuditDbManager _auditManager = new AuditDbManager();
//                 var data = GetAuditLog();
//                 data.Message = msg;
//                 _auditManager.SaveAuditLog(data);
//             }
//             catch (Exception ex)
//             {


//                 //return audit;
//             }
//         }
//         public static void AuditOperation(string msg,bool isAdmin)
//         {
//             try
//             {
//                 IAuditDbManager _auditManager = new AuditDbManager();
//                 var data = GetAuditLog();
//                 data.Message = msg;
//                 data.IsAdmin = isAdmin;
//                 _auditManager.SaveAuditLog(data);
//             }
//             catch (Exception ex)
//             {


//                 //return audit;
//             }
//         }
//        //public static string GetUserCountryByIp(string ip)
//        //{
//        //    try
//        //    {
//        //        string info = new WebClient().DownloadString("http://ipinfo.io/" + ip);
//        //      //  ipInfo = JsonConvert.DeserializeObject<IpInfo>(info);
//        //      //  RegionInfo myRI1 = new RegionInfo(ipInfo.Country);
//        //      //  ipInfo.Country = myRI1.EnglishName;
//        //    }
//        //    catch (Exception)
//        //    {
//        //      //  ipInfo.Country = null;
//        //    }

//        //  //  return ipInfo.Country;
//        //    return null;
//        //}
//        //public class IPGeographicalLocation
//        //{
//        //    [JsonProperty("ip")]
//        //    public string IP { get; set; }

//        //    [JsonProperty("country_code")]

//        //    public string CountryCode { get; set; }

//        //    [JsonProperty("country_name")]

//        //    public string CountryName { get; set; }

//        //    [JsonProperty("region_code")]

//        //    public string RegionCode { get; set; }

//        //    [JsonProperty("region_name")]

//        //    public string RegionName { get; set; }

//        //    [JsonProperty("city")]

//        //    public string City { get; set; }

//        //    [JsonProperty("zip_code")]

//        //    public string ZipCode { get; set; }

//        //    [JsonProperty("time_zone")]

//        //    public string TimeZone { get; set; }

//        //    [JsonProperty("latitude")]

//        //    public float Latitude { get; set; }

//        //    [JsonProperty("longitude")]

//        //    public float Longitude { get; set; }

//        //    [JsonProperty("metro_code")]

//        //    public int MetroCode { get; set; }

//        //    private IPGeographicalLocation() { }


//        //}
//        //public static async Task<IPGeographicalLocation> QueryGeographicalLocationAsync(string ipAddress)
//        //{
//        //    ipAddress = "192.168.1.50";
//        //    HttpClient client = new HttpClient();
//        //    var url = String.Format(@"http://api.ipstack.com/{0}?access_key=49b60cc2a88e3b3c4e2fd414326ec900",
//        //        ipAddress);
//        //    string info = new WebClient().DownloadString(url);
//        //  //  string result = await client.DownloadString(String.Format(@"http://api.ipstack.com/{0}? access_key = 49b60cc2a88e3b3c4e2fd414326ec900,", ipAddress));

//        //   // return JsonConvert.DeserializeObject<IPGeographicalLocation>(result);
//        //    return null;
//        //    ;
//        //}
//    }
//}