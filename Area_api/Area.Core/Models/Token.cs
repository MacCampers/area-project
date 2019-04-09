using System;
using System.Collections.Generic;
using System.Text;

namespace Area.Core.Models
{
   public class Token
    {
        public string UserId { get; set; }
        public string JWTtoken { get; set; }
        public string CreationDate { get; set; }
        public int ExpiryTime { get; set; }
        public string ExpiryDate { get; set; }
    }
}
