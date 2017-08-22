using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using AutoMapper;
using Dynamic_IP_Address_Service_Server.BLL.DTO;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public string GetAll([FromBody]UserDTO userDto)
        {
            User user = Mapper.Map<User>(userDto);
            return "text";
        }

        [HttpPost]
        public IHttpActionResult Registration(UserDTO userDto)
        {
            IHttpActionResult result = Unauthorized();
            var user = Mapper.Map<User>(userDto);
            UnitOfWork uow = new UnitOfWork(new EntityContext());
            if (uow.UserRepository.CheckForUniq(user))
            {
                uow.UserRepository.Insert(user);
                uow.Commit();
                result = Ok();
            }
            return result;
        }

        public IHttpActionResult Register()
        {
            return Ok("success");
        }
    }
}