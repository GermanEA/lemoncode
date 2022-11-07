console.log("************** DELIVERABLE 01 *********************");

// Data
const array1: string[] = ['uno', 'dos', 'tres'];
const array2: number[] = [12, 13, 14, 15];
const array3: any[] = [{ name: 'John' }, { name: 'Nash' }, { name: 'Ember'}];


console.log("------------- HEAD -------------");
// Implementa una función head (inmutable), tal que, dado un array como entrada extraiga
// y devuelva su primer elemento. Uliza destructuring.

const head = ( array: any[] ) => {
    const [first, ...rest] = array;

    return first;
}

console.log('Ejemplo con string[]:', head(array1));
console.log('Ejemplo con number[]:', head(array2));
console.log('Ejemplo con object[]:', head(array3));

console.log("------------- TAIL -------------");
// Implementa una función tail (inmutable), tal que, dado un array como entrada
// devuelta todos menos el primer elemento. Uliza rest operator.

const tail = ( array: any[] ) => {
    const [first, ...rest] = array;

    return rest;
}

console.log('Ejemplo con string[]:', tail(array1));
console.log('Ejemplo con number[]:', tail(array2));
console.log('Ejemplo con object[]:', tail(array3));

console.log("------------- INIT -------------");
// Implementa una función init (inmutable), tal que, dado un array como entrada
// devuelva todos los elementos menos el úlmo. Uliza los métodos que ofrece
// Array.prototype.

const init = ( array: any[] ) => {
    const result = array.filter((el, i) => {
        if( (i + 1) != array.length ) return el;
    });

    return result;
}

console.log('Ejemplo con string[]:', init(array1));
console.log('Ejemplo con number[]:', init(array2));
console.log('Ejemplo con object[]:', init(array3));


console.log("------------- LAST -------------");
// Implementa una función last (inmutable), tal que, dado un array como entrada
// devuelva el úlmo elemento.

const last = ( array: any[] ) => {
    const result = array.filter((el, i) => {
        if( (i + 1) === array.length ) return el;
    });

    return result;
}

console.log('Ejemplo con string[]:', last(array1));
console.log('Ejemplo con number[]:', last(array2));
console.log('Ejemplo con object[]:', last(array3));