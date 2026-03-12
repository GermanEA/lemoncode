namespace TaskMate.Application.Config;

/// <summary>
/// Configuration settings for JWT token generation and validation.
/// </summary>
public class JwtConfig
{
    public const string ConfigSection = "Jwt";

    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public string SigningKey { get; set; } = string.Empty;
    public int ExpirationMinutes { get; set; } = 60;
}
