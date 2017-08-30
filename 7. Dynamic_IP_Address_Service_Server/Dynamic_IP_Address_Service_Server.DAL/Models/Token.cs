using Dynamic_IP_Address_Service_Server.DAL.Models.Common;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Dynamic_IP_Address_Service_Server.DAL.Models
{
    public class Token : Entity
    {
        [JsonProperty("token")]
        [Required]
        [MaxLength(128)]
        public string AuthToken { get; set; }

        [JsonProperty("owner")]
        public virtual User User { get; set; }

        public Token(string authToken, User user)
        {
            AuthToken = authToken;
            User = user;
        }

        public Token()
        {
        }
    }
}