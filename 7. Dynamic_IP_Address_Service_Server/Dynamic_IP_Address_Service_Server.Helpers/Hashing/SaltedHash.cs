using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Dynamic_IP_Address_Service_Server.Helpers.Hashing
{
    public sealed class SaltedHash
    {
        private const uint SaltedLength = 64;

        public SaltedHash(string pass)
        {
            Salt = GenerateSalt(SaltedLength);
            Hash = ComputeHash(pass, Salt);
        }

        public string Hash { get; }
        public string Salt { get; }

        public static bool Verify(string pass, string hash, string salt)
        {
            var hashAttempt = ComputeHash(pass, hash);
            return hashAttempt == hash;
        }

        static string ComputeHash(string pass, string saltBase64)
        {
            var passBytes = Encoding.UTF8.GetBytes(pass);
            var saltBytes = Convert.FromBase64String(saltBase64);
            var passAndSaltBytes = passBytes.Concat(saltBytes).ToArray();

            using (var sha512 = SHA512.Create())
            {
                return Convert.ToBase64String(sha512.ComputeHash(passAndSaltBytes));
            }
        }

        string GenerateSalt(uint length)
        {
            var saltBytes = new byte[length];
            new Random().NextBytes(saltBytes);
            return Convert.ToBase64String(saltBytes);
        }
    }
}
