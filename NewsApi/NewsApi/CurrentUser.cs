using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi
{
    public class CurrentUser
    {
        public CurrentUser(Guid userId)
        {
            UserId = userId;
        }

        public Guid UserId { get; private set; }
    }
}
