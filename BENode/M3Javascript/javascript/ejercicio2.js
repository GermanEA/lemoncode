const elements = ["lorem", "ipsum", "dolor", "sit", "amet"];
const index = 2;
const newValue = "furor";

const replaceAt = (arr, index, newElement) => {
  const elementsBefore = arr.slice(0, index);
  const elementsAfter = arr.slice(index + 1);

  return [...elementsBefore, newElement, ...elementsAfter];
};

const result = replaceAt(elements, index, newValue);
console.log(result === elements); // false
console.log(result); // ['lorem', 'ipsum', 'furor', 'sit', 'amet']
console.log(elements); // ['lorem', 'ipsum', 'dolor', 'sit', 'amet'] (sin mutar)
