using GraphQL.Types;
using Area.Core.Models;
using Area.Core.Data;
using GraphQL.Relay.Types;

namespace Area.Api.Models
{
    public class AreaQuery : QueryGraphType
    {
        ///<summary>
        ///     Query object that handles all objects to request, DAL receveied by DI
        ///     <paramref name="_areaRepository"/>
        /// </summary>
        public AreaQuery(IAreaRepository _areaRepository)
        {
            Name = "Query";
            Description = "All available Query requests to get data (Markets, Point of Sales, Users, ...)";

            #region ApplicationUser
            Field<ApplicationUserType>(
                "getUser",
                description: "Area's User",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "Id of the User" }
                    ),
                resolve: context =>
                {
                    var IdUser = context.GetArgument<string>("id");
                    return _areaRepository.GetUser(IdUser);
                }
                );

            Field<ListGraphType<ApplicationUserType>>(
                "getUsers",
                description: "List of Users",
                resolve: context => _areaRepository.GetUsers()
                );

            Field<ApplicationUserType>(
                "getUserByName",
                description: "Get User by his username",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "username", Description = "Name of the User" }
                    ),
                resolve: context =>
                {
                    var UserName = context.GetArgument<string>("username");
                    return _areaRepository.GetUserByName(UserName);
                }
                );
            #endregion

            #region Service
            Field<ServiceType>(
                "getService",
                description: "Get the Service by Id",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id", Description = "Id of the service to retrieve" }
                    ),
                resolve: context =>
                {
                    var IdService = context.GetArgument<int>("id");
                    return _areaRepository.GetService(IdService);
                }
                );

            Field<ListGraphType<ServiceType>>(
                "getServices",
                description: "get the list of services",
                resolve: context => _areaRepository.GetServices()
                );
            #endregion

            #region Applet
            Field<AppletType>(
                "getApplet",
                description: "Get the applet by his id",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id", Description = "Id of the service to retrieve" }
                    ),
                resolve: context =>
                {
                    var IdApplet = context.GetArgument<int>("id");
                    return _areaRepository.GetApplet(IdApplet);
                }
                );

            Field<ListGraphType<AppletType>>(
                "getApplets",
                description: "Get Applet's list of Area",
                resolve: context => _areaRepository.GetApplets()
                );
            #endregion

            #region Souscription
            Field<SouscriptionType>(
                "getSouscription",
                description: "Get a souscription by his Id",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }
                    ),
                resolve: context =>
                {
                    var SouscriptionId = context.GetArgument<int>("id");
                    return _areaRepository.GetSouscription(SouscriptionId);
                }
                );

            Field<ListGraphType<SouscriptionType>>(
                "getSouscriptions",
                description: "Get a list of subscriptions",
                resolve: context => _areaRepository.GetSouscriptions()
                );

            Field<ListGraphType<SouscriptionType>>(
                "getSouscriptionByUserId",
                description: "Get list of souscriptions by UserId",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                    ),
                resolve: context =>
                {
                    var UserId = context.GetArgument<string>("id");
                    return _areaRepository.GetSouscriptionByUserId(UserId);
                }
                );
            #endregion
        }
    }
}