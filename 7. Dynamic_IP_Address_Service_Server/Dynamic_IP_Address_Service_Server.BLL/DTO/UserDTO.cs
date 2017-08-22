using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Dynamic_IP_Address_Service_Server.BLL.DTO
{
    public class UserDTO
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsInBin { get; set; }
        public string Salt { get; set; }
        public string Hash { get; set; }
    }
}