using AutoMapper;
using Dynamic_IP_Address_Service_Server.BLL.DTO;
using Dynamic_IP_Address_Service_Server.BLL.Filters;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using Dynamic_IP_Address_Service_Server.DAL.Models.Error;
using Newtonsoft.Json;
using System;
using System.Web.Http;

namespace Dynamic_IP_Address_Service_Server.BLL.Controllers
{
    [Exception]
    [Authentication]
    [Authorization(Role = "admin, simpleUser, premiumUser")]
    public class DomainController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Add(DomainDTO domainDto)
        {
            var domain = Mapper.Map<Domain>(domainDto);
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                if (uow.DomainRepository.CheckForUniq(domain))
                {
                    if (uow.UserRepository.GetByLogin(domainDto.Login) == null)
                        throw ErrorConsts.USER_NOT_FOUND;
                    domain.User = uow.UserRepository.GetByLogin(domainDto.Login);
                    uow.DomainRepository.Insert(domain);
                    uow.Commit(); // the domain haven't get common filds before insert to table
                    return Ok(JsonConvert.SerializeObject(uow.DomainRepository.GetByDomainName(domainDto.Domain)));
                }
                throw ErrorConsts.DOMAIN_UNAVAILIBLE;
            }
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
                    if (original == null)
                        throw ErrorConsts.DOMAIN_NOT_FOUND;
                    original.DomainName = editDomainDto.Domain;
                    original.Ip = editDomainDto.Ip;
                    uow.DomainRepository.Update(original);
                    uow.Commit();
                    return Ok();
                }
                throw ErrorConsts.DOMAIN_UNAVAILIBLE;
            }
        }

        [HttpDelete]
        public void Delete(string id)
        {
            using (IUnitOfWork uow = new UnitOfWork(new EntityContext()))
            {
                if (uow.DomainRepository.GetById(Guid.Parse(id)) == null)
                    throw ErrorConsts.DOMAIN_NOT_FOUND;
                uow.DomainRepository.DeleteById(Guid.Parse(id));
                uow.Commit();
            }
        }
    }
}