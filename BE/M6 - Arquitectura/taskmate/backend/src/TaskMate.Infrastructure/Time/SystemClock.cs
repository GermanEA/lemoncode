using TaskMate.Domain.Abstractions;

namespace TaskMate.Infrastructure.Time;

/// <summary>
/// Production implementation of <see cref="IClock"/> using system time.
/// </summary>
public class SystemClock : IClock
{
    /// <inheritdoc/>
    public DateTime UtcNow => DateTime.UtcNow;

    /// <inheritdoc/>
    public DateTimeOffset OffsetUtcNow => DateTimeOffset.UtcNow;
}
