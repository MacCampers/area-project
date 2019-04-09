using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Area.Core.Data;
using GraphQL.Types;

namespace Area.Api.Models
{
    public class AreaMutation : ObjectGraphType<string>
    {
        ///<summary>
        ///     Global Mutation object that handles all objects on which add/update/delete db or create token, DAL receveied by DI
        ///     <paramref name="_areaRepository"/>
        /// </summary>
        public AreaMutation(IAreaRepository _areaRepository)
        {
            Name = "Mutation";
            Description = "All available Mutation requests to insert/update/delete data (Notifications, Replies, Tags, ...) or create user tokens";

            #region Souscription
            Field<SouscriptionType>(
                "addSouscription",
                description: "Add a User Souscription",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "applet_id" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "user_id" },
                    new QueryArgument<StringGraphType> { Name = "city" },
                    new QueryArgument<StringGraphType> { Name = "streamer" },
                    new QueryArgument<StringGraphType> { Name = "fb_token" },
                    new QueryArgument<StringGraphType> { Name = "fb_id" },
                    new QueryArgument<StringGraphType> { Name = "twitter_token" },
                    new QueryArgument<StringGraphType> { Name = "twitter_secret" }
                    ),
                resolve: context =>
                {
                    var idApplet = context.GetArgument<int>("applet_id");
                    var idUser = context.GetArgument<string>("user_id");
                    var city = context.GetArgument<string>("city");
                    var streamer = context.GetArgument<string>("streamer");
                    var fbToken = context.GetArgument<string>("fb_token");
                    var fbIdPage = context.GetArgument<string>("fb_id");
                    var twitterToken = context.GetArgument<string>("twitter_token");
                    var twitterSecret = context.GetArgument<string>("twitter_secret");
                    return _areaRepository.AddSouscription(idApplet, idUser, city, streamer, fbToken, fbIdPage, twitterToken, twitterSecret);
                }
                );

            Field<BooleanGraphType>(
            "removeSouscription",
            description: "Remove a User Souscription",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "applet_id" },
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "user_id" }
                ),
            resolve: context =>
            {
                var idApplet = context.GetArgument<int>("applet_id");
                var idUser = context.GetArgument<string>("user_id");
                return _areaRepository.RemoveSouscription(idApplet, idUser);
            }
            );
            #endregion
        }
    }
}
