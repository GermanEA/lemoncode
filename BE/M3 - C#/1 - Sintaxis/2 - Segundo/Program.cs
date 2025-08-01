using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Segundo
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Introduce un primer número: ");
            string num1 = Console.ReadLine();

            Console.Write("Introduce un segundo número: ");
            string num2 = Console.ReadLine();

            try
            {
                float float1 = float.Parse(num1);
                float float2 = float.Parse(num2);
                if (float1 == float2)
                {
                    Console.WriteLine("Los números son iguales");
                }
                else
                {
                    float mayor = float1 > float2 ? float1 : float2;
                    Console.WriteLine($"El número {mayor} es el mayor.");
                }
            }
            catch (Exception ex) {
                Console.WriteLine($"No has insertado dos números: {ex}");
            }

            
        }
    }
}
