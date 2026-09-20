using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;
using RCMS.Entities.ViewModel;
using RCMS.Manager.Interface;
using RCMS.Repositories;

namespace RCMS.Manager.Manager
{
    public class DashboardManager : IDashboardManager
    {
        private IGenericRepository<Audit> _aRepository;
        private IGenericRepository<Message> _aMessageRepository;

        private IGenericRepository<UplodImage> _aImageRepository;
        private ResponseModel _aModel;
        public DashboardManager()
        {
            _aRepository = new GenericRepositoryCms<Audit>();
            _aMessageRepository = new GenericRepositoryCms<Message>();
            _aImageRepository = new GenericRepositoryCms<UplodImage>();
            _aModel = new ResponseModel();
        }
        public ResponseModel GetVisitorCount()
        {
            try
            {
                var todaysDate = DateTime.Now;
                var twentyDaysEarlier = todaysDate.AddDays(-19);

                var selectedData =
                    _aRepository.SelectAll().Where(a => a.AuditTime >= twentyDaysEarlier && a.AuditTime <= todaysDate);
                List<object> finalData = new List<object>();
                for (var date = twentyDaysEarlier; date <= todaysDate; date= date.AddDays(1))
                {
                    var data = new
                    {
                        date = date.ToString("dd-MM-yyyy"),
                        value = selectedData.Count(a => a.AuditTime != null && a.IsAdmin != true && a.AuditTime.Value.Date.ToString("MM/dd/yyyy") == date.ToString("MM/dd/yyyy"))
                    };
                    finalData.Add(data);
                }
                return _aModel.Respons(finalData);
            }
            catch (Exception)
            {
                return null;
                
            }
        }



        public ResponseModel GetTotalVisitorCount()
        {
            try
            {
                var finalData =_aRepository.SelectAll().Count(a => a.IsAdmin!=true);
               
                return _aModel.Respons(finalData);
            }
            catch (Exception)
            {
                return null;
                
            }
        }

        public ResponseModel LoadLayoutData(User aUser)
        {
            try
            {

                try
                {

                    var unreadMessage = _aMessageRepository.SelectAll().Count(a => a.IsRead != true);

                    var data = new
                    {
                        UnreadMessage = unreadMessage,
                        EmployeeName = aUser.EmployeeName
                    };

                    return _aModel.Respons(data);
                }
                catch (Exception)
                {
                    return null;

                }
            }
            catch (Exception)
            {

                return null;
            }
        }

        public ResponseModel GetUniqueVisitorByDate(DateTime aDate)
        {
            try
            {
                 //var selectedData =
                 //   _aRepository.SelectAll().Where(a => a.AuditTime != null && a.IsAdmin != true &&  a.AuditTime.Value.Date.ToString("MM/dd/yyyy") == aDate.ToString("MM/dd/yyyy"));
                 using (var context = new EntitiesCms())
                 {
                     var data = context.Database.SqlQuery<AuditVM>(String.Format(@"select convert(varchar,AuditDate, 6) AuditDate ,IpAddress,PcName,Browser,OsInfo,COUNT(*) Count from (
select CAST(AuditTime AS DATE) AuditDate,  ISNULL(IsAdmin,0)Admin, * from Audit
where  CAST(AuditTime AS DATE) = CAST('{0}' AS DATE)
) tbl where Admin!=1
group by AuditDate,IpAddress,PcName,Browser,OsInfo", aDate.AddHours(12))).ToList();
                     //Audit _audit = new Audit()
                     //{
                     //    Message = aDate.ToString()+ data.Count.ToString(),
                     //    IsAdmin = true
                     //};
                     //_aRepository.Insert(_audit);
                     //_aRepository.Save();
                     return _aModel.Respons(data);
        //                public string AuditDate { get; set; }
        //public string Count { get; set; }
                 }

            }
            catch (Exception ex)
            {
                //Audit _audit =new Audit()
                //{
                //    Message = ex.Message,
                //    IsAdmin = true
                //};
                //_aRepository.Insert(_audit);
                //_aRepository.Save();
                return null;
            }
        }

        public ResponseModel SaveImage(UplodImage aObj)
        {
            try
            {
                _aImageRepository.Insert(aObj);
                _aImageRepository.Save();
                return _aModel.Respons(true, "Image Saved Successfully.");
            }
            catch (Exception)
            {

                return _aModel.Respons(false,"Some Error hapned.");
            }
        }

        public ResponseModel LoadAllImage()
        {
            try
            {
            var data=    _aImageRepository.SelectAll().OrderByDescending(a=>a.UplodImageId);
            return _aModel.Respons(data);
            }
            catch (Exception)
            {

                return null;
            }
        }

        public UplodImage DeleteImage(int id)
        {
            try
            {
                var data = _aImageRepository.SelectedById(id);
                
                _aImageRepository.Delete(id);
                _aImageRepository.Save();
                return data;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ResponseModel GetAllUnprocessedVisitorData()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);
        }
    }
}
