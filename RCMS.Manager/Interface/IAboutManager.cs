using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;

namespace RCMS.Manager.Interface
{
   public interface IAboutManager
    {
       ResponseModel AddAboutDetails(About data);
       ResponseModel GetAboutDetailsData();
       ResponseModel SaveAboutSkills(List<AboutSkill> skillList);
       ResponseModel SavePersonalData(List<AboutPersonalInfo> personalInfoList);
       ResponseModel GetSkillDetailsData();
       ResponseModel GetPersonalDetailsData();
    }
}
