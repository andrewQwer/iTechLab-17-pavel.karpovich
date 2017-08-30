using Dynamic_IP_Address_Service_Server.Helpers.Hashing;
using NUnit.Framework;

namespace Dynamic_IP_Address_Service_Server.Test.Helpers.Hashing
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
            Assert.AreEqual(false, SaltedHash.Verify("987654321", saltedHash.Hash, saltedHash.Salt));
            Assert.AreEqual(true, SaltedHash.Verify("123456789", saltedHash.Hash, saltedHash.Salt));
        }
    }
}