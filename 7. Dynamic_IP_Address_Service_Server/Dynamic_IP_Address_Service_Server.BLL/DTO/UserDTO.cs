using Dynamic_IP_Address_Service_Server.DAL.Models;
using Dynamic_IP_Address_Service_Server.Helpers.Hashing;

namespace Dynamic_IP_Address_Service_Server.BLL.DTO
{
    public class UserDTO
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsInBin { get; set; }
        public string Pass { get; set; }
        public string Hash { get; set; }
        public string Salt { get; set; }
        public Role Role { get; set; }

        public UserDTO(string login, string email, string firstName, string lastName, bool isInBin, string pass)
        {
            SaltedHash saltedHash = new SaltedHash(pass);
            Login = login;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            IsInBin = isInBin;
            Pass = pass;
            Hash = saltedHash.Hash;
            Salt = saltedHash.Salt;
            Role = new Role();
        }
    }
}