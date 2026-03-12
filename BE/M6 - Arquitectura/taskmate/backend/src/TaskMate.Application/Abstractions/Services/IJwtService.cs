using TaskMate.Application.Dtos;

namespace TaskMate.Application.Abstractions.Services;

/// <summary>
/// Interface for JWT token generation and parsing.
/// </summary>
public interface IJwtService
{
    /// <summary>
    /// Generates a JWT token for the given user.
    /// </summary>
    string GenerateToken(Guid userId, string email, string name);

    /// <summary>
    /// Parses a JWT token string and returns its relevant claims.
    /// </summary>
    ParsedTokenDto ParseToken(string token);
}
