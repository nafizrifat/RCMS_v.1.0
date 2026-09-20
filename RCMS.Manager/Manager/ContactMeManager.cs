using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.NetworkInformation;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using RCMS.Entities;
using RCMS.Manager.Interface;
using RCMS.Repositories;

namespace RCMS.Manager.Manager
{
    public class ContactMeManager : IContactMeManager
    {

        private IGenericRepository<Message> _aRepository;
        private ResponseModel _aModel;
        private IGenericRepository<SystemSetting> _aSystemSettingRepository; 

        public ContactMeManager()
        {
            _aRepository = new GenericRepositoryCms<Message>();
            _aSystemSettingRepository = new GenericRepositoryCms<SystemSetting>();
            _aModel = new ResponseModel();
        }

        public ResponseModel SendMessae(Message aObj)
        {
            try
            {
             //   var x = AuditLog.GetAuditLog();
                if (aObj.Name == null)
                {
                    return _aModel.Respons(false, "Name is required.");
                }
                if (aObj.Subject == null)
                {
                    return _aModel.Respons(false, "Subject is required.");
                }
                if (aObj.Email == null)
                {
                    return _aModel.Respons(false, "Email is required.");
                }
                if (aObj.MessageDetails == null)
                {
                    return _aModel.Respons(false, "Message is required.");
                }
                Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                Match match = regex.Match(aObj.Email);
                if (!match.Success)
                {
                    return _aModel.Respons(false, "Please enter valid Email address.");
                }

                aObj.CreateDate = DateTime.Now;
                aObj.IsRead = false;
                if (aObj.MessageId != 0)
                {
                    _aRepository.Update(aObj);
                }
                else
                {
                    _aRepository.Insert(aObj);
                }

                _aRepository.Save();
                SendEmail(aObj);
                return _aModel.Respons(true, "Data Successfully Saved");
            }
            catch (Exception ex)
            {
                IGenericRepository<Audit> _auditRepository = new GenericRepositoryCms<Audit>();
                Audit _audit = new Audit()
                {
                    Message = ex.Message.ToString() + "-" + ex.InnerException,
                    IsAdmin = true
                };
                _auditRepository.Insert(_audit);
                _auditRepository.Save();
                return _aModel.Respons(false, "An error occurred. Please try again later");
            }
        }

