using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Area.Api.Models;
using Area.Data.EntityFramework;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Area.Api.Controllers
{
    [Route("graphql")]
    [Authorize(Policy = "ApiUser")]
    [EnableCors("AllowAllOrigins")]
    public class GraphQLController : Controller
    {
        private readonly IDocumentExecuter _documentExecuter;
        private readonly ISchema _schema;
        private readonly ILogger _logger;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="documentExecuter"></param>
        /// <param name="schema"></param>
        /// <param name="logger"></param>
        /// <param name="userManager"></param>
        /// <param name="jwtFactory"></param>
        /// <param name="jwtOptions"></param>
        /// <param name="httpContextAccessor"></param>
        /// <param name="goLocalCtx"></param>
        public GraphQLController(IDocumentExecuter documentExecuter, ISchema schema, ILogger<GraphQLController> logger)
        {
            _documentExecuter = documentExecuter;
            _schema = schema;
            _logger = logger;
        }

        /// <summary>
        ///     Get HttpRequest to display the inegrated GraphiQL view
        /// </summary>
        [HttpGet]
        public IActionResult Index()
        {
            _logger.LogInformation("Got request for GraphiQL. Sending GUI back");
            return View();
        }

        /// <summary>
        ///     GoLocal Queries
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GraphQLQuery query)
        {
            if (query == null) { throw new ArgumentNullException(nameof(query)); }

            var executionOptions = new ExecutionOptions
            {
                Schema = _schema,
                Query = query.Query,
                OperationName = query.OperationName,
                Inputs = query.Variables.ToInputs(),
            };

            try
            {
                var result = await _documentExecuter.ExecuteAsync(executionOptions).ConfigureAwait(false);
                _logger.LogDebug("GraphQL result query: {result}", JsonConvert.SerializeObject(result.Query));

                if (result.Errors?.Count > 0)
                {
                    _logger.LogError("GraphQL errors: {0}", result.Errors);
                    return BadRequest(result);
                }

                _logger.LogDebug("GraphQL execution result: {result}", JsonConvert.SerializeObject(result.Data));
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Document executer exception", ex);
                return BadRequest(ex);
            }
        }
    }
}