using TaskMate.Application.Abstractions.Services;
using TaskMate.Application.Dtos;
using TaskMate.Application.Extensions.Mappers;
using TaskMate.Crosscutting;
using TaskMate.Domain.Abstractions.Repositories;
using TaskMate.Domain.Entities;

namespace TaskMate.Application.Services;

/// <summary>
/// Application service for managing users.
/// </summary>
public class UserAppService : IUserAppService
{
    private readonly IUserRepository _userRepository;

    public UserAppService(IUserRepository userRepository)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
    }

    public async Task<Result<UserDto>> GetOrCreateUserAsync(string email, string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(email);
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        var existingResult = await _userRepository.GetUserByEmailAsync(email).ConfigureAwait(false);
        if (existingResult.IsSuccess)
        {
            return ResultFactory.Success(existingResult.Value.ToDto());
        }

        var newUser = new User(name, email);
        await _userRepository.AddUserAsync(newUser).ConfigureAwait(false);
        await _userRepository.SaveChangesAsync().ConfigureAwait(false);
        return ResultFactory.Success(newUser.ToDto());
    }
}
