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

console.log("------------- INCLUDES -------------");
// En ES7 ya existe una función de manejo de arrays llamada `Array.includes()` que indica si un determinado valor figura entre los items de un array dado.
// Crea una función en ES5 con el mismo comportamiento, es decir, una función que reciba un array y un valor y devuelva un `boolean` indicando si el valor está dentro del array.

function includes(array, value) {
    let result = false;

    array.forEach((el) => {
        if(el === value) result = true;    
    });

    return result;
}

console.log(includes([1, 2, 3], 3)); // true
console.log(includes([1, 2, 3], 0)); // false

console.log("------------- INCLUDES CHALLENGE -------------");
// El ejercicio anterior puede quedar simplificado si utilizas una función de los arrays
// que devuelve el índice de un elemento dado.

function includesChallenge(array, value) {
    const result = array.indexOf(value);
    
    return result >= 0 ? true : false;
}

console.log(includesChallenge([1, 2, 3], 3)); // true
console.log(includesChallenge([1, 2, 3], 0)); // false

console.log("------------- PRIMES -------------");
// Crea una función tal que, dado un número entero de inicio `from` y otro de fin `to`, encuentre los números primos entre ellos y los muestre por pantalla.
function showPrimes(from, to) {
    const arrayNum = fillNumbers(from, to);    

    arrayNum.forEach((el) => {
        const isPrime = isPrimeNumber(el);        
        
        isPrime ? console.log(`${ el } is PRIME!`) : console.log(`${ el } is not a prime`);
    });
}

function fillNumbers(from, to) {
    let arrayNum = [];

    for(let i = from; i <= to; i++ ) {
        arrayNum.push(i);
    }

    return arrayNum;
}

function isPrimeNumber(number) {
    let isPrime = true;

    if( number > 1 ) {
        for(let i = 2; i < number; i++) {
            if( number % i == 0 ) {
                isPrime = false;
                break;
            }
        }        
    } else {
        isPrime = false;
    }
    
    return isPrime;
}

showPrimes(1, 10);

console.log("------------- REVERSE TEXT -------------");
// Dado un texto cualquiera, invierte el orden de las palabras.
function reverseText(text) {
    return text.split(' ').reverse();
}

console.log(reverseText("uno dos tres"));

console.log("------------- SUBSETS -------------");
// Escribe una función que acepte un string como argumento y devuelva todas las partes finales de dicha palabra:

function subsets(word) {
    let result = [];

    for( let i = 1; i < word.length; i++) {        
        result.push(word.substr(i));
    }

    return result;
}

console.log(subsets("message"));

console.log("------------- SUBSETS -------------");
// Repite el ejercicio anterior sin utilizar arrays auxiliares ni bucles for/do/while.

function subsetsChallenge(word) {
    const result = word.map((el, index) => word.substr(index));

    return result;
}

console.log(subsets("message"));

console.log("------------- ZIP -------------");
// Crea una función `zipObject` tal que acepte un array de claves como primer argumento y un array de valores como segundo argumento y cuyo objetivo sea crear un objeto uniendo las claves con sus valores.
// Asumir que el array de claves tiene como mínimo la misma longitud que el de valores:

function zipObject(keys, values) {
    let obj = {}
    
    keys.forEach((el, index) => obj[el] = values[index]);

    return obj;
}

console.log(zipObject(["spanish", "english", "french"], ["hola", "hi", "salut"]));

console.log("------------- ZIP CHALLENGE -------------");
// Crea una función `zipObject` tal que acepte un array de claves como primer argumento y un array de valores como segundo argumento y cuyo objetivo sea crear un objeto uniendo las claves con sus valores.
// Asumir que el array de claves tiene como mínimo la misma longitud que el de valores:

function zipObjectChallenge(keys, values) {
    let obj = {}
    
    keys.forEach((el, index) => {
        if( values[index] ) obj[el] = values[index];
    })

    return obj;
}

console.log(zipObjectChallenge(["spanish", "english", "french"], ["hola"]));

console.log("------------- ZZCRYPT -------------");
// Descifra el siguiente secreto:
var secret =
  "': rg!qg yq,urae: ghsrf wuran shrerg jq,u'qf ra r' ,qaq' er g'q,o rg,fuwurae: m!hfua( t'usqfuq ,:apu(:m xv";

// Sabiendo que el alfabeto original ha sufrido la siguiente transformación:
var plain = "abcdefghijklmnopqrstuvwxyz:()!¡,'";
var cipher = "qw,ert(yuio'pa:sdfg!hjklz¡xcv)bnm";

function decrypt(secret) {
    const code = zipObjectChallenge(cipher.split(''), plain.split(''));

    const result = secret.split('').map(el => code[el] ? code[el] : ' ');

    return result.join('');
}

console.log(decrypt(secret));

console.log("------------- FIBONACCI -------------");
// Implementa una función para calcular el n-enésimo termino de la sucesión de Fibonacci. Esta sucesión tiene sus dos primeros términos prefijados:

// ```
// fib(0) = 0
// fib(1) = 1
// ```

// Y a partir de aqui, el siguiente término se calcula a partir de los dos anteriores:

// ```
// fib(2) = fib(1) + fib(0)
// ...
// fib(n + 1) = fib(n) + fib(n - 1)
// ```

const fib = n => {
    const result = Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);

    return result[n - 1];
};

console.log(fib(25));