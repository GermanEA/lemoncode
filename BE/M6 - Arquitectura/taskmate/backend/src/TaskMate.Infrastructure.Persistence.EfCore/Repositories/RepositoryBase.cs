using Microsoft.EntityFrameworkCore;

namespace TaskMate.Infrastructure.Persistence.EfCore.Repositories;

/// <summary>
/// Base class for repository implementations, providing common functionality.
/// </summary>
public abstract class RepositoryBase(DbContext context)
{
    private const string InMemoryDBProviderName = "Microsoft.EntityFrameworkCore.InMemory";

    /// <summary>
    /// Determines if the current database provider is an in-memory database.
    /// </summary>
    protected bool IsInMemoryDb() =>
        context.Database.ProviderName?.Equals(InMemoryDBProviderName, StringComparison.Ordinal) ?? false;
}
