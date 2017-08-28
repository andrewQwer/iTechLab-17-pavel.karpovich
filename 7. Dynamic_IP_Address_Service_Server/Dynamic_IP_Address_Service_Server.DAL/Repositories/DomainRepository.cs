using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface IDomainRepository
    {
        List<Domain> GetDomainsByLogin(string login);

        Domain GetByDomainName(string domain);

        bool CheckForUniq(Domain domain);
    }

    public class DomainRepository : GenericRepository<Domain>, IDomainRepository
    {
        public DomainRepository(IEntityContext dbContext) : base(dbContext)
        {
        }

        public List<Domain> GetDomainsByLogin(string login)
        {
            var user = DbContext.Users.FirstOrDefault(i => i.Login == login);
            List<Domain> domains = null;
            if (user != null)
                domains = GetAll().Where(i => i.User.Id == user.Id).ToList();
            return domains?.Count() != 0 ? domains : null;
        }

        public Domain GetByDomainName(string domain)
        {
            DbContext.Roles.Load();
            DbContext.Domains.Load();
            DbContext.Users.Load();
            return DbSet.FirstOrDefault(i => i.DomainName == domain);
        }

        public bool CheckForUniq(Domain domain)
        {
            return GetAll().Count(i => i.DomainName == domain.DomainName) == 0;
        }
    }
}