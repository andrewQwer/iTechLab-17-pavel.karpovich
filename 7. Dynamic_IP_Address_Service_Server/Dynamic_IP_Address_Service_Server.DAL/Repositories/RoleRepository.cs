using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using System.Linq;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        Role GetByName(string name);
    }

    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(IEntityContext dbContext) : base(dbContext)
        {
        }

        public Role GetByName(string name)
        {
            return GetAll().FirstOrDefault(i => i.Name == name);
        }
    }
}