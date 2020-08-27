using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Context.Model
{
    public class Employee
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }
    }
}
