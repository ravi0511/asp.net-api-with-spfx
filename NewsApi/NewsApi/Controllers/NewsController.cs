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
    public class TestClass {
        public string Title { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class NewsController : ControllerBase
    {
        private readonly NewsContext context;
        private readonly CurrentUser loggedOnEmployee;

        public NewsController(NewsContext context, CurrentUser loggedOnEmployee)
        {
            this.context = context;
            this.loggedOnEmployee = loggedOnEmployee;
        }

        [HttpGet]
        public ActionResult<List<News>> Get()
        {
            return context.News.Include(x => x.Author).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<News> GetArticle(Guid id)
        {
            return context.News.Include(x => x.Author).FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public ActionResult<News> AddNews([FromBody]Context.Model.News news)
        {
            news.Id = Guid.NewGuid();
            context.News.Add(news);
            context.SaveChanges();

            return CreatedAtAction("Get", news);
        }
    }
}
