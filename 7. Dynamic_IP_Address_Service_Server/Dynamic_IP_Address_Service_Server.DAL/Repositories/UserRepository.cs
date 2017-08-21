using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface IUserRepository
    {
        
    }

    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(IEntityContext dbContext) : base(dbContext)
        {
        }
    }
}
