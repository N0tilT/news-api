//using JwtAuthenticationManager;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHealthChecks();
builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("ocelot.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.AddOcelot(builder.Configuration);
//builder.Services.AddCustomJwtAuthentication(builder.Configuration);

var app = builder.Build();
app.MapHealthChecks("/healthz");

//app.UseAuthentication();
//app.UseAuthorization();
var configuration = new OcelotPipelineConfiguration
{
    AuthenticationMiddleware = async (context, next) =>
    {
        await next.Invoke();
    },
    AuthorizationMiddleware= async (context, next) =>
    {
        await next.Invoke();
    },
    PreErrorResponderMiddleware = async (context, next) =>
    {
        await next.Invoke();
    }
};
await app.UseOcelot(configuration);

app.Run();
