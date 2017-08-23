﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dynamic_IP_Address_Service_Server.DAL.Context;
using Dynamic_IP_Address_Service_Server.DAL.Models;

namespace Dynamic_IP_Address_Service_Server.DAL.Repositories
{
    public interface IUserRepository
    {
        bool CheckForUniq(User user);
    }

    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(IEntityContext dbContext) : base(dbContext)
        {
        }


        public bool CheckForUniq(User user)
        {
            return GetAll().Count(i => i.Login == user.Login || i.Email == user.Email) == 0;
        }
    }
}
