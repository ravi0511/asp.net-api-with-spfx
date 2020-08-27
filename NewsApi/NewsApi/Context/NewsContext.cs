using Microsoft.EntityFrameworkCore;
using NewsApi.Context.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Context
{
    public class NewsContext : DbContext
    {
        public NewsContext(DbContextOptions<NewsContext> options) : base(options) {

        }

        public DbSet<News> News { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public void SeedDatabase()
        {
            SeedEmployees();

            News.Add(new News() {
                Id = Guid.NewGuid(),
                Title = "Zacco looking for new employees in India",
                Preamble = "Short text about Zacco emplo",
                Article = "",
                AuthorId = new Guid("187338bb-129b-4bae-9735-6b11c603246e"),
                PublishDate = new DateTime(2020, 01, 01)
            });
            SaveChanges();
        }

        private void SeedEmployees()
        {
            Employees.Add(new Employee()
            {
                Id = new Guid("187338bb-129b-4bae-9735-6b11c603246e"),
                FullName = "LoggedIn TestUser"
            });
        }
    }
}
