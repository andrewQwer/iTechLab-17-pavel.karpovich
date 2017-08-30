using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace Dynamic_IP_Address_Service_Server.BLL.Filters
{
    public class ExceptionAttribute : ExceptionFilterAttribute
    {
        public override Task OnExceptionAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            if (actionExecutedContext.Exception != null)
            {
                actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(
                    HttpStatusCode.Forbidden,
                    actionExecutedContext.Exception.Message);
            }
            return Task.FromResult<object>(null);
        }
    }
}