namespace TaskMate.Application.Dtos;

/// <summary>
/// Data Transfer Object for User.
/// </summary>
public class UserDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public UserDto(Guid id, string name, string email)
    {
        Id = id;
        Name = name;
        Email = email;
    }
}
