using Microsoft.AspNetCore.Mvc;
using TaskMate.Crosscutting;
using IResult = TaskMate.Crosscutting.IResult;

namespace TaskMate.Api.Extensions;

/// <summary>
/// Extension methods to map Result and Result&lt;T&gt; to IActionResult.
/// </summary>
internal static class ResultExtensions
{
    /// <summary>
    /// Converts a <see cref="Result"/> to an <see cref="IActionResult"/>.
    /// </summary>
    public static IActionResult ToActionResult(this Result result, Func<IActionResult>? successFunc = null)
    {
        ArgumentNullException.ThrowIfNull(result);

        if (result.IsSuccess)
        {
            return successFunc != null ? successFunc() : new OkResult();
        }

        return result.ToErrorResult();
    }

    /// <summary>
    /// Converts a <see cref="Result{T}"/> to an <see cref="IActionResult"/>.
    /// </summary>
    public static IActionResult ToActionResult<T>(this Result<T> result, Func<T, IActionResult>? successFunc = null)
    {
        ArgumentNullException.ThrowIfNull(result);

        if (result.IsSuccess)
        {
            return successFunc != null
                ? successFunc(result.Value!)
                : new OkObjectResult(result.Value);
        }

        return result.ToErrorResult();
    }

    private static ObjectResult ToErrorResult(this IResult result)
    {
        return result.Status switch
        {
            ResultStatus.NotFound => new NotFoundObjectResult(result.ErrorMessage),
            ResultStatus.Conflict => new ConflictObjectResult(result.ErrorMessage),
            ResultStatus.InvalidArguments => new BadRequestObjectResult(result.ErrorMessage),
            ResultStatus.Forbidden => new ObjectResult(result.ErrorMessage) { StatusCode = StatusCodes.Status403Forbidden },
            _ => new ObjectResult(result.ErrorMessage) { StatusCode = StatusCodes.Status500InternalServerError },
        };
    }
}
