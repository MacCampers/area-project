using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Area.Api.Models;
using Area.Core.Data;
using Area.Data.EntityFramework;
using Area.Data.EntityFramework.Repositories;
using Area.Data.Seed;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using GraphiQl;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Area.Core.Models;
using Area.Api.AuthTokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Area.Api.Helpers;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using GraphQL;
using GraphQL.Types.Relay;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Area.Api.Extensions;
using AutoMapper;
using GraphQL.Relay.Types;
using GraphQL.Types;

namespace Area.Api
{
    public class Startup
    {
        private readonly SymmetricSecurityKey _signingKey;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("JwtAuth").GetValue<string>("SecretKey")));
        }

        /*public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            Env = env;
        }*/

        public IConfiguration Configuration { get; }
        private IHostingEnvironment Env { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // ---------------------------------------------------------------------//
            //                DBContext, UserManager, HttpContextAccessor           //
            // ---------------------------------------------------------------------//
            // GoLocalContext (db)
            services.AddDbContext<AreaContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("Area.Api"))
            );

            // UserManager
            services.AddScoped<UserManager<ApplicationUser>>();

            // HttpContextAccessor
            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();

            // ---------------------------------------------------------------//
            //                Authentication (Jwt, Identity, ...)             //
            // ---------------------------------------------------------------//
            //JwtFactory
            services.AddScoped<IJwtFactory, JwtFactory>();

            // Get options from app jwtAppSettingOptions
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            // tokenValidationParameters
            var tokenValidationParameters = new TokenValidationParameters
            {
                // Clock skew compensates for server time drift.
                ClockSkew = TimeSpan.Zero,

                // Ensure the token was issued by a trusted authorization server (default true):
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                // Ensure the token audience matches our audience value (default true):
                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                // Specify the key used to sign the token:
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                // Ensure the token hasn't expired:
                RequireExpirationTime = false,
                ValidateLifetime = true
            };

            // JwtBearerAuthentication middleware included in .NET Core
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // API user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
            });

            // IdentityCore builder
            var builder = services.AddIdentityCore<ApplicationUser>(o =>
            {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<AreaContext>().AddDefaultTokenProviders();

            // -------------------------------------------------------------------//
            //                Framework services (Jwt, Identity, ...)             //
            // -------------------------------------------------------------------//
            // FluentValidation (data validator)
            //services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            // MVC, AutoMapper
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddGitHubWebHooks();
            services.AddAutoMapper(typeof(Startup));

            // CORS (Cross-Orign Resource Sharing)
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder2 => builder2.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowAllOrigins"));
            });

            // ------------------------------------//
            //                GraphQL              //
            // ------------------------------------//
            // DocumenterExecuter, Dal
            services.AddScoped<IDocumentExecuter, DocumentExecuter>();
            services.AddTransient<IAreaRepository, AreaRepository>();

            // Types
            services.AddTransient<ApplicationUserType>();
            services.AddTransient<ServiceType>();
            services.AddTransient<AppletType>();
            services.AddTransient<SouscriptionType>();

            services.AddTransient(typeof(ConnectionType<>));
            services.AddTransient(typeof(EdgeType<>));
            services.AddTransient<NodeInterface>();
            services.AddTransient<PageInfoType>();

            // Query and Mutation
            services.AddTransient<AreaQuery>();
            services.AddTransient<AreaMutation>();

            // Schema
            var sp = services.BuildServiceProvider();
            services.AddTransient<ISchema>(_ => new AreaSchema(type => (GraphType)sp.GetService(type)) { Query = sp.GetService<AreaQuery>(), Mutation = sp.GetService<AreaMutation>() });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
                                ILoggerFactory loggerFactory, AreaContext db)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseExceptionHandler(
                builder =>
                {
                    builder.Run(
                              async context =>
                              {
                                  context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                                  context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                                  var error = context.Features.Get<IExceptionHandlerFeature>();
                                  if (error != null)
                                  {
                                      context.Response.AddApplicationError(error.Error.Message);
                                      await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                                  }
                              });
                });

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseGraphiQl();
            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCors("AllowAllOrigins");
            db.EnsureSeedData();
        }
    }
}
