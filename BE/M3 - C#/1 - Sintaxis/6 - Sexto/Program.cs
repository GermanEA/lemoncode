namespace Sexto
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Introduce el número de filas: ");
            string row = Console.ReadLine();

            Console.Write("Introduce el carácter: ");
            char c = Console.ReadKey().KeyChar;
            Console.WriteLine();

            try
            {
                int n = int.Parse(row);

                for (int i = 1; i <= n; i++)
                {
                    if (i == 1)
                    {
                        Console.WriteLine(c);
                    }
                    else if (i == n)
                    {
                        for (int j = 0; j < n; j++)
                            Console.Write(c);
                        Console.WriteLine();
                    }
                    else
                    {
                        Console.Write(c);
                        for (int j = 1; j < i - 1; j++)
                            Console.Write(" ");
                        Console.WriteLine(c);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.ToString()}");
            }

        }
    }
}
