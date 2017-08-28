using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Dynamic_IP_Address_Service_Server.BLL.DTO;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using Newtonsoft.Json;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    public class DomainController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Add(DomainDTO domainDto)
        {
            var domain = Mapper.Map<Domain>(domainDto);
            Domain result;
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                if (uow.DomainRepository.CheckForUniq(domain))
                {
                    domain.User = uow.UserRepository.GetByLogin(domainDto.Login);
                    uow.DomainRepository.Insert(domain);
                    uow.Commit();
                    result = uow.DomainRepository.GetByDomainName(domainDto.Domain); // the domain haven't get common filds before insert to table
                }
                else
                {
                    return Conflict();
                }
            }
            return Ok(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public IHttpActionResult Edit(EditDomainDTO editDomainDto)
        {
            var domain = Mapper.Map<Domain>(editDomainDto);
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                if (uow.DomainRepository.CheckForUniq(domain))
                {
                    var original = uow.DomainRepository.GetById(Guid.Parse(editDomainDto.Id));
                    original.DomainName = editDomainDto.Domain;
                    original.Ip = editDomainDto.Ip;
                    uow.DomainRepository.Update(original);
                    uow.Commit();
                }
                else
                {
                    return Conflict();
                }
            }
            return Ok();
        }

        [HttpDelete]
        public void Delete(string id)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                uow.DomainRepository.DeleteById(Guid.Parse(id));
                uow.Commit();
            }
        }
    }
}