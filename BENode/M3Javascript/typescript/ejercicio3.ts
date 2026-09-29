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

// Versión con guarda `in`
const logUser = (user: User) => {
  let extraInfo: string;
  if ("occupation" in user) {
    extraInfo = user.occupation;
  } else {
    extraInfo = user.subject;
  }
  console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};

console.log("logUser:");
users.forEach(logUser);

// Extra: guardas de tipo con `is`
const isStudent = (user: User): user is Student => "occupation" in user;

const isTeacher = (user: User): user is Teacher => "subject" in user;

const logPerson = (user: User): void => {
  let extraInfo = "";
  if (isStudent(user)) extraInfo = user.occupation;
  if (isTeacher(user)) extraInfo = user.subject;
  console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};

console.log("logPerson:");
users.forEach(logPerson);

export {};
