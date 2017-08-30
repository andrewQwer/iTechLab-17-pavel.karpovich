using System;

namespace Dynamic_IP_Address_Service_Server.DAL.Models.Error
{
    public class Error : Exception
    {
        private readonly string _message;

        public Error(string message) : base(message)
        {
            _message = message;
        }
    }
}