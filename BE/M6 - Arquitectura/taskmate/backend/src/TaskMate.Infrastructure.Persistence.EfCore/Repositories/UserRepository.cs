using Microsoft.EntityFrameworkCore;
using TaskMate.Crosscutting;
using TaskMate.Domain.Abstractions.Repositories;
using TaskMate.Domain.Entities;
using TaskMate.Infrastructure.Persistence.EfCore.Context;
using TaskMate.Infrastructure.Persistence.EfCore.Extensions.Mappers;

namespace TaskMate.Infrastructure.Persistence.EfCore.Repositories;

/// <summary>
/// EF Core implementation of <see cref="IUserRepository"/>.
/// </summary>
public class UserRepository(TaskMateDbContext context) : RepositoryBase(context), IUserRepository
{
    private readonly TaskMateDbContext _context = context;

    /// <inheritdoc/>
    public async Task<Result<User>> GetUserByIdAsync(Guid userId)
    {
        var entity = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId)
            .ConfigureAwait(false);

        return entity is null
            ? ResultFactory.NotFound<User>($"Unable to find a user with Id {userId}.")
            : ResultFactory.Success(entity.ToDomain());
    }

    /// <inheritdoc/>
    public async Task<Result<User>> GetUserByEmailAsync(string email)
    {
        var entity = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email)
            .ConfigureAwait(false);

        return entity is null
            ? ResultFactory.NotFound<User>($"Unable to find a user with email {email}.")
            : ResultFactory.Success(entity.ToDomain());
    }

    /// <inheritdoc/>
    public async Task AddUserAsync(User user)
    {
        ArgumentNullException.ThrowIfNull(user);
        await _context.Users.AddAsync(user.ToDataEntity()).ConfigureAwait(false);
    }

    /// <inheritdoc/>
    public async Task<Result<bool>> UserExistsAsync(Guid userId)
    {
        var exists = await _context.Users.AnyAsync(u => u.Id == userId).ConfigureAwait(false);
        return ResultFactory.Success(exists);
    }

    /// <inheritdoc/>
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync().ConfigureAwait(false);
}
