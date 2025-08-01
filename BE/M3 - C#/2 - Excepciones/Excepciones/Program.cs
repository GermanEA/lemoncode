using static System.Runtime.InteropServices.JavaScript.JSType;
using System;

namespace Excepciones
{
    internal class Program
    {
        public class NumberRandomException : Exception { 
            public NumberRandomException(string message) : base(message) {
                Console.WriteLine(message);
            }
        }
        private static int Question(int count, int numberRandom, int numberTry, int maxNumber)
        {
            Console.Write($"Introduce un número del 1 al {maxNumber}, te quedan {numberTry - count} intentos para acertar: ");
            string number = Console.ReadLine();

            try
            {
                int n = int.Parse(number);

                if (n > numberRandom)
                {
                    count++;
                    Console.WriteLine("El número es más pequeño.");
                    throw new NumberRandomException("El número es más pequeño. Excepción.");
                }
                else if (n < numberRandom)
                {
                    count++;
                    Console.WriteLine("El número es más grande.");
                    throw new NumberRandomException("El número es más grande. Excepción.");
                }
                else
                {
                    count = numberTry;
                    Console.WriteLine("¡¡Has acertado el número!!");
                }
            }
            catch (NullReferenceException ex)
            {
                Console.WriteLine("No se puede introducir un valor nulo.");
            }
            catch (FormatException ex)
            {
                Console.WriteLine("El formato no es válido para un número entero.");
            }            

            return count;
        }

        static void Main(string[] args)
        {          
            Random rnd = new Random();
            int maxNumber = 20;
            int numberRandom = rnd.Next(0, maxNumber);
            int count = 0;
            int numberTry = 10;            

            do
            {
                count = Question(count, numberRandom, numberTry, maxNumber);
            }
            while (count < numberTry);
        }
    }
}
