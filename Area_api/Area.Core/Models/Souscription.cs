using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Area.Core.Models
{
    public class Souscription
    {
        public int Id { get; set; }
        public int AppletId { get; set; }
        public string UserId { get; set; }
        public string City { get; set; }
        public string Streamer { get; set; }
        public string FbToken { get; set; }
        public string FbPageId { get; set; }
        public string TwitterToken { get; set; }
        public string TwitterSecret { get; set; }
    }
}
