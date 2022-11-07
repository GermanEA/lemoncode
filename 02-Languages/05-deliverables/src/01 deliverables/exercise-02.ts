console.log("************** DELIVERABLE 02 *********************");

// Data
const array4: string[] = ['uno', 'dos', 'tres'];
const array5: number[] = [12, 13, 14, 15];
const array6: any[] = [{ name: 'John' }, { name: 'Nash' }, { name: 'Ember'}];

// Implementa una función concat (inmutable) tal que, dados 2 arrays como entrada,
// devuelva la concatenación de ambos. Uliza rest / spread operators.
const concat = (a: any[], b:any[]) => {
    const result: any[] = [...a, ...b];

    return result;
};

console.log(concat(array4, array5));

// Opcional
// Implementa una versión del ejercicio anterior donde se acepten múlples arrays de
// entrada (más de 2).
const concatMultiple = (...a:any[]) => {
    let finalArray: any[] = []
    
    a.forEach((firstLevel) => {
        // finalArray = concat(finalArray, firstLevel); -> Usando la función anterior
        finalArray = [...finalArray, ...firstLevel];
    });

    return finalArray;
};

console.log(concatMultiple(array4, array5, array6));