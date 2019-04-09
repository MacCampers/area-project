using System;
using System.Collections.Generic;
using System.Text;

namespace Area.Core.Models
{
    public class AboutJson
    {
        public class Client
        {
            public string host { get; set; }
        }

        public class Actions
        {
            public string name { get; set; }
            public string description { get; set; }
        }

        public class Reaction
        {
            public string name { get; set; }
            public string description { get; set; }
        }

        public class Service
        {
            public string name { get; set; }
            public List<Actions> actions { get; set; }
            public List<Reaction> reactions { get; set; }
        }

        public class Server
        {
            public int current_time { get; set; }
            public List<Service> services { get; set; }
        }

        public class AboutJsonResponse
        {
            public Client client { get; set; }
            public Server server { get; set; }
        }
    }
}
