using System.Collections.Generic;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using Dynamic_IP_Address_Service_Server.Helpers.Hashing;
using System.Linq;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface IUserRepository
    {
        bool CheckForUniq(User user);

        User CheckUserAuthentication(string login, string pass);

        User GetByLogin(string login);

        List<User> GetAllUserBeyondDeleted();

        List<User> GetAllDeletedUsers();
    }

    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(IEntityContext dbContext) : base(dbContext)
        {
        }

        public bool CheckForUniq(User user)
        {
            return GetAll().Count(i => i.Login == user.Login || i.Email == user.Email) == 0;
        }

        public User GetByLogin(string login)
        {
            return DbSet.FirstOrDefault(i => i.Login == login);
        }

        public List<User> GetAllUserBeyondDeleted()
        {
            return GetAll().Where(i => !i.IsInBin).ToList();
        }

        public List<User> GetAllDeletedUsers()
        {
            return GetAll().Where(i => i.IsInBin).ToList();
        }

        public User CheckUserAuthentication(string login, string pass)
        {
            User userAttempt = GetByLogin(login);
            return SaltedHash.Verify(pass, userAttempt.Hash, userAttempt.Salt) ? userAttempt : null;
        }

    }
}