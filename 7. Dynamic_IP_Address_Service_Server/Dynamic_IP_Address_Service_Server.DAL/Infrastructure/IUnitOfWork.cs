using Dynamic_IP_Address_Service_Server.DAL.Repositories;
using System;

namespace Dynamic_IP_Address_Service_Server.DAL.Infrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository UserRepository { get; }
        IDomainRepository DomainRepository { get; }
        IRoleRepository RoleRepository { get; }
        ITokenRepository TokenRepository { get; }

        void Commit();
    }
}