using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dynamic_IP_Address_Service_Server.BLL.DTO
{
    public class EditDomainDTO
    {
        public string Id { get; set; }
        public string Domain { get; set; }
        public string Ip { get; set; }
    }
}