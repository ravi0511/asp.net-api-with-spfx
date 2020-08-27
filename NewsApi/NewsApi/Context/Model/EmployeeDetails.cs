using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Context.Model
{
    public class EmployeeDetails
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }

        public string Department {get; set;}

        public string Experience {get; set;}
    }
}
