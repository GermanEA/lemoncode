using System.ComponentModel.DataAnnotations;
using TaskMate.Domain.Enums;

namespace TaskMate.Application.Dtos;

/// <summary>
/// Data Transfer Object for adding or updating a TaskItem.
/// </summary>
public class AddOrUpdateTaskItemDto
{
    /// <summary>
    /// Gets or sets the title of the task.
    /// </summary>
    [Required(ErrorMessage = "The title is required.")]
    [StringLength(200, ErrorMessage = "The title cannot exceed 200 characters.")]
    public string? Title { get; set; }

    /// <summary>
    /// Gets or sets the optional description of the task.
    /// </summary>
    [StringLength(1000, ErrorMessage = "The description cannot exceed 1000 characters.")]
    public string? Description { get; set; }

    /// <summary>
    /// Gets or sets the status of the task.
    /// </summary>
    [Required(ErrorMessage = "The status is required.")]
    public TaskItemStatus? Status { get; set; }

    /// <summary>
    /// Gets or sets the optional due date of the task.
    /// </summary>
    public DateTime? DueDate { get; set; }
}
