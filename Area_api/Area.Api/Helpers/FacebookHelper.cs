using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Area.Api.Helpers
{
    public class FacebookHelper
    {
        public class Datum
        {
            public DateTime created_time { get; set; }
            public string message { get; set; }
            public string id { get; set; }
            public string story { get; set; }
        }

        public class Cursors
        {
            public string before { get; set; }
            public string after { get; set; }
        }

        public class Paging
        {
            public Cursors cursors { get; set; }
            public string next { get; set; }
        }

        public class FacebookResponse
        {
            public List<Datum> data { get; set; }
            public Paging paging { get; set; }
        }
    }
}
