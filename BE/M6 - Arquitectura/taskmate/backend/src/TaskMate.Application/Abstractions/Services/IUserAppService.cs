using TaskMate.Application.Dtos;
using TaskMate.Crosscutting;

namespace TaskMate.Application.Abstractions.Services;

/// <summary>
/// Interface for the user application service.
/// </summary>
public interface IUserAppService
{
    /// <summary>
    /// Gets an existing user by email or creates a new one if it does not exist.
    /// </summary>
    Task<Result<UserDto>> GetOrCreateUserAsync(string email, string name);
}
