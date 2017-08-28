using System.Data.Common;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using NUnit.Framework;

namespace Dynamic_IP_Address_Service_Server.Test.DAL.Repositories
{
    [TestFixture()]
    public class RoleRepositoryTests
    {
        private UnitOfWork _uow;
        private IEntityContext _context;
        private Role fakeRole1;
        private Role fakeRole2;

        [OneTimeSetUp]
        public void Initialize()
        {
            DbConnection connection = Effort.DbConnectionFactory.CreateTransient();

            _context = new EntityContext(connection);
            _uow = new UnitOfWork(_context);
            fakeRole1 = new Role("admin", 99);
            fakeRole2 = new Role("simple", 55);
            _uow.RoleRepository.Insert(fakeRole1);
            _uow.RoleRepository.Insert(fakeRole2);
            _uow.Commit();
        }

        [Test()]
        public void GetByNameTest()
        {
            Assert.AreEqual(fakeRole1, _uow.RoleRepository.GetByName("admin"));
            Assert.AreEqual(null, _uow.RoleRepository.GetByName("test"));
        }
    }
}