using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Area.Core.Models
{
    public class Applet
    {
        public int Id { get; set; }
        public string description { get; set; }
        [ForeignKey("Service")]
        public int IdServiceIn { get; set; }
        public virtual Service Service { get; set; }
        public int IdServiceOut { get; set; }
    }
}
