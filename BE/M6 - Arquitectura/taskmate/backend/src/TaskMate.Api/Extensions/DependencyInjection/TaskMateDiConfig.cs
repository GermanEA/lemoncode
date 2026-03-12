using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskMate.Application.Abstractions.Services;
using TaskMate.Application.Config;
using TaskMate.Application.Services;
using TaskMate.Domain.Abstractions;
using TaskMate.Domain.Abstractions.Repositories;
using TaskMate.Infrastructure.Jwt;
using TaskMate.Infrastructure.Persistence.EfCore.Context;
using TaskMate.Infrastructure.Persistence.EfCore.Repositories;
using TaskMate.Infrastructure.Time;

namespace TaskMate.Api.Extensions.DependencyInjection;

internal static class TaskMateDiConfig
{
    public static IServiceCollection AddTaskMateDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddPersistenceDependencies(configuration)
            .AddApplicationDependencies()
            .AddJwtAuthentication(configuration);

        return services;
    }

    private static IServiceCollection AddPersistenceDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<TaskMateDbContext>(options =>
            options.UseSqlServer(connectionString)
        );

        services.AddScoped<ITaskRepository, TaskRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }

    private static IServiceCollection AddApplicationDependencies(this IServiceCollection services)
    {
        services.AddScoped<ITaskAppService, TaskAppService>();
        services.AddScoped<IUserAppService, UserAppService>();
        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<IClock, SystemClock>();

        return services;
    }

    private static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtConfig>(configuration.GetSection(JwtConfig.ConfigSection));

        var jwtConfig = configuration.GetSection(JwtConfig.ConfigSection).Get<JwtConfig>()
            ?? throw new InvalidOperationException("Jwt configuration section is missing.");

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtConfig.Issuer,
                    ValidAudience = jwtConfig.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.SigningKey)),
                };
            });

        return services;
    }
}
