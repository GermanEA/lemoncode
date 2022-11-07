console.log("************** DELIVERABLE 05 *********************");

// El objevo de este ejercicio es crear una máquina tragaperras ulizando clases donde
// cada vez que juguemos insertemos una moneda. Cada máquina tragaperras (instancia)
// tendrá un contador de monedas que automácamente se irá incrementando conforme
// vayamos jugando.
// Cuando se llame al método play el número de monedas se debe incrementar de forma
// automáca y debe generar tres booleanos aleatorios que representarán el estado de las
// 3 ruletas. El usuario habrá ganado en caso de que los tres booleanos sean true , y por
// tanto deberá mostrarse por consola el mensaje:
// "Congratulations!!!. You won <número de monedas> coins!!"
// y reiniciar las monedas almacenadas, ya que las hemos conseguido y han salido de la
// máquina.
// En caso contrario deberá mostrar otro mensaje:
// "Good luck next time!!".

class SlothMachine {
    private count: number = 0;
    private spinnerOne: boolean = false;
    private spinnerTwo: boolean = false;
    private spinnerThree: boolean = false;

    constructor() {}

    play(): void {
        this.newPlay();

        this.spinnerOne && this.spinnerTwo && this.spinnerThree 
            ? this.showMessage(`Congratulations!!!. You won ${this.count} coins!!`, true)
            : this.showMessage('Good luck next time!!', false)

        this.showCoins();
        this.showResult();
        console.log('------------------');
    }

    private newPlay(): void {
        this.addCoin();
        this.spinnerOne = this.spinSpinner();
        this.spinnerTwo = this.spinSpinner();
        this.spinnerThree = this.spinSpinner();
    }

    private showCoins(): void {
        this.showMessage(`Number of coins after play: ${this.count}`, false);
    }

    private showResult(): void {
        this.showMessage(`First: ${this.spinnerOne}, Second: ${this.spinnerTwo}, Third: ${this.spinnerThree}`, false);
    }

    private showMessage(message: string, reset: boolean): void {
        console.log(message);
        if(reset) this.resetCoins();
    }

    private addCoin(): void {
        this.count += 1;
    }

    private resetCoins(): void {
        this.count = 0;
    }

    private spinSpinner(): boolean {
        const number: number = Math.random();
        const result: boolean = number > 0.5 ? true : false;
    
        return result;
    }
}


const machine1 = new SlothMachine();
machine1.play(); 
machine1.play(); 
machine1.play();
machine1.play(); 
machine1.play();