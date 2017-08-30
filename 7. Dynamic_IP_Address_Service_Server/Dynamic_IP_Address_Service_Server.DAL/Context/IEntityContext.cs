using Dynamic_IP_Address_Service_Server.DAL.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace Dynamic_IP_Address_Service_Server.DAL.Context
{
    public interface IEntityContext : IDisposable
    {
        DbChangeTracker ChangeTracker { get; }
        DbSet<User> Users { get; set; }
        DbSet<Domain> Domains { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<Token> Tokens { get; set; }

        int SaveChanges();

        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    }
}