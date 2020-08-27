using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Context.Model
{
    public class News
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Preamble { get; set; }

        public string Article { get; set; }

        public Employee Author { get; set; }

        public Guid AuthorId { get; set; }

        public DateTime PublishDate {get; set;}
    }
}
