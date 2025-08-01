namespace Tercero
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<string> weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

            Console.Write("Dime un día de la semana: ");
            string name = Console.ReadLine();

            if (weekDays.Contains(name)) {
                if (name == weekDays[5] || name == weekDays[6]) {
                    Console.WriteLine($"{name} es fin de semana");
                }
                else
                {
                    Console.WriteLine($"{name} NO es fin de semana");
                }
            }
            else
            {
                Console.WriteLine($"{name} no es un día de la semana");
            }
        }
    }
}
