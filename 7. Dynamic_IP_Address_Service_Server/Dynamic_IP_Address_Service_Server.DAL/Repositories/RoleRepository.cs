using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface IRoleRepository
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