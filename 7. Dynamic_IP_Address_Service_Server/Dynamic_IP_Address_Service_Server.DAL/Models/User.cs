﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Models.Common;
using Dynamic_IP_Address_Service_Server.Helpers.Hashing;
using Newtonsoft.Json;

namespace Dynamic_IP_Address_Service_Server.DAL.Models
{
    public class User : Entity
    {
        [JsonProperty("login")]
        [Required]
        [MinLength(4), MaxLength(64)]
        public string Login { get; set; }

        [JsonProperty("email")]
        [Required]
        [MinLength(12), MaxLength(128)]
        public string Email { get; set; }

        [JsonProperty("firstName")]
        [Required]
        [MinLength(4), MaxLength(128)]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        [Required]
        [MinLength(4), MaxLength(128)]
        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        [JsonProperty("isInBin")]
        [Required]
        public bool IsInBin { get; set; }

        [JsonProperty("salt")]
        [Required]
        [MaxLength(128)]
        public string Salt { get; set; }

        [JsonProperty("hash")]
        [Required]
        [MaxLength(1024)]
        public string Hash { get; set; }

        [JsonProperty("role")]
        public virtual Role Role { get; set; }

        [JsonIgnore]
        public virtual ICollection<Domain> Domains { get; set; }

        [JsonIgnore]
        public virtual ICollection<Token> Tokens { get; set; }

        public User(string login, string email, string firstName, string lastName, string pass)
        {
            SaltedHash saltedHash = new SaltedHash(pass);
            Login = login;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            IsInBin = false;
            Salt = saltedHash.Salt;
            Hash = saltedHash.Hash;
        }

        public User()
        {
        }
    }
}