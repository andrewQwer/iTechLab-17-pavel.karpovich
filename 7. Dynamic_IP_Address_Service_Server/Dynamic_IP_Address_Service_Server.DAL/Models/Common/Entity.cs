using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dynamic_IP_Address_Service_Server.DAL.Models.Common
{
    public abstract class Entity
    {
        [JsonProperty("id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [JsonIgnore]
        public DateTime? CreatedAt { get; set; }

        [JsonIgnore]
        [MaxLength(128)]
        public string CreatedBy { get; set; }

        [JsonProperty("updateDate")]
        public DateTime? ModifiedAt { get; set; }

        [JsonIgnore]
        [MaxLength(128)]
        public string ModifiedBy { get; set; }
    }
}