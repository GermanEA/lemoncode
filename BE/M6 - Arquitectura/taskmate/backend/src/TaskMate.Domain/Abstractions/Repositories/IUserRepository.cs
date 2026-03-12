using TaskMate.Crosscutting;
using TaskMate.Domain.Entities;

namespace TaskMate.Domain.Abstractions.Repositories;

/// <summary>
/// Interface for user repository operations.
/// </summary>
public interface IUserRepository
{
    /// <summary>
    /// Gets a user by its identifier asynchronously.
    /// </summary>
    Task<Result<User>> GetUserByIdAsync(Guid userId);

    /// <summary>
    /// Gets a user by email asynchronously.
    /// </summary>
    Task<Result<User>> GetUserByEmailAsync(string email);

    /// <summary>
    /// Adds a new user asynchronously.
    /// </summary>
    Task AddUserAsync(User user);

    /// <summary>
    /// Checks whether a user exists by its identifier asynchronously.
    /// </summary>
    Task<Result<bool>> UserExistsAsync(Guid userId);

    /// <summary>
    /// Saves changes to the repository asynchronously.
    /// </summary>
    Task SaveChangesAsync();
}
