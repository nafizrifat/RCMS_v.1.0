using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;
using RCMS.Manager.Interface;
using RCMS.Repositories;

namespace RCMS.Manager.Manager
{
    public class AuditDbManager : IAuditDbManager
    {
        IGenericRepository<Audit> _aRepository;
        public AuditDbManager()
        {
            _aRepository=new GenericRepositoryCms<Audit>();
        }
        public void SaveAuditLog(Audit data)
        {
            try
            {
                _aRepository.Insert(data);
                _aRepository.Save();
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
