// Recibe dos valores de cualquier tipo y los devuelve en orden inverso,
// conservando el tipo de cada uno en su nueva posición
const swap = <First, Second>(first: First, second: Second): [Second, First] => {
  return [second, first];
};

let age: number, occupation: string;

[occupation, age] = swap(39, "Placement officer");
console.log("Occupation: ", occupation);
console.log("Age: ", age);

export {};
