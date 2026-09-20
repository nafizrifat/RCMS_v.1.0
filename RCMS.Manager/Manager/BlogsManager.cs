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
    public class BlogsManager : IBlogsManager
    {
        private IGenericRepository<Blog> _aRepository;
        private ResponseModel _aModel;
        public BlogsManager()
        {
            _aRepository = new GenericRepositoryCms<Blog>();
            _aModel = new ResponseModel();
        }

        public ResponseModel SaveBlogs(Blog aObj)
        {
            try
            {
                aObj.LastUpdateOn = DateTime.Now;
                if (aObj.BlogId != 0)
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

        public ResponseModel GetBlogData(int isLoadAllData)
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

        public ResponseModel CheckBlogSequence(int id)
        {
            var data = _aRepository.SelectAll().Where(a => a.Sequence == id);
            if (data.Count() > 0)
            {
                return _aModel.Respons(true, "This Sequence Already Exist");
            }
            return _aModel.Respons(false, "This sequence is available");
        }

        public ResponseModel DeleteBlog(int id)
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

        public ResponseModel GetBlogDataFromSeverSession(int portfolioId)
        {
            try
            {
                var data = _aRepository.SelectedById(portfolioId);
                // data.HitCount=(data.HitCount == null) ? data.HitCount = 1 : data.HitCount++;

                // var i = data.HitCount == null ? data.HitCount = 1 : data.HitCount++;
                if (data.HitCount == null)
                {
                    data.HitCount = 1;
                }
                else
                {
                    data.HitCount++;
                }

                _aRepository.Update(data);
                _aRepository.Save();



                return _aModel.Respons(data);

            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }


}
