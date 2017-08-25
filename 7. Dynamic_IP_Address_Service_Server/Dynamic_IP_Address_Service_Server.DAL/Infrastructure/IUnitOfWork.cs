using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Repositories;

namespace Dynamic_IP_Address_Service_Server.DAL.Infrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        UserRepository UserRepository { get; }
        DomainRepository DomainRepository { get; }
        RoleRepository RoleRepository { get; }

        void Commit();
    }
}