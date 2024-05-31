using System.Diagnostics;
using System.Reflection;
using AuthService.Data;
using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Serilog;
using Serilog.Enrichers.Span;

var builder = WebApplication.CreateBuilder(args);

var serviceName = Assembly.GetCallingAssembly().GetName().Name ?? "Unknown";
var activitySource = new ActivitySource(serviceName); 

var zipkinUrl = Environment.GetEnvironmentVariable("ZIPKIN_CONNECTION_URL");

if (!String.IsNullOrEmpty(zipkinUrl))
{
    Sdk.CreateTracerProviderBuilder()
        .AddZipkinExporter(config => config.Endpoint = new Uri(zipkinUrl))
        .AddConsoleExporter()
        .AddSource(activitySource.Name)
        .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName: serviceName))
        .Build();
}
else
{
    Sdk.CreateTracerProviderBuilder()
        .AddConsoleExporter()
        .AddSource(activitySource.Name)
        .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName: serviceName))
        .Build();
}

var loggerBuilder = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .Enrich.WithSpan();

var seqUrl = Environment.GetEnvironmentVariable("SEQ_CONNECTION_URL");

if (!String.IsNullOrEmpty(seqUrl))
{
    loggerBuilder.WriteTo.Seq(seqUrl, batchPostingLimit: 10);
}

var logger = loggerBuilder.CreateLogger();

logger.Information("Service Name: {serviceName}", serviceName);
logger.Information("Zipkin Url: {zipkinUrl}", zipkinUrl);

builder.Logging.Services.AddSingleton(logger);


builder.Services.AddControllers();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AuthDbContext>(options =>
{
    if (!String.IsNullOrEmpty(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")))
    {
        options.UseSqlServer(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));
        Console.WriteLine(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));
    }
    else
    {
        options.UseInMemoryDatabase("Users");
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();