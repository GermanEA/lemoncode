interface Student {
  name: string;
  age: number;
  occupation: string;
}

const students: Student[] = [
  {
    name: "Luke Patterson",
    age: 32,
    occupation: "Internal auditor",
  },
  {
    name: "Emily Coleman",
    age: 25,
    occupation: "English",
  },
  {
    name: "Alexandra Morton",
    age: 35,
    occupation: "Conservation worker",
  },
  {
    name: "Bruce Willis",
    age: 39,
    occupation: "Placement officer",
  },
];

// Partial<Student>: los mismos campos que Student, pero todos opcionales
type StudentCriteria = Partial<Student>;

const matchesCriteria = (student: Student, criteria: StudentCriteria): boolean => {
  const fieldNames = Object.keys(criteria) as (keyof Student)[];
  return fieldNames.every((fieldName) => student[fieldName] === criteria[fieldName]);
};

const filterStudentsBy = (students: Student[], criteria: StudentCriteria): Student[] => {
  return students.filter((student) => matchesCriteria(student, criteria));
};

const logStudent = ({ name, occupation }: Student) => {
  console.log(`  - ${name}, ${occupation}`);
};

console.log("Students of age 35:");
filterStudentsBy(students, { age: 35 }).forEach(logStudent);

export {};
