using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using System.Data.Entity;

namespace Dynamic_IP_Address_Service_Server.DAL.Initializers
{
    public class RoleInitializer : CreateDatabaseIfNotExists<EntityContext>
    {
        protected override void Seed(EntityContext context)
        {
            context.Roles.Add(new Role("Admin", 999));
            context.Roles.Add(new Role("SimpleUser", 1));
            context.Roles.Add(new Role("PremiumUser", 5));
            context.SaveChanges();
        }
    }
}