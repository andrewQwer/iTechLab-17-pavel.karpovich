using NUnit.Framework;
using Dynamic_IP_Address_Service_Server.Helpers.Hashing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dynamic_IP_Address_Service_Server.Helpers.Hashing.DAL.Tests
{
    [TestFixture()]
    public class SaltedHashTests
    {
        [Test()]
        public void SaltedHashTest()
        {
            SaltedHash saltedHash = new SaltedHash("1234");
            Assert.NotNull(saltedHash.Salt);
            Assert.NotNull(saltedHash.Hash);
        }

        [Test()]
        public void VerifyTest()
        {
            SaltedHash saltedHash = new SaltedHash("123456789");
            Assert.AreEqual(SaltedHash.Verify("987654321", saltedHash.Hash, saltedHash.Salt), false);
            Assert.AreEqual(SaltedHash.Verify("123456789", saltedHash.Hash, saltedHash.Salt), false);
        }
    }
}