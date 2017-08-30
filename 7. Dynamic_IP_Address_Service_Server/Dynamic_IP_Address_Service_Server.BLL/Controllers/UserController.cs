using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using AutoMapper;
using Dynamic_IP_Address_Service_Server.BLL.DTO;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using Dynamic_IP_Address_Service_Server.DAL.Repositories;
using System.Web.Http;
using System.Web.Http.Results;
using Dynamic_IP_Address_Service_Server.BLL.Filters;
using Dynamic_IP_Address_Service_Server.DAL.Models.Error;
using Dynamic_IP_Address_Service_Server.Helpers.Hashing;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    [Exception]
    public class UserController : ApiController
    {
        [HttpGet]
        public IHttpActionResult CheckAuth()
        {
            var authToken = Request.Headers.GetCookies("authToken").FirstOrDefault()?["authToken"].Value;
            var authGuid = Request.Headers.GetCookies("authGuid").FirstOrDefault()?["authGuid"].Value;
            if (authToken != null && authGuid != null)
            {
                using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
                {
                    var lastToken = uow.TokenRepository.GetLastUserToken(Guid.Parse(authGuid));
                    if (lastToken != null && lastToken.AuthToken == authToken)
                    {
                        var user = uow.UserRepository.GetById(Guid.Parse(authGuid));
                        return Ok(JsonConvert.SerializeObject(user));
                    }
                }
            }
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Registration(UserDTO userDto)
        {
            var user = Mapper.Map<User>(userDto);
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                user.Role = uow.RoleRepository.GetByName("SimpleUser");
                if (uow.UserRepository.CheckForUniq(user))
                {
                    uow.UserRepository.Insert(user);
                    uow.Commit();
                    return Ok();
                }
                throw ErrorConsts.REGISTRATION;
            }
        }

        [HttpPost]
        public HttpResponseMessage Login(LoginDTO loginDTO)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                var user = uow.UserRepository.CheckUserAuthentication(loginDTO.Login, loginDTO.Pass);
                if (user != null)
                {
                    Token token = new Token(SaltedHash.GenerateSalt(64), user);
                    var authCookie = new CookieHeaderValue("authToken", token.AuthToken)
                    {
                        Expires = DateTimeOffset.Now.AddDays(31),
                        Domain = Request.RequestUri.Host,
                        Path = "/"
                    };
                    var guidCookie = new CookieHeaderValue("authGuid", user.Id.ToString())
                    {
                        Expires = DateTimeOffset.Now.AddDays(31),
                        Domain = Request.RequestUri.Host,
                        Path = "/"
                    };
                    uow.TokenRepository.Insert(token);
                    uow.Commit();
                    var response = Request.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(user));
                    response.Headers.AddCookies(new[] { authCookie, guidCookie });
                    return response;
                }
                throw ErrorConsts.INCORRECT_LOGIN_OR_PASSWORD;
            }
        }

        [HttpPost]
        [Authentication]
        [Authorization(Role = "admin, simpleUser, premiumUser")]
        public HttpResponseMessage LogOut()
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            var authCookie = new CookieHeaderValue("authToken", "")
            {
                Expires = DateTimeOffset.Now.AddYears(-31),
                Domain = Request.RequestUri.Host,
                Path = "/"
            };
            var guidCookie = new CookieHeaderValue("authGuid", "")
            {
                Expires = DateTimeOffset.Now.AddYears(-31),
                Domain = Request.RequestUri.Host,
                Path = "/"
            };
            response.Headers.AddCookies(new[] { authCookie, guidCookie });
            return response;
        }

        [HttpGet]
        [Authentication]
        [Authorization(Role = "admin, simpleUser, premiumUser")]
        public IHttpActionResult GetUserInfo(string login)
        {
            IHttpActionResult result = NotFound();
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                var user = uow.UserRepository.GetByLogin(login);
                if (user != null)
                    return Ok(JsonConvert.SerializeObject(user));
                throw ErrorConsts.USER_NOT_FOUND;
            }
        }

        [HttpGet]
        [Authentication]
        [Authorization(Role = "admin, simpleUser, premiumUser")]
        public IHttpActionResult GetUserDomains(string login)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                if (uow.UserRepository.GetByLogin(login) == null)
                    throw ErrorConsts.USER_NOT_FOUND;
                var domains = uow.DomainRepository.GetDomainsByLogin(login);
                return Ok(JsonConvert.SerializeObject(domains));
            }
        }

        [HttpGet]
        [Authentication]
        [Authorization(Role = "admin")]
        public IHttpActionResult GetAll()
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                var users = uow.UserRepository.GetAllUserBeyondDeleted();
                return Ok(JsonConvert.SerializeObject(users));
            }
        }

        [HttpGet]
        [Authentication]
        [Authorization(Role = "admin")]
        public IHttpActionResult GetAllDeleted()
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                var users = uow.UserRepository.GetAllDeletedUsers();
                return Ok(JsonConvert.SerializeObject(users));
            }
        }

        [HttpPost]
        [Authentication]
        [Authorization(Role = "admin")]
        public void ChangeRole(List<Guid> guids)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                foreach (var guid in guids)
                {
                    var user = uow.UserRepository.GetById(guid);
                    if (user == null)
                        throw ErrorConsts.USER_NOT_FOUND;
                    user.Role = (user.Role.Name == "PremiumUser")
                        ? uow.RoleRepository.GetByName("SimpleUser")
                        : uow.RoleRepository.GetByName("PremiumUser");
                    uow.UserRepository.Update(user);
                    uow.Commit();
                }
            }
        }

        [HttpPost]
        [Authentication]
        [Authorization(Role = "admin")]
        public void MoveToBin(List<Guid> guids)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                foreach (var guid in guids)
                {
                    var user = uow.UserRepository.GetById(guid);
                    if (user == null)
                        throw ErrorConsts.USER_NOT_FOUND;
                    user.IsInBin = true;
                    uow.UserRepository.Update(user);
                    uow.Commit();
                }
            }
        }

        [HttpPost]
        [Authentication]
        [Authorization(Role = "admin")]
        public void Delete(List<Guid> guids)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                foreach (var guid in guids)
                {
                    if (uow.UserRepository.GetById(guid) == null)
                        throw ErrorConsts.USER_NOT_FOUND;
                    uow.UserRepository.DeleteById(guid);
                    uow.Commit();
                }
            }
        }

        [HttpPost]
        [Authentication]
        [Authorization(Role = "admin")]
        public void RestoreFromBin(List<Guid> guids)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                foreach (var guid in guids)
                {
                    var user = uow.UserRepository.GetById(guid);
                    if (user == null)
                        throw ErrorConsts.USER_NOT_FOUND;
                    user.IsInBin = false;
                    uow.UserRepository.Update(user);
                    uow.Commit();
                }
            }
        }
    }
}