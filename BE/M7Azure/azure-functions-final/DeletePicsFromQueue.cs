using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace azure_functions
{
    public class DeletePicsFromQueue
    {
        // The QueueTrigger automatically decodes the base64 message sent by the API.
        [FunctionName("DeletePicsFromQueue")]
        public async Task Run(
            [QueueTrigger("pics-to-delete", Connection = "AzureStorageConnection")] string message,
            ILogger log)
        {
            log.LogInformation($"Processing message: {message}");

            var picsToDelete = JsonSerializer.Deserialize<PicsToDeleteMessage>(message);

            if (picsToDelete?.Name == null || picsToDelete.AlterEgo == null)
            {
                log.LogWarning("Bad message. It does not contain a hero name and alter ego.");
                return;
            }

            var blobServiceClient = new BlobServiceClient(System.Environment.GetEnvironmentVariable("AzureStorageConnection"));

            log.LogInformation($"Deleting images for hero '{picsToDelete.Name}' and alter ego '{picsToDelete.AlterEgo}'");

            // Hero image lives in the "heroes" container
            await DeleteBlobsAsync(blobServiceClient.GetBlobContainerClient("heroes"), picsToDelete.Name, new[] { ".jpeg", ".jpg", ".png" }, log);

            // Alter ego image lives in the "alteregos" container
            await DeleteBlobsAsync(blobServiceClient.GetBlobContainerClient("alteregos"), picsToDelete.AlterEgo, new[] { ".png", ".jpeg", ".jpg" }, log);
        }

        // Looks for the blob with the given name (normalized) and the candidate extensions, and deletes it if found.
        private static async Task DeleteBlobsAsync(BlobContainerClient container, string name, string[] extensions, ILogger log)
        {
            var fileName = name.Trim().ToLower().Replace(' ', '-');

            foreach (var extension in extensions)
            {
                var blobName = $"{fileName}{extension}";
                var blob = container.GetBlobClient(blobName);

                if (await blob.ExistsAsync())
                {
                    log.LogInformation($"Deleting blob {container.Name}/{blobName}");
                    await blob.DeleteIfExistsAsync();
                }
            }
        }
    }

    public class PicsToDeleteMessage
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("alterEgo")]
        public string AlterEgo { get; set; }
    }
}
