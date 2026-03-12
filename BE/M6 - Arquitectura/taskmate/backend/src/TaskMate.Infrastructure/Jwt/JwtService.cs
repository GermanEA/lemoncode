using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskMate.Application.Abstractions.Services;
using TaskMate.Application.Config;
using TaskMate.Application.Dtos;

namespace TaskMate.Infrastructure.Jwt;

/// <summary>
/// JWT implementation of <see cref="IJwtService"/>.
/// </summary>
public class JwtService : IJwtService
{
    private readonly IOptionsMonitor<JwtConfig> _jwtConfig;

    public JwtService(IOptionsMonitor<JwtConfig> jwtConfig)
    {
        _jwtConfig = jwtConfig ?? throw new ArgumentNullException(nameof(jwtConfig));
    }

    /// <inheritdoc/>
    public string GenerateToken(Guid userId, string email, string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(email);
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        var config = _jwtConfig.CurrentValue;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.SigningKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim(JwtRegisteredClaimNames.Name, name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer: config.Issuer,
            audience: config.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(config.ExpirationMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    /// <inheritdoc/>
    public ParsedTokenDto ParseToken(string token)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(token);

        var handler = new JwtSecurityTokenHandler();
        if (handler.ReadToken(token) is not JwtSecurityToken jwt)
        {
            throw new InvalidOperationException("Unable to deserialize the JWT token.");
        }

        var sub = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
        var email = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value;
        var name = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Name)?.Value;

        return new ParsedTokenDto
        {
            UserId = Guid.TryParse(sub, out var userId) ? userId : Guid.Empty,
            Email = email ?? string.Empty,
            Name = name ?? string.Empty,
            ExpiresAt = jwt.ValidTo,
        };
    }
}
