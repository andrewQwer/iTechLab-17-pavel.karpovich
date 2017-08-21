using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        public string GetAll()
        {
            return "text";
        }

        public IHttpActionResult Register()
        {
            return Ok("success");
        }
    }
}