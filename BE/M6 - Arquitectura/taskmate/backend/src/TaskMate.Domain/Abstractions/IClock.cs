namespace TaskMate.Domain.Abstractions;

/// <summary>
/// Abstraction over system time to allow deterministic testing.
/// </summary>
public interface IClock
{
    /// <summary>Gets the current UTC time as <see cref="DateTime"/>.</summary>
    DateTime UtcNow { get; }

    /// <summary>Gets the current UTC time as <see cref="DateTimeOffset"/>.</summary>
    DateTimeOffset OffsetUtcNow { get; }
}
