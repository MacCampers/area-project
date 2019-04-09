using Area.Api.AuthTokens;
using Area.Core.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Area.Api.Helpers
{
    public class Tokens
    {
        /// <summary>
        ///     Generate a JWT Token serialized in String format for a username with ClaimsIdentity
        /// </summary>
        /// <param name="identity"></param>
        /// <param name="jwtFactory"></param>
        /// <param name="userName"></param>
        /// <param name="jwtOptions"></param>
        /// <param name="serializerSettings"></param>
        /// <returns>JSON token</returns>
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            return JsonConvert.SerializeObject(response, serializerSettings);
        }

        /// <summary>
        ///     Generate a JWT Token not serialized in a Token object format (see class Token) for a username with ClaimsIdentity
        /// </summary>
        /// <param name="identity"></param>
        /// <param name="jwtFactory"></param>
        /// <param name="userName"></param>
        /// <param name="jwtOptions"></param>
        /// <param name="serializerSettings"></param>
        /// <returns>Token</returns>
        public static async Task<Token> GenerateJwtDeserializedToken(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            Token deserializedToken = new Token
            {
                UserId = response.id,
                JWTtoken = "Bearer " + response.auth_token,
                CreationDate = DateTime.Now.ToString(),
                ExpiryTime = response.expires_in,
                ExpiryDate = DateTime.Now.AddSeconds(response.expires_in).ToString()
            };

            return deserializedToken;
        }
    }
}
