using System.ComponentModel.DataAnnotations;

namespace TaskMate.Application.Dtos;

/// <summary>
/// Data Transfer Object for requesting an authentication token.
/// </summary>
public class AuthTokenRequestDto
{
    [Required(ErrorMessage = "The email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "The name is required.")]
    [StringLength(200, ErrorMessage = "The name cannot exceed 200 characters.")]
    public string? Name { get; set; }
}
