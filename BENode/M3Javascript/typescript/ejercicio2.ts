interface Student {
  name: string;
  age: number;
  occupation: string;
}

interface Teacher {
  name: string;
  age: number;
  subject: string;
}

type User = Student | Teacher;

const users: User[] = [
  {
    name: "Luke Patterson",
    age: 32,
    occupation: "Internal auditor",
  },
  {
    name: "Jane Doe",
    age: 41,
    subject: "English",
  },
  {
    name: "Alexandra Morton",
    age: 35,
    occupation: "Conservation worker",
  },
  {
    name: "Bruce Willis",
    age: 39,
    subject: "Biology",
  },
];

const logUser = ({ name, age }: User) => {
  console.log(`  - ${name}, ${age}`);
};

users.forEach(logUser);

export {};
