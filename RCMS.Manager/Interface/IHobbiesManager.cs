using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;

namespace RCMS.Manager.Interface
{
 public interface IHobbiesManager
    {
     ResponseModel SaveHobby(Hobby aObj);
     ResponseModel GetHobbiesData();
     ResponseModel DeleteHobby(int id);
    }
}
