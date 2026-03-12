using Microsoft.AspNetCore.Mvc;
using TaskMate.Application.Abstractions.Services;
using TaskMate.Application.Dtos;

namespace TaskMate.Api.Controllers;

/// <summary>
/// Controller for authentication operations.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserAppService _userAppService;
    private readonly IJwtService _jwtService;

    /// <summary>
    /// Initializes a new instance of <see cref="AuthController"/>.
    /// </summary>
    public AuthController(IUserAppService userAppService, IJwtService jwtService)
    {
        _userAppService = userAppService ?? throw new ArgumentNullException(nameof(userAppService));
        _jwtService = jwtService ?? throw new ArgumentNullException(nameof(jwtService));
    }

    /// <summary>
    /// Issues a JWT token for the given email and name.
    /// Creates the user if it does not exist yet (mock auth — no password required).
    /// </summary>
    [HttpPost("token")]
    public async Task<IActionResult> GetToken([FromBody] AuthTokenRequestDto dto)
    {
        ArgumentNullException.ThrowIfNull(dto);

        var userResult = await _userAppService.GetOrCreateUserAsync(dto.Email!, dto.Name!).ConfigureAwait(false);
        if (!userResult.IsSuccess)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, userResult.ErrorMessage);
        }

        var user = userResult.Value;
        var token = _jwtService.GenerateToken(user.Id, user.Email, user.Name);

        return Ok(new AuthTokenResponseDto(token));
    }
}
