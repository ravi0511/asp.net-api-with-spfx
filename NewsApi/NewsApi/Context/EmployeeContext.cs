using Microsoft.EntityFrameworkCore;
using NewsApi.Context.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Context
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options) {

        }

        public DbSet<EmployeeDetails> EmployeeDetails { get; set; }

        // public DbSet<Employee> Employees { get; set; }

        public void SeedDatabase()
        {
            // SeedEmployees();

            EmployeeDetails.Add(new EmployeeDetails() {
                Id = Guid.NewGuid(),
                FullName = "Employee 1",
                Department = "Department 1",
                Experience = "3 years"
            });
            SaveChanges();
        }

        // private void SeedEmployees()
        // {
        //     Employees.Add(new Employee()
        //     {
        //         Id = new Guid("187338bb-129b-4bae-9735-6b11c603246e"),
        //         FullName = "LoggedIn TestUser"
        //     });
        // }
    }
}
