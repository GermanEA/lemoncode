namespace POO 

{ 
    internal class SlotMachine
    {
        private int coins;
        private Random random;

        public SlotMachine()
        {
            coins = 0;
            random = new Random();
        }

        public void Play()
        {
            coins++;
            bool r1 = random.Next(0, 2) == 1;
            bool r2 = random.Next(0, 2) == 1;
            bool r3 = random.Next(0, 2) == 1;

            Console.WriteLine($"Resultado: [{(r1 ? "true" : "false")}] [{(r2 ? "true" : "false")}] [{(r3 ? "true" : "false")}]");

            if (r1 && r2 && r3)
            {
                Console.WriteLine($"Congratulations!!!. You won {coins} coins!!");
                coins = 0;
            }
            else
            {
                Console.WriteLine("Good luck next time!!");
            }
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            SlotMachine machine = new SlotMachine();

            while (true)
            {
                Console.WriteLine("\n¿Quieres jugar? (s para jugar, cualquier otra tecla para salir):");
                string input = Console.ReadLine();
                if (input.ToLower() == "s")
                {
                    machine.Play();
                }
                else
                {
                    Console.WriteLine("¡Hasta la próxima!");
                    break;
                }
            }
        }
    }

}

