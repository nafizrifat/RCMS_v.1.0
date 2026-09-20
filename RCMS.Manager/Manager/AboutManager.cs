using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;
using RCMS.Manager;
using RCMS.Manager.Interface;
using RCMS.Repositories;

namespace RCMS.Manager.Manager
{
    public class AboutManager : IAboutManager
    {
        private IGenericRepository<About> _aRepository;
        private IGenericRepository<AboutSkill> _aSkillRepository;
        private IGenericRepository<AboutPersonalInfo> _aAboutPersonalRepository; 
        private ResponseModel _aModel;

        public AboutManager()
        {
            _aRepository = new GenericRepositoryCms<About>();
            _aSkillRepository = new GenericRepositoryCms<AboutSkill>();
            _aAboutPersonalRepository = new GenericRepositoryCms<AboutPersonalInfo>();
            _aModel = new ResponseModel();
        }
        public ResponseModel AddAboutDetails(About data)
        {
            try
            {
                data.LastUpdateDate = DateTime.Now;
                if (data.AboutId != 0)
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

        public ResponseModel GetAboutDetailsData()
        {
            try
            {
                var data = _aRepository.SelectAll().FirstOrDefault();
                return _aModel.Respons(data);
            }
            catch (Exception ex)
            {

                return _aModel.Respons(null);
            }
        }

        public ResponseModel SaveAboutSkills(List<AboutSkill> skillList)
        {
            try
            {
                var firstOrDefault = skillList.FirstOrDefault();
                if (firstOrDefault != null)
                {
                    if (firstOrDefault.AboutId != null)
                    {

                        var toBeDeleteData = _aSkillRepository.SelectAll().Where(a => a.AboutId == firstOrDefault.AboutId);

                        foreach (var aData in toBeDeleteData)
                        {
                            _aSkillRepository.Delete(aData.AboutSkillId);
                        }
                    }
                }
                foreach (var aSkill in skillList)
                {
                    aSkill.LastUpdateOn = DateTime.Now;
                    _aSkillRepository.Insert(aSkill);
                }

                _aSkillRepository.Save();
                return _aModel.Respons(true, "Data Successfully Saved");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        public ResponseModel SavePersonalData(List<AboutPersonalInfo> personalInfoList)
        {
            try
            {
                var firstOrDefault = personalInfoList.FirstOrDefault();
                if (firstOrDefault != null)
                {
                    if (firstOrDefault.AboutId != null)
                    {

                        var toBeDeleteData = _aAboutPersonalRepository.SelectAll().Where(a => a.AboutId == firstOrDefault.AboutId);

                        foreach (var aData in toBeDeleteData)
                        {
                            _aAboutPersonalRepository.Delete(aData.AboutPersonalInfoId);
                        }
                    }
                }
                foreach (var aPInfo in personalInfoList)
                {
                    aPInfo.LastUpdateOn = DateTime.Now;
                    _aAboutPersonalRepository.Insert(aPInfo);
                }

                _aAboutPersonalRepository.Save();
                return _aModel.Respons(true, "Data Successfully Saved");
            }
            catch (Exception ex)
            {

                return _aModel.Respons(false, "Sorry! There is some ERROR. " + ex);
            }
        }

        public ResponseModel GetSkillDetailsData()
        {
            try
            {
                //test start
                //AboutSkill _aSkill = new AboutSkill()
                //{
                //    AboutId = 1,
                //    SkillName = "test",
                //    SkillPercent = "AboutSkill"
                //};
                //test end
                var aboutMaster = _aRepository.SelectAll().FirstOrDefault();
                var data = _aSkillRepository.SelectAll().Where(a => aboutMaster != null && a.AboutId == aboutMaster.AboutId);
                return _aModel.Respons(data);
            }
            catch (Exception ex)
            {

                return _aModel.Respons(null);
            }
        }

        public ResponseModel GetPersonalDetailsData()
        {
            try
            {
                var aboutMaster = _aRepository.SelectAll().FirstOrDefault();
                var data = _aAboutPersonalRepository.SelectAll().Where(a => aboutMaster != null && a.AboutId == aboutMaster.AboutId);
                return _aModel.Respons(data);
            }
            catch (Exception ex)
            {

                return _aModel.Respons(null);
            }
        }
    }
}
