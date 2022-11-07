console.log("************** PRACTICE *********************");
console.log("------------- BIGGEST WORD -------------");
// Crea una función que reciba una frase en formato string y devuelva la palabra más larga. En caso de haber varias con longitud máxima que devuelva siempre la primera. Ten en cuenta que consideramos una palabra a aquello que esté separado por espacios.
function biggestWord(phrase) {
    const splitPhrase = phrase.split(' ');
    let biggest = '';

    splitPhrase.forEach((el) => {
        if( el.length > biggest.length) biggest = el; 
    });

    return biggest;
}

console.log(biggestWord("Esta frase puede contener muchas palabras")); // "contener"
console.log(biggestWord("Ejercicios básicos de JavaScript")); // "Ejercicios"


console.log("------------- VALUES -------------");
// Escribe una función que devuelva una lista de valores de todas las propiedades de un objeto:
function values(obj: {}): number[] {
    return Object.values(obj);
}

function values2(obj: {}): number[] {
    let lista = [];
    
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            lista.push(element);
        }
    }
    return lista;
}

function values3(obj: {}): number[] {
    let lista = [];
    
    for (const key in obj) {
        const element = obj[key];
        lista.push(element);
    }
    return lista;
}

const obj = { id: 31, duration: 310, name: "long video", format: "mp4" };

console.log(values(obj));
console.log(values2(obj));
console.log(values3(obj));

console.log("------------- VALUES CHALLENGE -------------");
// Evita añadir las propiedades heredadas en caso de ser instancia de una clase
function Person(name) {
    this.name = name;
}
  
Person.prototype.walk = function() {
    console.log("I'm walking");
};
  
var john = new Person("John");
console.log(values(john));
console.log(values2(john));
console.log(values3(john));

console.log("------------- CALIFICATIONS -------------");
// Dada la calificación de alumnos de una clase en forma de objeto como el siguiente:
interface Califications {
    [index: string]: number;
}

const eso2o: Califications = {
    David: 8.25,
    Maria: 9.5,
    Jose: 6.75,
    Juan: 5.5,
    Blanca: 7.75,
    Carmen: 8,
};

// Implementa una función que muestre la media de la clase de forma textual, es decir, siguiendo el sistema de calificación español:

// - Matrícula de Honor = 10
// - Sobresaliente = entre 9 y 10
// - Notable = entre 7 y 9
// - Bien = entre 6 y 7
// - Suficiente = entre 5 y 6
// - Insuficiente = entre 4 y 5
// - Muy deficiente = por debajo de 4

function printAverage(classResults: Califications): string {
    const resultArr: number[] = values(classResults);
    const result = getMedia(resultArr);
    const resultString = getMediaString(result);

    return resultString;
}

function getMedia(resultArr: number[]): number {
    const result = resultArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / resultArr.length;

    return result;
}

function getMediaString(media: number): string {
    switch (true) {
        case media === 10:
            return 'Matrícula de Honor'; 

        case media > 9:
            return 'Sobresaliente';

        case media > 7:
            return 'Notable';

        case media > 6:
            return 'Bien';

        case media > 5:
            return 'Suficiente';

        case media > 4:
            return 'Insuficiente';
    
        default:
            return 'Muy deficiente';
    }
}

console.log(printAverage(eso2o));

console.log("------------- CHECK ARGUMENTS -------------");
// Es muy habitual en javascript, al recibir argumentos de una función, querer asegurarnos de que no sean `undefined` o `null`. En este ejercicio debes convertir el código de abajo en algo equivalente pero más compacto y expresivo.

function checkArguments(input: string | null | undefined): string {    
    return input ? input : 'Unknown';
} 

console.log(checkArguments('Escribe tu string'));

console.log("------------- DEEP EQUAL A -------------");
// Suponiendo objetos sin anidamiento y con propiedades primitivas, construye una función que compare el contenido de 2 objetos.
var user = { name: "María", age: 30 };
var clonedUser = { name: "María", age: 30 };

console.log(user === clonedUser); // false

function isEqual(a, b) {
    let flag = true;

    for (const key in a) {
        if( !b.hasOwnProperty(key) ) flag = false;
    }

    return flag;
}

console.log(isEqual(user, clonedUser)); // true

console.log("------------- DEEP EQUAL B -------------");
// Vamos a mejorar la solución del apartado A suponiendo ahora que si puede existir anidamiento de objetos.

var user2 = {
    name: "María",
    age: 30,
    address: { city: "Málaga", code: 29620 },
    friends: ["Juan"],
  };
var clonedUser2 = {
    name: "María",
    age: 30,
    address: { city: "Málaga", code: 29620 },
    friends: ["Juan"],
};

function isDeepEqual(a, b) {
    let flag = true;

    for (const key in a) {
        if( !b.hasOwnProperty(key) || typeof b[key] != typeof a[key] ) flag = false;
    }

    return flag;
}

console.log(isDeepEqual(user2, clonedUser2)); // true

console.log("------------- DICES -------------");
// Empleando el concepto de _closure_, emula el comportamiento de 2 dados.

// Utiliza un _closure_ para almacenar el resultado de tirar 2 dados, y encapsula junto a estos datos, métodos que implementen la siguiente funcionalidad:

// - Hacer reset, poner a `undefined` o `null` ambos resultados.
// - Tirar los dados. **TIP**: Usa `Math.random()` para tiradas aleatorias.
// - Imprimir el resultado por consola. Ten en cuenta lo siguiente:
//   - Informa al usuario que debe tirar primero cuando corresponda.
//   - Si saca doble 6, ¡dale un premio!

const dices = () => {
    let diceOne;
    let diceTwo;

    return {
        reset: function() {
            diceOne = undefined;
            diceTwo = undefined;
        },
        rollDices: function() {
            diceOne = Math.ceil(Math.random() * 6);
            diceTwo = Math.ceil(Math.random() * 6);
        },
        printResult: function() {
            if( !diceOne || !diceTwo ) {
                console.log('Primero debes tirar los dados');
            } else {
                const result = diceOne === diceTwo && diceOne === 6 ? '¡¡¡Has ganado un premio!!!' : 'Sigue jugando';

                console.log(`Dado uno: ${diceOne}, dado dos: ${diceTwo}`);
                console.log(result);
    
                this.reset();
            }

        }
    }
}

const dicesInterface = dices();
dicesInterface.printResult();
dicesInterface.rollDices();
dicesInterface.printResult();
