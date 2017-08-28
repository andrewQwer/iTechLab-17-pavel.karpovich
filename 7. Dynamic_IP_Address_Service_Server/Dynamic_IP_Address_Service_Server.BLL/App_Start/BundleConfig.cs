using System.Web;
using System.Web.Optimization;

namespace Dynamic_IP_Address_Service_Server.BLL
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                        "~/Scripts/main.bundle.js", "~/Scripts/main.bundle.js.map"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/main.bundle.css", "~/Content/main.bundle.css.map"));
        }
    }
}