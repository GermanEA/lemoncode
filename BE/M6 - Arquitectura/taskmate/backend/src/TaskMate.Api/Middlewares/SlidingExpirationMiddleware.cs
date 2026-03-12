using System.Diagnostics.CodeAnalysis;
using TaskMate.Application.Abstractions.Services;
using TaskMate.Domain.Abstractions;

namespace TaskMate.Api.Middlewares;

/// <summary>
/// Middleware that renews a JWT Bearer token when it has less than 1 minute remaining.
/// The refreshed token is returned in the <c>X-Refreshed-Token</c> response header.
/// </summary>
public class SlidingExpirationMiddleware
{
    private const string RefreshedTokenHeader = "X-Refreshed-Token";
    private const int RenewThresholdSeconds = 60;

    private readonly RequestDelegate _next;
    private readonly IJwtService _jwtService;
    private readonly IClock _clock;

    public SlidingExpirationMiddleware(RequestDelegate next, IJwtService jwtService, IClock clock)
    {
        _next = next;
        _jwtService = jwtService;
        _clock = clock;
    }

    public async Task Invoke(HttpContext context)
    {
        ArgumentNullException.ThrowIfNull(context);

        var authHeader = context.Request.Headers.Authorization.FirstOrDefault();
        if (authHeader is not null && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            var token = authHeader["Bearer ".Length..].Trim();
            if (TryRenew(token, out var newToken))
            {
                context.Response.Headers[RefreshedTokenHeader] = newToken;
            }
        }

        await _next(context).ConfigureAwait(false);
    }

    [SuppressMessage("Design", "CA1031:Do not catch general exception types",
        Justification = "If parsing fails we simply skip renewal without throwing.")]
    private bool TryRenew(string token, out string? newToken)
    {
        newToken = null;
        try
        {
            var parsed = _jwtService.ParseToken(token);
            var remaining = parsed.ExpiresAt - _clock.UtcNow;

            if (remaining > TimeSpan.Zero && remaining < TimeSpan.FromSeconds(RenewThresholdSeconds))
            {
                newToken = _jwtService.GenerateToken(parsed.UserId, parsed.Email, parsed.Name);
                return true;
            }

            return false;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
