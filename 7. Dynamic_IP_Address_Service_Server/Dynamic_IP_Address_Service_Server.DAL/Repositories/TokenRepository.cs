using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using System;
using System.Linq;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface ITokenRepository : IRepository<Token>
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