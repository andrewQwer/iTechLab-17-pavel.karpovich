using AutoMapper;
using Dynamic_IP_Address_Service_Server.BLL.DTO;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.BLL
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<UserDTO, User>());
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<DomainDTO, Domain>().ForMember(i => i.DomainName, k => k.MapFrom(i => i.Domain));
                cfg.CreateMap<EditDomainDTO, Domain>().ForMember(i => i.DomainName, k => k.MapFrom(i => i.Domain));
            });
        }
    }
}