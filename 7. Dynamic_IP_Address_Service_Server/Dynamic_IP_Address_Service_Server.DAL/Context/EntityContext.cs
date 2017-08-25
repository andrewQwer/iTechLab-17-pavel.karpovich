using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.DAL.Context
{
    public class EntityContext : DbContext, IEntityContext
    {
        private const string ConnectionStringName = "Entities";

        public EntityContext() : base(ConnectionStringName)
        {
        }

        public EntityContext(DbConnection connection) : base(connection, true)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Domain> Domains { get; set; }
    }
}