using System;
using System.Data.Common;
using System.Linq;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Infrastructure;
using Dynamic_IP_Address_Service_Server.DAL.Models;
using Dynamic_IP_Address_Service_Server.DAL.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace Dynamic_IP_Address_Service_Server.Test.DAL.Repositories
{
    [TestClass]
    public class GenericRepositoryTests
    {
        private UnitOfWork _uow;
        private IEntityContext _context;
        private UserRepository _userRepository;
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
        }

        [Test()]
        public void InsertTest()
        {
            _uow.UserRepository.Insert(fakeUser1);
            _uow.Commit();
            NUnit.Framework.Assert.AreEqual(_uow.UserRepository.GetAll().Count(), 1);
        }

        [Test()]
        public void UpdateTest()
        {
            fakeUser1.FirstName = "test";
            _uow.UserRepository.Update(fakeUser1);
            NUnit.Framework.Assert.AreEqual(_uow.UserRepository.GetById(fakeUser1.Id).FirstName, "test");
        }

        [Test()]
        public void DeleteTest()
        {
            _uow.UserRepository.Insert(fakeUser1);
            _uow.UserRepository.Delete(fakeUser1);
            _uow.Commit();
            NUnit.Framework.Assert.AreEqual(_uow.UserRepository.GetAll().Count(), 0);
        }

        [Test()]
        public void DeleteByIdTest()
        {
            _uow.UserRepository.Insert(fakeUser1);
            _uow.UserRepository.DeleteById(fakeUser1.Id);
            _uow.Commit();
            NUnit.Framework.Assert.AreEqual(_uow.UserRepository.GetAll().Count(), 0);
        }

        [Test()]
        public void GetByIdTest()
        {
            _uow.UserRepository.Insert(fakeUser1);
            _uow.Commit();
            var user = _uow.UserRepository.GetById(fakeUser1.Id);
            NUnit.Framework.Assert.AreEqual(user, fakeUser1);
            _uow.UserRepository.Delete(user);
            _uow.Commit();
        }

        [Test()]
        public void GetAllTest()
        {
            _uow.UserRepository.Insert(fakeUser1);
            _uow.UserRepository.Insert(fakeUser2);
            _uow.Commit();
            NUnit.Framework.Assert.AreEqual(_uow.UserRepository.GetAll().Count(), 2);
            _uow.UserRepository.DeleteById(fakeUser1.Id);
            _uow.UserRepository.DeleteById(fakeUser2.Id);
            _uow.Commit();
        }
    }
}