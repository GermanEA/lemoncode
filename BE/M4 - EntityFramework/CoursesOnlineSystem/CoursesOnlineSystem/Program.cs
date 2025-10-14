namespace CoursesOnlineSystem
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(Environment.GetEnvironmentVariable("MYAPP_CONNECTION_STRING"));
        }
    }
}
