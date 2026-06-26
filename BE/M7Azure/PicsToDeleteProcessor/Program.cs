using System;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using Azure.Storage.Blobs;
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;

Console.WriteLine("Hello to the PicsToDeleteProcessor!");

// Use the connection string from the environment variable, fall back to Azurite (local development)
var connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING")
                       ?? "UseDevelopmentStorage=true";

// Instantiate a QueueClient to read the pics-to-delete queue
var queueClient = new QueueClient(connectionString, "pics-to-delete");
queueClient.CreateIfNotExists();

// Blob containers where the hero and alter ego images live
var blobServiceClient = new BlobServiceClient(connectionString);
var heroesContainer = blobServiceClient.GetBlobContainerClient("heroes");
var alterEgosContainer = blobServiceClient.GetBlobContainerClient("alteregos");

while (true)
{
    QueueMessage message = queueClient.ReceiveMessage();

    if (message == null)
    {
        Console.WriteLine("No messages. Let's wait 5 seconds.");
        Thread.Sleep(5000);
        continue;
    }

    try
    {
        // The API sends the message body encoded in base64
        var body = DecodeMessage(message.Body.ToString());
        Console.WriteLine($"Message received: {body}");

        var picsToDelete = JsonSerializer.Deserialize<PicsToDeleteMessage>(body);

        if (picsToDelete?.Name != null && picsToDelete.AlterEgo != null)
        {
            Console.WriteLine($"Deleting images for hero '{picsToDelete.Name}' and alter ego '{picsToDelete.AlterEgo}'");

            // Hero image lives in the "heroes" container
            DeleteBlobs(heroesContainer, picsToDelete.Name, new[] { ".jpeg", ".jpg", ".png" });

            // Alter ego image lives in the "alteregos" container
            DeleteBlobs(alterEgosContainer, picsToDelete.AlterEgo, new[] { ".png", ".jpeg", ".jpg" });
        }
        else
        {
            Console.WriteLine("Bad message. It does not contain a hero name and alter ego.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error processing message: {ex.Message}");
    }

    // Remove the message from the queue once it has been processed
    queueClient.DeleteMessage(message.MessageId, message.PopReceipt);
}

// Decodes the message body. The API sends it as base64; if it is not base64 we use it as-is.
static string DecodeMessage(string rawBody)
{
    try
    {
        return Encoding.UTF8.GetString(Convert.FromBase64String(rawBody));
    }
    catch (FormatException)
    {
        return rawBody;
    }
}

// Looks for the blob with the given name (normalized) and the candidate extensions, and deletes it if found.
static void DeleteBlobs(BlobContainerClient container, string name, string[] extensions)
{
    var fileName = name.Trim().ToLower().Replace(' ', '-');

    foreach (var extension in extensions)
    {
        var blobName = $"{fileName}{extension}";
        var blob = container.GetBlobClient(blobName);

        if (blob.Exists())
        {
            Console.WriteLine($"Deleting blob {container.Name}/{blobName}");
            blob.DeleteIfExists();
        }
    }
}

class PicsToDeleteMessage
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("alterEgo")]
    public string? AlterEgo { get; set; }
}
