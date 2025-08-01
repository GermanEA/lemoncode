namespace Primero
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // No se controlan excepciones en este primer ejercicio
            Console.Write("Introduce tu nombre: ");
            string nombre = Console.ReadLine();

            Console.Write("Introduce tu edad: ");
            string edad = Console.ReadLine();

            Console.Write("Introduce el nombre de una ciudad: ");
            string ciudad = Console.ReadLine();

            Console.WriteLine($"Te llamas {nombre} y tienes {edad} años. Bienvenido a {ciudad}.");
        }
    }
}
