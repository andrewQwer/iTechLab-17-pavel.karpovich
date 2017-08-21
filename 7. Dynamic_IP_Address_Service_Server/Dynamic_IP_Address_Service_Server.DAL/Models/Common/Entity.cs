﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

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

        [JsonIgnore]
        public DateTime? ModifiedAt { get; set; }

        [JsonIgnore]
        [MaxLength(128)]
        public string ModifiedBy { get; set; }
    }
}
