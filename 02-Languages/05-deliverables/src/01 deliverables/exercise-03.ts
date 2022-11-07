console.log("************** DELIVERABLE 03 *********************");

// Data
const x = {name: "Maria", surname: "Ibañez", country: "SPA", anidado: {name: "Luisa", age: 31, married: true}};
const a = {name: "Maria", surname: "Ibañez", country: "SPA"};
const b = {name: "Luisa", age: 31, married: true};

console.log("------------- CLONE -------------");
// Implementa una función clone que, a partir de un objeto de entrada source devuelva
// un nuevo objeto con las propiedades de source :

function clone(source) {
    let newObject = {};
    
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            newObject = { ...newObject, [key]: source[key] };            
        }
    }

    return newObject;
}

const y = clone(x);
console.log({x}, {y});
console.log(x === y);

function cloneTwo(source) {
    let newObject = Object.assign({}, source);

    return newObject;
}

const z = cloneTwo(x);
console.log({x}, {z});
console.log(x === z);

function cloneThree(source) {
    let newObject = {...source};

    return newObject;
}

const v = cloneThree(x);
console.log({x}, {v});
console.log(x === v);

console.log("------------- MERGE -------------");
// Implementa una función merge que, dados dos objetos de entrada source y target ,
// devuelva un nuevo objeto con todas las propiedades de target y de source , y en caso
// de propiedades con el mismo nombre, source sobreescribe a target .

function merge(source, target) {
    let newObject = { ...target, ...source};

    return newObject;
}

function mergeTwo(source, target) {
    let newObject = cloneThree(target);
    newObject = {...newObject, ...cloneThree(source) };

    return newObject;
}

const c = merge(a, b);
console.log(c);

const d = mergeTwo(a, b);
console.log(d);