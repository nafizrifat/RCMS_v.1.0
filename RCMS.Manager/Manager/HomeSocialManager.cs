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
    public class HomeSocialManager : IHomeSocialManager
    {
        private IGenericRepository<Home> _aRepository;
        private IGenericRepository<Social> _aSocialRepository;
        private ResponseModel _aModel;

        public HomeSocialManager()
        {
            _aRepository = new GenericRepositoryCms<Home>();
            _aSocialRepository = new GenericRepositoryCms<Social>();
            _aModel = new ResponseModel();
        }
        public ResponseModel AddNewHome(Home data)
        {
            try
            {
                data.LastUpdateOn = DateTime.Now;
                if (data.HomeId!=0)
                {
                    _aRepository.Update(data);
                }
                else
                {
                    _aRepository.Insert(data);
                }
              
                _aRepository.Save();
                return _aModel.Respons(true, "Data Successfully Saved");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        public ResponseModel GetHomeOperations()
        {
          
            try
            {
                var data = _aRepository.SelectAll().FirstOrDefault();
                //  data.HomeImageLink = System.IO.Path.GetFileName(data.HomeImageLink);   
                return _aModel.Respons(data);
            }
            catch (Exception ex)
            {

                return _aModel.Respons(null);
            }
        }

        public ResponseModel SaveSocalLink(Social aObj)
        {
           
            try
            {
                aObj.LastUpdateOn = DateTime.Now;
                _aSocialRepository.Insert(aObj);
                _aSocialRepository.Save();
                return _aModel.Respons(true, "Data Successfully Saved");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }

        }

        public ResponseModel GetSocalLink()
        {
           
            try
            {
                var data = _aSocialRepository.SelectAll();
                return _aModel.Respons(data);
            }
            catch (Exception ex)
            {

                return _aModel.Respons(null);
            }
        }
        public ResponseModel DeleteSocalLink(int id)
        {
           
            try
            {
                _aSocialRepository.Delete(id);
                _aSocialRepository.Save();
                return _aModel.Respons(true, "Data Deleted Successfully");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }

        }
    }
}