        public bool CheckTodaysQuotaForMessage(Audit audit)
        {
            try
            {
                var t = DateTime.Today;
                var data = _aRepository.SelectAll().Where(a => a.CreateDate != null && (a.Ip == audit.IpAddress && a.CreateDate.Value.Date.ToString("MM/dd/yyyy") == DateTime.Today.ToString("MM/dd/yyyy")));
               // var data = _aRepository.SelectAll().Where(a => a.Ip == audit.IpAddress);

                //data.Select(a=>a.CreateDate.ToString("MM/dd/yyyy") == DateTime.Today.ToString("MM/dd/yyyy"))
               var systemSettings =  _aSystemSettingRepository.SelectAll().FirstOrDefault();
                if (systemSettings != null && data.Count() > systemSettings.PerDayMaxMessageSent)
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public ResponseModel LoadAllMessageData()
        {
            try
            {
                var data = _aRepository.SelectAll().Where(a=>a.IsDeleted!=true).OrderByDescending(a => a.CreateDate);
                return _aModel.Respons(data);
            }
            catch (Exception)
            {

                return null;
            }
        }

        public ResponseModel MarkMessageAsRead(int id)
        {
            try
            {
                var data = _aRepository.SelectAll().FirstOrDefault(a => a.MessageId==id);

                if (data != null)
                {
                    data.IsRead = true;
                    _aRepository.Update(data);
                    _aRepository.Save();
                }
                return _aModel.Respons(true);

            }
            catch (Exception)
            {
                
                return null;
            }
        }

        public ResponseModel DeleteMessage(int id)
        {
            try
            {
                var data = _aRepository.SelectAll().FirstOrDefault(a => a.MessageId == id);

                if (data != null)
                {
                    data.IsDeleted = true;
                    data.DeletedDate = DateTime.Now;
                    _aRepository.Update(data);
                    _aRepository.Save();
                }
                return _aModel.Respons(true, "Data Deleted Successfully");

            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        //public void SendEmail(Message aObj)
        //{

        //    try
        //    {
        //        //SmtpClient smtpClient = new SmtpClient("mail.MyWebsiteDomainName.com", 25);

        //        //smtpClient.Credentials = new System.Net.NetworkCredential("info@MyWebsiteDomainName.com", "myIDPassword");
        //        //smtpClient.UseDefaultCredentials = true;
        //        //smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
        //        //smtpClient.EnableSsl = true;
        //        //MailMessage mail = new MailMessage();

        //        ////Setting From , To and CC
        //        //mail.From = new MailAddress("info@MyWebsiteDomainName", "MyWeb Site");
        //        //mail.To.Add(new MailAddress("info@MyWebsiteDomainName"));
        //        //mail.CC.Add(new MailAddress("MyEmailID@gmail.com"));

        //        //smtpClient.Send(mail);
        //        var systemSettings = _aSystemSettingRepository.SelectAll().FirstOrDefault();
        //        var fromAddress = new MailAddress("dev.rifat@gmail.com", "Nafiz Imtiaz Rifat");
        //        var toAddress = new MailAddress(aObj.Email, aObj.Name);
        //        const string fromPassword = "Rif@t1011";
        //        const string subject = "Thank You From nafizrifat.com";
        //        string body = systemSettings.EmailContent;
        //        body = body.Replace("{0}", aObj.Name);
        //        body = body.Replace("{1}", aObj.Ip);
        //        body = body.Replace("{2}", aObj.PcName);
        //        var smtp = new SmtpClient
        //        {
        //            //Host = "smtp.gmail.com",
        //            Host = "relay-hosting.secureserver.net",
        //            // Host = "smtpout.secureserver.net",
        //            //Port = 587,
        //            Port = 25,
        //            EnableSsl = false,
        //            DeliveryMethod = SmtpDeliveryMethod.Network,
        //            UseDefaultCredentials = false,
        //            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
        //        };
        //        using (var message = new MailMessage(fromAddress, toAddress)
        //        {
        //            Subject = subject,
        //            Body = body

        //        })
        //        {
        //            message.IsBodyHtml = true;
        //            smtp.Send(message);
        //        }
        //        //Audit _audit = new Audit()
        //        //{
        //        //    Message = "message sent",
        //        //    IsAdmin = true
        //        //};
        //        //_auditRepository.Insert(_audit);
        //        //_auditRepository.Save();
        //    }
        //    catch (Exception ex)
        //    {
        //        IGenericRepository<Audit> _auditRepository = new GenericRepositoryCms<Audit>();
        //        Audit _audit = new Audit()
        //        {
        //           // Message = ex.Message.ToString() + "-" + ex.InnerException,
        //            Message = ex.Message.ToString(),
        //            IsAdmin = true,
        //            AuditTime = DateTime.Now
        //        };
        //        _auditRepository.Insert(_audit);
        //        _auditRepository.Save();
        //        return;
        //    }
        //}
        public void SendEmail(Message aObj)
        {
            var systemSettings = _aSystemSettingRepository
                .SelectAll()
                .FirstOrDefault();

            var fromAddress = new MailAddress(
                "dev.rifat@gmail.com",
                "Nafiz Imtiaz Rifat");

            var toAddress = new MailAddress(
                aObj.Email,
                aObj.Name);

            // NEW APPROACH:
            // Read SMTP password from AppSettings.Secrets.config.
            string fromPassword =
                ConfigurationManager.AppSettings["SmtpPassword"];

            if (string.IsNullOrWhiteSpace(fromPassword))
            {
                throw new ConfigurationErrorsException(
                    "SmtpPassword is missing from AppSettings.Secrets.config.");
            }

            const string subject = "Thank You From nafizrifat.com";

            string body = systemSettings.EmailContent;

            body = body.Replace("{0}", aObj.Name);
            body = body.Replace("{1}", aObj.Ip);
            body = body.Replace("{2}", aObj.PcName);

            using (var message = new MailMessage())
            {
                message.From = fromAddress;
                message.To.Add(toAddress);

                // NEW APPROACH:
                // The main recipient will not see this BCC address.
                message.Bcc.Add(
                    new MailAddress("imtiaz.rifat@gmail.com"));

                message.Subject = subject;
                message.Body = body;
                message.IsBodyHtml = true;

                using (var smtp = new SmtpClient())
                {
                    //Production
                    smtp.Host = "relay-hosting.secureserver.net";
                    smtp.Port = 25;
                    smtp.EnableSsl = false;

                    //Test
                    //smtp.Host = "smtp.gmail.com";
                    //smtp.Port = 587;
                    //smtp.EnableSsl = true;


                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;

                    smtp.Credentials = new NetworkCredential(
                        fromAddress.Address,
                        fromPassword);

                    smtp.Send(message);
                }
            }
        }

    }
}
