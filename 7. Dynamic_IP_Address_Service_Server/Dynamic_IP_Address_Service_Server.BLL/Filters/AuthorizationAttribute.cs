using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Dynamic_IP_Address_Service_Server.BLL.Filters
{
    public class AuthorizationAttribute : AuthorizeAttribute
    {
        public string Role { get; set; }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var authGuid = actionContext.Request.Headers.GetCookies("authGuid").FirstOrDefault()?["authGuid"].Value;
            if (authGuid != null)
            {
                using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
                {
                    var userRole = uow.UserRepository.GetById(Guid.Parse(authGuid)).Role.Name;
                    if (Role.IndexOf(userRole, StringComparison.OrdinalIgnoreCase) >= 0)
                        return true;
                }
            }
            return false;
        }
    }
}