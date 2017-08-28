using System.Data.Common;
using System.Linq;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using Dynamic_IP_Address_Service_Server.DAL.Repositories;
using NUnit.Framework;

namespace Dynamic_IP_Address_Service_Server.Test.DAL.Repositories
{
    [TestFixture()]
    public class DomainRepositoryTests
    {
        private UnitOfWork _uow;
        private IEntityContext _context;
        private UserRepository _userRepository;
        private Domain fakeDomain1;
        private Domain fakeDomain2;
        private User fakeUser1;
        private User fakeUser2;

        [OneTimeSetUp]
        public void Initialize()
        {
            DbConnection connection = Effort.DbConnectionFactory.CreateTransient();

            _context = new EntityContext(connection);
            _uow = new UnitOfWork(_context);
            fakeUser1 = new User("taller", "tallerstk97@gmail.com", "Pavel", "Karpovich", "123456789");
            fakeUser2 = new User("liza98", "liza98k@mail.ru", "Liza", "Kalyago", "123456789");
            fakeDomain1 = new Domain("192.168.100.6", "test.taller.com", fakeUser1);
            fakeDomain2 = new Domain("192.168.100.10", "test.taller2.com", fakeUser1);
            _uow.DomainRepository.Insert(fakeDomain1);
            _uow.DomainRepository.Insert(fakeDomain2);
            _uow.Commit();
        }

        [Test()]
        public void GetDomainsByLoginTest()
        {
            Assert.AreEqual(2, _uow.DomainRepository.GetDomainsByLogin(fakeUser1.Login).Count());
            Assert.AreEqual(null, _uow.DomainRepository.GetDomainsByLogin(fakeUser2.Login));
        }

        [Test()]
        public void GetByDomainNameTest()
        {
            Assert.AreEqual(fakeDomain1, _uow.DomainRepository.GetByDomainName(fakeDomain1.DomainName));
            Assert.AreEqual(null, _uow.DomainRepository.GetByDomainName("noDamain"));
        }
    }
}