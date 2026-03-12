namespace TaskMate.Application.Dtos;

/// <summary>
/// Holds the relevant claims extracted from a parsed JWT token.
/// </summary>
public class ParsedTokenDto
{
    public Guid UserId { get; init; }
    public string Email { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public DateTime ExpiresAt { get; init; }
}
