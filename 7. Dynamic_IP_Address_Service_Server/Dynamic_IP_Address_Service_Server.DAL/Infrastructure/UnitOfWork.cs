using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models.Common;
using Dynamic_IP_Address_Service_Server.DAL.Repositories;
using System;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;

namespace Dynamic_IP_Address_Service_Server.DAL.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private IUserRepository _userRepository;
        private IDomainRepository _domainRepository;
        private IRoleRepository _roleRepository;
        private ITokenRepository _tokenRepository;

        private readonly IEntityContext _dbContext;

        public UnitOfWork(IEntityContext dbContext)
        {
            _dbContext = dbContext;
        }

        private string UserName => $"{Environment.MachineName}\\{Environment.UserDomainName}";

        public IUserRepository UserRepository => _userRepository ?? (_userRepository = new UserRepository(_dbContext));

        public IDomainRepository DomainRepository => _domainRepository ?? (_domainRepository = new DomainRepository(_dbContext));

        public IRoleRepository RoleRepository => _roleRepository ?? (_roleRepository = new RoleRepository(_dbContext));

        public ITokenRepository TokenRepository => _tokenRepository ??
                                                  (_tokenRepository = new TokenRepository(_dbContext));

        public void Commit()
        {
            try
            {
                EntityState[] states = { EntityState.Added, EntityState.Modified };
                var entities = _dbContext.ChangeTracker.Entries()
                    .Where(i => i.Entity is Entity && states.Contains(i.State));

                foreach (var entity in entities)
                {
                    if (entity.State == EntityState.Added)
                    {
                        ((Entity)entity.Entity).CreatedAt = DateTime.UtcNow;
                        ((Entity)entity.Entity).CreatedBy = UserName;
                    }
                    ((Entity)entity.Entity).ModifiedAt = DateTime.UtcNow;
                    ((Entity)entity.Entity).ModifiedBy = UserName;
                }

                _dbContext.SaveChanges();
            }
            catch (DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationError in dbEx.EntityValidationErrors)
                {
                    foreach (var error in validationError.ValidationErrors)
                    {
                        string message = $"{validationError.Entry.Entity}:{error.ErrorMessage}";
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                Rollback();
                throw raise;
            }
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        private void Rollback()
        {
            EntityState[] states = { EntityState.Added, EntityState.Modified };

            foreach (var entity in _dbContext.ChangeTracker.Entries().Where(i => states.Contains(i.State)))
            {
                _dbContext.Entry(entity.Entity).State = EntityState.Detached;
            }
        }
    }
}