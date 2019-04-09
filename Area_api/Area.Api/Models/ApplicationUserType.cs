using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Area.Core.Models;
using GraphQL.Types;

namespace Area.Api.Models
{
    public class ApplicationUserType : ObjectGraphType<ApplicationUser>
    {
        public ApplicationUserType()
        {
            Name = "User";
            Description = "Area's User";

            Field(x => x.Id).Description("Id of the User");
            Field(x => x.UserName).Description("Name of the User");
            Field(x => x.Email).Description("Mail of the User");
            Field(x => x.PhoneNumber).Description("Phone Number of the User");
            Field(x => x.NormalizedUserName).Description("Normalized Name of the User");
            Field(x => x.NormalizedEmail).Description("Normalized Mail of the User");
        }
    }
}
