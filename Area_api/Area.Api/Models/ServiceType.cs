using Area.Core.Models;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Area.Api.Models
{
    public class ServiceType : ObjectGraphType<Service>
    {
        public ServiceType()
        {
            Name = "Service";
            Description = "Area's description";

            Field(x => x.Id).Description("Id of the service");
            Field(x => x.Name).Description("Name of the service");
        }
    }
}
