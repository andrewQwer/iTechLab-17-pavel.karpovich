using Dynamic_IP_Address_Service_Server.DAL.Models.Common;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dynamic_IP_Address_Service_Server.DAL.Models
{
    public class Role : Entity
    {
        [JsonProperty("name")]
        [MinLength(2), MaxLength(64)]
        [Required]
        public string Name { get; set; }

        [JsonProperty("domainCount")]
        [Required]
        public int DomainCount { get; set; }

        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; }

        public Role(string name, int domainCount)
        {
            Name = name;
            DomainCount = domainCount;
        }

        public Role()
        {
        }
    }
}