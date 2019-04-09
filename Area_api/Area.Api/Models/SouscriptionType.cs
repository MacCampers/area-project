using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Area.Core.Models;
using GraphQL.Types;
using Area.Core.Data;

namespace Area.Api.Models
{
    public class SouscriptionType : ObjectGraphType<Souscription>
    {
        public SouscriptionType(IAreaRepository _areaRepository)
        {
            Name = "Souscription";
            Description = "User's souscription";

            Field(x => x.Id).Description("Id Souscription");
            Field(x => x.AppletId).Description("Id of the Service Subscription");
            Field<AppletType>(
                "applet",
                description: "subscription's applet",
                resolve: context =>
                {
                    var IdApplet = context.Source.AppletId;
                    return _areaRepository.GetApplet(IdApplet);
                }
                );
            Field(x => x.UserId).Description("Id of the Subscriber");
            Field<ApplicationUserType>(
                "User",
                description: "Subscriber",
                resolve: context =>
                {
                    var IdUser = context.Source.UserId;
                    return _areaRepository.GetUser(IdUser);
                }
                );
            Field(x => x.City, nullable: true).Description("Name of the City for weather service");
            Field(x => x.Streamer, nullable: true).Description("Name of the Streamer for Twitch service");
            Field(x => x.FbToken, nullable: true).Description("UserTokenFacebook");
            Field(x => x.FbPageId, nullable: true).Description("Id of the Facebook Page");
            Field(x => x.TwitterToken, nullable: true).Description("UserTokenTwitter");
            Field(x => x.TwitterSecret, nullable: true).Description("UserSecretTwitter");
        }
    }
}
