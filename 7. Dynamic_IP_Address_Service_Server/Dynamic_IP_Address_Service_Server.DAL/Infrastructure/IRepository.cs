using System.Linq;
using Dynamic_IP_Address_Service_Server.DAL.Models.Common;

namespace Dynamic_IP_Address_Service_Server.DAL.Infrastructure
{
    public interface IRepository<T> where T : Entity
    {
        T Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteById(object id);
        T GetById(object id);
        IQueryable<T> GetAll();
    }
}
