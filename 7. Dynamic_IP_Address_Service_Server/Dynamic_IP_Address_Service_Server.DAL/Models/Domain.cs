using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Models.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Dynamic_IP_Address_Service_Server.DAL.Models
{
    public class Domain : Entity
    {
        [JsonProperty("ip")]
        [Required]
        [MaxLength(15), MinLength(6)]
        public string Ip { get; set; }

        [JsonProperty("domain")]
        [Required]
        [MinLength(4), MaxLength(128)]
        public string DomainName { get; set; }

        [JsonProperty("owner")]
        public virtual User User { get; set; }

        public Domain(string ip, string domainName, User user)
        {
            Ip = ip;
            DomainName = domainName;
            User = user;
        }

        public Domain(string ip, string domainName)
        {
            Ip = ip;
            DomainName = domainName;
        }

        public Domain()
        {
        }
    }
}