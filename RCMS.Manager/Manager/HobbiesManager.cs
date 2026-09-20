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
    public class HobbiesManager : IHobbiesManager
    {
        private IGenericRepository<Hobby> _aRepository;
        private ResponseModel _aModel;
        public HobbiesManager()
        {
            _aRepository = new GenericRepositoryCms<Hobby>();
            _aModel = new ResponseModel();
        }
        public ResponseModel SaveHobby(Hobby aObj)
        {
            try
            {
                aObj.LastUpdateOn = DateTime.Now;
                if (aObj.HobbyId != 0)
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

        public ResponseModel GetHobbiesData()
        {

            try
            {
                var data = _aRepository.SelectAll();
                return _aModel.Respons(data);
            }
            catch (Exception ex)
            {

                return _aModel.Respons(null);
            }
        }

        public ResponseModel DeleteHobby(int id)
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
    }
}
