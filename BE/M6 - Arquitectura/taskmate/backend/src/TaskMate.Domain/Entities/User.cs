using System.Net.Mail;

namespace TaskMate.Domain.Entities;

/// <summary>
/// Represents a user of the system.
/// </summary>
public class User
{
    /// <summary>
    /// Gets the unique identifier of the user.
    /// </summary>
    public Guid Id { get; private set; }

    /// <summary>
    /// Gets the name of the user.
    /// </summary>
    public string Name { get; private set; }

    /// <summary>
    /// Gets the email address of the user.
    /// </summary>
    public string Email { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="User"/> class.
    /// </summary>
    /// <param name="name">The name of the user.</param>
    /// <param name="email">The email address of the user.</param>
    public User(string name, string email)
        : this(Guid.NewGuid(), name, email)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="User"/> class.
    /// </summary>
    /// <param name="id">The unique identifier for the user. If null, a new GUID will be generated.</param>
    /// <param name="name">The name of the user. Cannot be null or empty.</param>
    /// <param name="email">The email address of the user. Cannot be null or empty.</param>
    /// <exception cref="ArgumentNullException">Thrown when <paramref name="name"/> or <paramref name="email"/> is null.</exception>
    /// <exception cref="ArgumentException">Thrown when <paramref name="email"/> has an invalid format.</exception>
    public User(Guid? id, string name, string email)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);
        try
        {
            _ = new MailAddress(email);
        }
        catch (FormatException)
        {
            throw new ArgumentException("Invalid email format.", nameof(email));
        }

        Id = id ?? Guid.NewGuid();
        Name = name;
        Email = email;
    }
}
