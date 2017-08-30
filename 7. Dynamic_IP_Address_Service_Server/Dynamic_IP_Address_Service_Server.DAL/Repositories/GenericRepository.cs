using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models.Common;
using System.Data.Entity;
using System.Linq;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : Entity
    {
        protected IEntityContext DbContext;
        protected DbSet<T> DbSet;

        public GenericRepository(IEntityContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Set<T>();
        }

        public T Insert(T entity)
        {
            return DbSet.Add(entity);
        }

        public void Update(T entity)
        {
            DbSet.Attach(entity);
            DbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            DbSet.Remove(entity);
        }

        public void DeleteById(object id)
        {
            var entity = DbSet.Find(id);
            Delete(entity);
        }

        public T GetById(object id)
        {
            return DbSet.Find(id);
        }

        public IQueryable<T> GetAll()
        {
            return DbSet.AsQueryable();
        }
    }
}