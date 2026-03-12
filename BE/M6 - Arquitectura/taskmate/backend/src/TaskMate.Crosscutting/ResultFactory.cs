namespace TaskMate.Crosscutting;

/// <summary>
/// Factory class for creating <see cref="Result"/> and <see cref="Result{T}"/> instances.
/// </summary>
public static class ResultFactory
{
    /// <summary>
    /// Creates a successful <see cref="Result{T}"/> with the specified value.
    /// </summary>
    public static Result<T> Success<T>(T value) => new(value);

    /// <summary>
    /// Creates a successful <see cref="Result"/>.
    /// </summary>
    public static Result Success() => new();

    /// <summary>
    /// Creates a <see cref="Result"/> with a not found status.
    /// </summary>
    public static Result NotFound(string? errorMessage = null) => new(ResultStatus.NotFound, errorMessage);

    /// <summary>
    /// Creates a <see cref="Result{T}"/> with a not found status.
    /// </summary>
    public static Result<T> NotFound<T>(string? errorMessage = null) => new(ResultStatus.NotFound, errorMessage, default);

    /// <summary>
    /// Creates a <see cref="Result"/> with an invalid argument status.
    /// </summary>
    public static Result InvalidArgument(string? errorMessage = null) => new(ResultStatus.InvalidArguments, errorMessage);

    /// <summary>
    /// Creates a <see cref="Result{T}"/> with an invalid argument status.
    /// </summary>
    public static Result<T> InvalidArgument<T>(string? errorMessage) => new(ResultStatus.InvalidArguments, errorMessage);

    /// <summary>
    /// Creates a <see cref="Result"/> with a conflict status.
    /// </summary>
    public static Result Conflict(string? errorMessage) => new(ResultStatus.Conflict, errorMessage);

    /// <summary>
    /// Creates a <see cref="Result{T}"/> with a conflict status.
    /// </summary>
    public static Result<T> Conflict<T>(string? errorMessage) => new(ResultStatus.Conflict, errorMessage);

    /// <summary>
    /// Creates a <see cref="Result"/> with a forbidden status.
    /// </summary>
    public static Result Forbidden(string? errorMessage = null) => new(ResultStatus.Forbidden, errorMessage);

    /// <summary>
    /// Creates a <see cref="Result{T}"/> with a forbidden status.
    /// </summary>
    public static Result<T> Forbidden<T>(string? errorMessage = null) => new(ResultStatus.Forbidden, errorMessage);

    /// <summary>
    /// Propagates a failure from an existing <see cref="IResult"/> into a new <see cref="Result{T}"/>.
    /// </summary>
    public static Result<T> PropagateFailure<T>(IResult result)
    {
        EnsureIsValidToPropagate(result);
        return new Result<T>(result.Status, result.ErrorMessage);
    }

    /// <summary>
    /// Propagates a failure from an existing <see cref="IResult"/> into a new <see cref="Result"/>.
    /// </summary>
    public static Result PropagateFailure(IResult result)
    {
        EnsureIsValidToPropagate(result);
        return new Result(result.Status, result.ErrorMessage);
    }

    private static void EnsureIsValidToPropagate(IResult result)
    {
        ArgumentNullException.ThrowIfNull(result);

        if (result.IsSuccess)
        {
            throw new InvalidOperationException("This method should be used only with failure results.");
        }
    }
}
