using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;

namespace RCMS.Manager.Interface
{
   public interface IPortfolioManager
    {
       ResponseModel PortfolioTypeDownData();
       ResponseModel SavePortfolioWork(Work aObj);
       ResponseModel SavePortfolioType(PortfolioType aObj);
       ResponseModel GetWorkTypeData();
       ResponseModel DeleteWorkTypeData(int id);
       ResponseModel GetPortfolioData(int isLoadAllData);
       ResponseModel DeletePortfolio(int id);
       ResponseModel GetPortfolioDataFromSeverSession(int portfolioId);
       ResponseModel CheckPortfolioSequence(int id);
       int GetNextPreviousPortfolio(int portfolioId, int flag);
    }
}
