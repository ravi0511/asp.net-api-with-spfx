using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsApi.Context;
using NewsApi.Context.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.AspNetCore.Authorization;

namespace NewsApi.Controllers
{
    [Route("api/user/[controller]")]
    [ApiController]
    // [Authorize]
    public class EmployeeDetailsController : ControllerBase
    {
        private readonly EmployeeContext context;
        private readonly CurrentUser loggedOnEmployee;

        public EmployeeDetailsController(EmployeeContext context, CurrentUser loggedOnEmployee)
        {
            this.context = context;
            this.loggedOnEmployee = loggedOnEmployee;
        }

        [HttpGet]
        public ActionResult<List<EmployeeDetails>> Get()
        {
            // return context.EmployeeDetails.Include(x => x.Author).ToList();
            return context.EmployeeDetails.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<EmployeeDetails> GetArticle(Guid id)
        {
            return context.EmployeeDetails.FirstOrDefault(x => x.Id == id);
            // return context.EmployeeDetails.Include(x => x.Author).FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public ActionResult<EmployeeDetails> AddNews([FromBody]Context.Model.EmployeeDetails emplyees)
        {
            emplyees.Id = Guid.NewGuid();
            context.EmployeeDetails.Add(emplyees);
            context.SaveChanges();

            return CreatedAtAction("Get", emplyees);
        }
    }
}
