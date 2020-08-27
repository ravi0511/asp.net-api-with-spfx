using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsApi.Context;
using NewsApi.Context.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace NewsApi.Tests
{
    public class ExampleXUnitTest
    {
        [Fact]
        public void ExampleTest()
        {
            DbContextOptions<NewsContext> options = new DbContextOptionsBuilder<NewsContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            Guid newsId = Guid.NewGuid();
            Guid authorId = Guid.NewGuid();

            using (NewsContext context = new NewsContext(options))
            {
                context.Employees.Add(new Context.Model.Employee()
                {
                    Id = authorId,
                    FullName = null
                });

                context.News.Add(new Context.Model.News()
                {
                    Id = newsId,
                    Article = null,
                    AuthorId = authorId,
                    Preamble = null,
                    Title = null
                });

                context.SaveChanges();
            }

            using (NewsContext context = new NewsContext(options))
            {
                CurrentUser currentUserInjection = new CurrentUser(authorId);
                var result = new Controllers.NewsController(context, currentUserInjection).Get();

                var okObjectResult = result as ActionResult<List<News>>;

                var resultObject = okObjectResult.Value as List<Context.Model.News>;

                Assert.Single(resultObject);

                Context.Model.News newsObject = resultObject.First();

                Assert.Equal(newsId, newsObject.Id);
                Assert.Equal(authorId, newsObject.AuthorId);
                Assert.Equal(authorId, newsObject.Author.Id);

                Assert.Null(newsObject.Article);
                Assert.Null(newsObject.Preamble);
                Assert.Null(newsObject.Title);
                Assert.Null(newsObject.Author.FullName);
            }
        }
    }
}
