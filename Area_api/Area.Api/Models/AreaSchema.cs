using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Area.Api.Models
{
    public class AreaSchema : Schema
    {
        public AreaSchema(Func<Type, GraphType> resolveType)
           : base(resolveType)
        {
            Query = (AreaQuery)resolveType(typeof(AreaQuery));
            Mutation = (AreaMutation)resolveType(typeof(AreaMutation));
        }
    }
}
