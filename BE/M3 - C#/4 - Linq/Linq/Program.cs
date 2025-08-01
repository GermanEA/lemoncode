using static System.Runtime.InteropServices.JavaScript.JSType;
using System;

namespace Linq
{
    internal class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Sex { get; set; }
        public double Temperature { get; set; }
        public int HeartRate { get; set; }
        public string Specialty { get; set; }
        public int Age { get; set; }

        public Patient(int id, string name, string lastname, string sex, double temperature, int heartRate, string specialty, int age) {
            Id = id;
            Name = name;
            Lastname = lastname;
            Sex = sex;
            Temperature = temperature;
            HeartRate = heartRate;
            Specialty = specialty;
            Age = age;
        }

    }
    internal class Program
    {
        private static void PrintResult(List<Patient> patients)
        {
            foreach (Patient patient in patients)
                Console.WriteLine($"Paciente: {patient.Name} {patient.Lastname}, Especialidad: {patient.Specialty}");
            Console.WriteLine();
        }

        static void Main(string[] args)
        {
            List<Patient> patients = new List<Patient>
            {
                new(1, "John", "Doe", "Male", 36.8, 80, "general medicine", 44),
                new(2, "Jane", "Doe", "Female", 36.8, 70, "general medicine", 43),
                new(3, "Junior", "Doe", "Male", 36.8, 90, "pediatrics", 8),
                new(4, "Mary", "Wien", "Female", 36.8, 120, "general medicine", 20),
                new(5, "Scarlett", "Somez", "Female", 36.8, 110, "general medicine", 30),
                new(6, "Brian", "Kid", "Male", 39.8, 80, "pediatrics", 11)
            };

            // 1 - Extraer la lista de pacientes que sean de la especialidad pediatrics y que tengan menos de 10 años.
            Console.WriteLine("1 - Extraer la lista de pacientes que sean de la especialidad pediatrics y que tengan menos de 10 años.");
            var result1 = patients.Where(x => x.Specialty == "pediatrics" && x.Age < 10).ToList();
            PrintResult(result1);

            // 2 - Queremos activar el protocolo de urgencia si hay algún paciente con ritmo cardíaco mayor que 100 o temperatura mayor a 39.
            Console.WriteLine("2 - Queremos activar el protocolo de urgencia si hay algún paciente con ritmo cardíaco mayor que 100 o temperatura mayor a 39.");
            bool result2 = patients.Any(x => x.HeartRate > 100 || x.Temperature > 39);
            Console.WriteLine($"¿Hay que activar el protocolo de seguridad? {(result2 ? "Sí" : "No")}");
            Console.WriteLine();

            // 3 - No podemos atender a todos los pacientes hoy por lo que vamos a crear una nueva coleccion y reasignar a los pacientes de pediatrics a general medicine.
            Console.WriteLine("3 - No podemos atender a todos los pacientes hoy por lo que vamos a crear una nueva coleccion y reasignar a los pacientes de pediatrics a general medicine.");
            var result3 = patients
                .Select(p => {
                    var copy = new Patient
                    (
                        p.Id,
                        p.Name,
                        p.Lastname,
                        p.Sex,
                        p.Temperature,
                        p.HeartRate,
                        p.Specialty == "pediatrics" ? "general medicine" : p.Specialty,
                        p.Age
                    );
                    return copy;
                })
                .ToList();
            PrintResult(result3);


            // 4 - Queremos conocer de una sola consulta el numero de pacientes que estan asignado a general medicine y a pediatrics.
            Console.WriteLine("4 - Queremos conocer de una sola consulta el numero de pacientes que estan asignado a general medicine y a pediatrics.");
            var result4 = patients
                .GroupBy(p => p.Specialty)
                .ToDictionary(g => g.Key, g => g.Count());

            foreach (var v in result4)
                Console.WriteLine($"{v.Key}: {v.Value}");

            Console.WriteLine();

            // 5 - Devuelve una lista nueva que por cada paciente se indique si tiene prioridad o no. Se tendrá prioridad si el ritmo cardiaco es mayor 100 o la temperatura es mayor a 39.
            Console.WriteLine("5 - Devuelve una lista nueva que por cada paciente se indique si tiene prioridad o no. Se tendrá prioridad si el ritmo cardiaco es mayor 100 o la temperatura es mayor a 39.");
            var result5 = patients
                .Select(p => new
                {
                    Paciente = p,
                    Prioridad = p.HeartRate > 100 || p.Temperature > 39
                })
                .ToList();

            result5.ForEach(p => Console.WriteLine($"{p.Paciente.Name} {p.Paciente.Lastname} - Prioridad: {(p.Prioridad ? "Sí" : "No")}"));
            Console.WriteLine();

            // 6 - Queremos conocer de una sola consulta La edad media de pacientes asignados a pediatrics y general medicine.
            Console.WriteLine("6 - Queremos conocer de una sola consulta La edad media de pacientes asignados a pediatrics y general medicine.");
            var result6 = patients
                .Where(p => p.Specialty == "pediatrics" || p.Specialty == "general medicine")
                .GroupBy(p => p.Specialty)
                .ToDictionary(
                    g => g.Key,
                    g => g.Average(p => p.Age)
                );

            foreach (var v in result6)
                Console.WriteLine($"{v.Key}: {v.Value:F2} años");
        }
    }
}
