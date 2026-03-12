namespace TaskMate.Application.Dtos;

/// <summary>
/// Data Transfer Object for an authentication token response.
/// </summary>
public class AuthTokenResponseDto
{
    public string Token { get; set; }

    public AuthTokenResponseDto(string token)
    {
        Token = token;
    }
}
