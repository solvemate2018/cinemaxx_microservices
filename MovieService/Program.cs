using System.Diagnostics;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using MovieService.Data;
using MovieService.integrations.RabbitMQ;
using MovieService.Services;
using MovieService.Services.DirectorsService;
using MovieService.Services.GenresService;
using MovieService.Services.MoviesService;
using MovieService.Utils;
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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
    opt.MapType<DateOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date",
        Example = new OpenApiString(DateTime.Today.ToString("yyyy-mm-dd"))
    }));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
    options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidIssuer = "auth-service",
            ValidateAudience = true,
            ValidAudience = "cinema-services",
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            LogValidationExceptions = true
        };
        if (!String.IsNullOrEmpty(Environment.GetEnvironmentVariable("JWT_SECRET_KEY")))
        {
            options.TokenValidationParameters.IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY")));
        }
        else
        {
            options.TokenValidationParameters.IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("some_default_value_that_can_be_used_when_nothing_is_seted"));
        }
    });

builder.Services.AddSingleton(activitySource);
builder.Services.AddScoped<IActorsService, ActorsService>();
builder.Services.AddScoped<IDirectorsService, DirectorsService>();
builder.Services.AddScoped<IGenresService, GenresService>();
builder.Services.AddScoped<IMoviesService, MoviesService>();

builder.Services.AddSingleton<RabbitMqBusFactory>();
builder.Services.AddScoped<RabbitMqProducer>();

builder.Services.AddDbContext<MovieServiceDbContext>(options =>
{
    if (!String.IsNullOrEmpty(Environment.GetEnvironmentVariable("SQL_SERVER_CONNECTION_STRING")))
    {
        options.UseSqlServer(Environment.GetEnvironmentVariable("SQL_SERVER_CONNECTION_STRING"));
        Console.WriteLine(Environment.GetEnvironmentVariable("SQL_SERVER_CONNECTION_STRING"));
    }
    else
    {
        options.UseInMemoryDatabase("Movies");
    }
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("ADMIN"));
});

builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();