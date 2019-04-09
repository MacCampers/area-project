using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Area.Core.Models
{
    public class ApplicationUser : IdentityUser<string>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class ApplicationRole : IdentityRole
    {

        [Column(TypeName = "varchar(255)")]
        [StringLength(255)]
        public string NormalizedName { get; set; }

        public string DisplayName { get; set; }

        public ApplicationRole() : base() { }
        public ApplicationRole(string name) : base(name) { }
    }

    public class ApplicationUserLogin : IdentityUserLogin<string>
    {
        [Column(TypeName = "varchar(255)")]
        [StringLength(255)]
        public string ProviderDisplayName { get; set; }

        public ApplicationUserLogin() : base() { }
    }
}
