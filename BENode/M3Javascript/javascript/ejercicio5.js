const isTruthy = (value) => Boolean(value);

// typeof null también es "object", por eso se descarta aparte
const isObject = (value) => typeof value === "object" && value !== null;

const compactArray = (array) => array.filter(isTruthy);

const compactObject = (object) => {
  const properties = Object.entries(object);
  const truthyProperties = properties.filter(([key, value]) => isTruthy(value));
  return Object.fromEntries(truthyProperties);
};

const compact = (arg) => {
  if (Array.isArray(arg)) return compactArray(arg);
  if (isObject(arg)) return compactObject(arg);
  return arg;
};

console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log(compact({})); // {}
console.log(compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // { name: "cloud" }
