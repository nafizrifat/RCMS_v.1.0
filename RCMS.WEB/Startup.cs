using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RCMS.WEB.Startup))]
namespace RCMS.WEB
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
