using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RCMS.Entities;
using RCMS.Entities.ViewModel;
using RCMS.Manager.Interface;
using RCMS.Repositories;

namespace RCMS.Manager.Manager
{
    public class CmsManager : ICmsManager
    {
        private IHomeSocialManager aHomeSocialManager;
        private ResponseModel _aModel;
        public CmsManager()
        {
            aHomeSocialManager = new HomeSocialManager();
            _aModel = new ResponseModel();
        }

        public ResponseModel GetHomeOperations()
        {

            var homeData = (Home)aHomeSocialManager.GetHomeOperations().Data;
          HomeSocial _data = new HomeSocial()
          {
              Title = homeData.Title,
              SubTitle = homeData.SubTitle,
              HomeImageLink = homeData.HomeImageLink
            
          };
          List<Social> socialData=  (List<Social>) aHomeSocialManager.GetSocalLink().Data;
          _data.SocialList = new List<Social>();
         // _data.SocialList.Add(socialData);
          foreach (Social aSocial in (IEnumerable)socialData)
            {
                
                _data.SocialList.Add((Social) aSocial);
            }
            return _aModel.Respons(_data);
        }
    }
}
