using System.Web.Mvc;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}