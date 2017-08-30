using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Dynamic_IP_Address_Service_Server.BLL.Filters
{
    public class AuthenticationAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var authToken = actionContext.Request.Headers.GetCookies("authToken").FirstOrDefault()?["authToken"].Value;
            var authGuid = actionContext.Request.Headers.GetCookies("authGuid").FirstOrDefault()?["authGuid"].Value;
            if (authToken != null && authGuid != null)
            {
                using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
                {
                    var lastToken = uow.TokenRepository.GetLastUserToken(Guid.Parse(authGuid));
                    return lastToken.AuthToken == authToken;
                }
            }
            return false;
        }
    }
}