using System.Web;
using System.Web.Mvc;

namespace Dynamic_IP_Address_Service_Server.BLL
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
