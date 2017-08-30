using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface ITokenRepository
    {
        Token GetLastUserToken(Guid id);
    }

    public class TokenRepository : GenericRepository<Token>, ITokenRepository
    {
        public TokenRepository(IEntityContext dbContext) : base(dbContext)
        {
        }

        public Token GetLastUserToken(Guid id)
        {
            return GetAll().OrderByDescending(i => i.CreatedAt).FirstOrDefault(i => i.User.Id == id);
        }
    }
}