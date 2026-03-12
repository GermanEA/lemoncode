namespace TaskMate.Crosscutting.Exceptions;

/// <summary>
/// Exception thrown when an operation result indicates failure.
/// </summary>
public class ResultFailureException : Exception
{
    /// <summary>
    /// Gets the result associated with the failure.
    /// </summary>
    public IResult Result { get; private set; } = new Result(ResultStatus.Unknown, "An error occurred while processing the request.");

    /// <summary>
    /// Initializes a new instance of the <see cref="ResultFailureException"/> class.
    /// </summary>
    public ResultFailureException()
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="ResultFailureException"/> class with a specified error message.
    /// </summary>
    public ResultFailureException(string? message) : base(message)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="ResultFailureException"/> class with a specified error message and inner exception.
    /// </summary>
    public ResultFailureException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="ResultFailureException"/> class with the specified result.
    /// </summary>
    public ResultFailureException(IResult result)
    {
        Result = result;
    }
}
