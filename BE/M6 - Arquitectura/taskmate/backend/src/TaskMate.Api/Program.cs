using TaskMate.Api.Extensions.DependencyInjection;
using TaskMate.Api.Handlers;
using TaskMate.Api.Middlewares;

namespace TaskMate.Api;

internal sealed class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Register all services
        builder.Services.AddTaskMateDependencies(builder.Configuration);

        // Exception handlers
        builder.Services.AddExceptionHandler<UnexpectedExceptionHandler>();
        builder.Services.AddProblemDetails();

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        var app = builder.Build();

        app.UseExceptionHandler();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseMiddleware<SlidingExpirationMiddleware>();

        app.MapControllers();

        app.Run();
    }
}
