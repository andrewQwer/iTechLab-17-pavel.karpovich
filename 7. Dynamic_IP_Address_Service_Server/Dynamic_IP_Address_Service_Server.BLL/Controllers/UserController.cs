using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
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
using Dynamic_IP_Address_Service_Server.BLL.Filters;
using Dynamic_IP_Address_Service_Server.DAL.Models.Error;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    [Exception]
    public class UserController : ApiController
    {
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
        public IHttpActionResult Login(LoginDTO loginDTO)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                var user = uow.UserRepository.CheckUserAuthentication(loginDTO.Login, loginDTO.Pass);
                if (user != null)
                {
                    return Ok(JsonConvert.SerializeObject(user));
                }
                throw ErrorConsts.INCORRECT_LOGIN_OR_PASSWORD;
            }
        }

        [HttpPost]
        public IHttpActionResult LogOut()
        {
            return Ok();
        }

        [HttpGet]
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
        public IHttpActionResult GetAll()
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                var users = uow.UserRepository.GetAllUserBeyondDeleted();
                return Ok(JsonConvert.SerializeObject(users));
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllDeleted()
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                var users = uow.UserRepository.GetAllDeletedUsers();
                return Ok(JsonConvert.SerializeObject(users));
            }
        }

        [HttpPost]
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