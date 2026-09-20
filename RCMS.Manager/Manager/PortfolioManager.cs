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
    public class PortfolioManager : IPortfolioManager
    {
        private IGenericRepository<PortfolioType> _aRepository;
        private IGenericRepository<Work> _aWorkRepository;
        private ResponseModel _aModel;

        public PortfolioManager()
        {
            _aRepository = new GenericRepositoryCms<PortfolioType>();
            _aWorkRepository = new GenericRepositoryCms<Work>();
            _aModel = new ResponseModel();
        }

        public ResponseModel PortfolioTypeDownData()
        {
            var data = _aRepository.SelectAll();

            var listB = data.Select(a => new
            {
                id = a.PortfolioTypeId,
                text = a.Type

            });

            return _aModel.Respons(listB);
        }

        public ResponseModel SavePortfolioWork(Work aObj)
        {
            try
            {
                aObj.LastUpdateOn = DateTime.Now;
                if (aObj.WorkId != 0)
                {
                    _aWorkRepository.Update(aObj);
                }
                else
                {
                    _aWorkRepository.Insert(aObj);
                }

                _aWorkRepository.Save();
                return _aModel.Respons(true, "Data Successfully Saved");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        bool isAlreadyExist(PortfolioType aObj)
        {
           // var isAlreadyExist = _aRepository.SelectAll().Any(a => a.Type == aObj.Type && a.PortfolioTypeId != aObj.PortfolioTypeId);
            var isAlreadyExist = _aRepository.SelectAllValidation().Any(a => a.Type == aObj.Type && a.PortfolioTypeId != aObj.PortfolioTypeId);
            if (isAlreadyExist)
                return true;
            else return false;
        }
        public ResponseModel SavePortfolioType(PortfolioType aObj)
        {
            try
            {

                if (isAlreadyExist(aObj))
                {
                    return _aModel.Respons(false, "This Type aleady exists");
                }
                aObj.LastUpdateDate = DateTime.Now;
                if (aObj.PortfolioTypeId != 0)
                {
                    _aRepository.Update(aObj);
                }
                else
                {
                    _aRepository.Insert(aObj);
                }

                _aRepository.Save();
                return _aModel.Respons(true, "Data Successfully Saved");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        public ResponseModel GetWorkTypeData()
        {
            try
            {
                var data = _aRepository.SelectAll();
                return _aModel.Respons(data);
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public ResponseModel DeleteWorkTypeData(int id)
        {
            try
            {
                _aRepository.Delete(id);
                _aRepository.Save();
                return _aModel.Respons(true, "Data Deleted Successfully");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        public ResponseModel GetPortfolioData(int isLoadAllData)
        {
            try
            {
                var data = _aRepository.SelectAll();
                var workTypes = _aWorkRepository.SelectAll();

                var finalData = from aData in data
                                join workType in workTypes on aData.PortfolioTypeId equals workType.TypeId

                                select new
                                {
                                    aData.Type,
                                    workType.Title,
                                    workType.Description,
                                    workType.Details,
                                    workType.ImageLink,
                                    workType.Link,
                                    workType.Sequence,
                                    workType.TypeId,
                                    workType.WorkId,
                                    workType.Role,
                                    workType.Technologies

                                };
                if (isLoadAllData == 0)
                {

                    finalData = finalData.OrderBy(o => o.Sequence).Take(9);
                }
                else
                {

                    finalData = finalData.OrderBy(o => o.Sequence);
                }
                return _aModel.Respons(finalData);
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public ResponseModel DeletePortfolio(int id)
        {
            try
            {
                _aWorkRepository.Delete(id);
                _aWorkRepository.Save();
                return _aModel.Respons(true, "Data Deleted Successfully");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        public ResponseModel GetPortfolioDataFromSeverSession(int portfolioId)
        {
            try
            {
              
                var data = _aRepository.SelectAll();
                var work = _aWorkRepository.SelectAll().Where(a => a.WorkId == portfolioId);

                var finalData = from aData in data
                                join workType in work on aData.PortfolioTypeId equals workType.TypeId

                                select new
                                {
                                    aData.Type,
                                    workType.Title,
                                    workType.Description,
                                    workType.Details,
                                    workType.ImageLink,
                                    workType.Link,
                                    workType.Sequence,
                                    workType.TypeId,
                                    workType.WorkId,
                                    workType.Role,
                                    workType.Technologies,

                                };


                return _aModel.Respons(finalData);
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public ResponseModel CheckPortfolioSequence(int id)
        {
            var data = _aWorkRepository.SelectAll().Where(a => a.Sequence==id);
            if (data.Count()>0)
            {
                return _aModel.Respons(true,"This Sequence Already Exist");
            }
            return _aModel.Respons(false,"This sequence is available");
        }

        public int GetNextPreviousPortfolio(int portfolioId, int flag)
        {

            var sequenceOfCurrentPortfolio = _aWorkRepository.SelectedById(portfolioId);
            var finalData = from aData in _aRepository.SelectAll()
                            join work in _aWorkRepository.SelectAll() on aData.PortfolioTypeId equals work.TypeId
                            select new
                            {
                                work.Title,
                                work.Description,
                                work.Details,
                                work.ImageLink,
                                work.Link,
                                work.Sequence,
                                work.TypeId,
                                work.WorkId,
                                work.Role,
                                work.Technologies,

                            };

            if (flag == 1)
            {
                //  var data = finalData.OrderBy(i => i.Sequence).Where(a => a.Sequence > sequenceOfCurrentPortfolio.Sequence).FirstOrDefault();

                var data = finalData.OrderBy(i => i.Sequence).FirstOrDefault(a => a.Sequence > sequenceOfCurrentPortfolio.Sequence);


                  
                if (data != null)
                    return data.WorkId;
                return -1;
            }
            else
            {
               // var data = finalData.OrderByDescending(i => i.Sequence).Where(a => a.Sequence < sequenceOfCurrentPortfolio.Sequence).FirstOrDefault();
                
                var data = finalData.OrderByDescending(i => i.Sequence).FirstOrDefault(a => a.Sequence < sequenceOfCurrentPortfolio.Sequence);
                if (data != null)
                    return data.WorkId;
                return -1;
            }
        }
    }
}
