using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dynamic_IP_Address_Service_Server.DAL.Models.Error
{
    public static class ErrorConsts
    {
        public static Error REGISTRATION = new Error("Email or login unvalible");
        public static Error INCORRECT_LOGIN_OR_PASSWORD = new Error("Incorrect login or password");
        public static Error USER_NOT_FOUND = new Error("User not found");
        public static Error INTERNET_CONNECTION = new Error("Check out internet connection and re-try");
        public static Error DOMAIN_UNAVAILIBLE = new Error("This domain already use");
        public static Error DOMAIN_NOT_FOUND = new Error("Doamin not found");
    }
}