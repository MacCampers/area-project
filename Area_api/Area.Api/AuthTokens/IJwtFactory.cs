using Area.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Area.Api.AuthTokens
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
        Task<Token> CreateApplicationUserToken(string username, string password);
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
    }
}
