namespace Quinto
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Introduce la cantidad de números aleatorios: ");


            string number = Console.ReadLine();

            try
            {
                int n = int.Parse(number);
                int[] numeros = new int[n];
                Random rnd = new Random();

                for (int i = 0; i < n; i++)
                {
                    numeros[i] = rnd.Next(1, 1000);
                }

                Console.WriteLine(string.Join(", ", numeros));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"No has insertado un número entero {ex.ToString()}");
            }
        }
    }
}
