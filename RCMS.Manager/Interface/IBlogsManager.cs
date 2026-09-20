using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;

namespace RCMS.Manager.Interface
{
   public interface IBlogsManager
    {
       ResponseModel SaveBlogs(Blog aObj);
       ResponseModel GetBlogData(int isLoadAllData);
       ResponseModel CheckBlogSequence(int id);
       ResponseModel DeleteBlog(int id);
       ResponseModel GetBlogDataFromSeverSession(int portfolioId);
    }
}
