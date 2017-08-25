using System.Data.Entity.Core.Objects;
using System.Net;
using System.Net.Http;
using AutoMapper;
using Dynamic_IP_Address_Service_Server.BLL.DTO;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using Dynamic_IP_Address_Service_Server.DAL.Repositories;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    public class UserController : ApiController
    {
        private IUnitOfWork _uow;

        [HttpPost]
        public string GetAll([FromBody] UserDTO userDto)
        {
            User user = Mapper.Map<User>(userDto);
            return "text";
        }

        [HttpPost]
        public IHttpActionResult Registration(UserDTO userDto)
        {
            IHttpActionResult result = Unauthorized();
            var user = Mapper.Map<User>(userDto);

            using (_uow = new UnitOfWork(new EntityContext()))
            {
                user.Role = _uow.RoleRepository.GetByName("SimpleUser");
                if (_uow.UserRepository.CheckForUniq(user))
                {
                    _uow.UserRepository.Insert(user);
                    _uow.Commit();
                    result = Ok();
                }
            }
            return result;
        }

        [HttpPost]
        public IHttpActionResult Login(LoginDTO loginDTO)
        {
            IHttpActionResult result = Unauthorized();
            using (_uow = new UnitOfWork(new EntityContext()))
            {
                var user = _uow.UserRepository.CheckUserAuthentication(loginDTO.Login, loginDTO.Pass);
                if (user != null)
                {
                    return Ok(JsonConvert.SerializeObject(user));
                }
            }
            return result;
        }

        [HttpPost]
        public IHttpActionResult LogOut()
        {
            return Ok();
        }
    }
}