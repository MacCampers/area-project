using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Area.Core.Models;
using Area.Core.Data;

namespace Area.Api.Models
{
    public class AppletType : ObjectGraphType<Applet>
    {
        public AppletType(IAreaRepository _areaRepository)
        {
            Name = "Applet";
            Description = "Area's Applet";

            Field(x => x.Id).Description("Id of the applet");
            Field(x => x.description).Description("description of the applet's action");
            Field(x => x.IdServiceIn).Description("id of the base service");
            Field<ServiceType>(
                "serviceIn",
                description: "Area's service \"input\"",
                resolve: context =>
                {
                    var idServiceIn = context.Source.IdServiceIn;
                    return _areaRepository.GetService(idServiceIn);
                }
                );
            Field(x => x.IdServiceOut).Description("id of the \"output\" service");
            Field<ServiceType>(
            "serviceOut",
            description: "Area's service \"output\"",
            resolve: context =>
            {
                var idServiceOut = context.Source.IdServiceOut;
                return _areaRepository.GetService(idServiceOut);
            }
            );
        }
    }
}
