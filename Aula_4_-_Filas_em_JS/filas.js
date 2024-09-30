console.log("TAD: Filas")
console.log("=======")

class Filas{
    constructor(tamanho){
        this.tamanho = tamanho;
        this.fila = new Array(tamanho).fill(0);
        // variaveis de controle
        this.inicio = 0;
        this.fim = 0;
        this.total = 0;
    }

    inserir(elemento){
        console.log("======= inserir()")
        if (this.isFull()){
            console.log("A Fila está cheia.")
        } else{
            console.log("O fim da fila é indice", this.fim)
            this.fila[this.fim] = elemento;
            console.log("Elemento inserido nele é", elemento)
            this.fim = (this.fim + 1) % this.fila.length;
            console.log("O fim da fila é indice", this.fim)
            this.total++;
            console.log("O total agora é: ", this.total);
            console.log(this.fila);
            console.log("=======")
        }
    }

    remover(){
        //console.log("======= remover()")
        if(this.isEmpty()){
            console.log("A fila está vazia");
        }else{
            // console.log("O inicio da fila é indice", this.inicio)
            // console.log("Elemento removido dele é", this.fila[this.inicio]);
            this.fila[this.inicio] = 0;
            this.inicio = (this.inicio + 1) % this.fila.length;
            this.total--;
            // console.log("O inicio da fila agora é indice", this.inicio);
            // console.log(this.fila);
            // console.log("=======");
        }
    }


    isFull(){
        if(this.total == this.tamanho){
            return true;
        } else{
            return false;
        }
    }

    isEmpty(){
        if(this.total == 0){
            return true;
        } else{
            return false;
        }
    }
}

function contarSequenciaAB(fila) {
    let contador = 0;
    
    // Verificar se há pelo menos dois elementos na fila
    while (fila.total > 1) {
        let letra1 = fila.fila[fila.inicio]; // Primeiro elemento da fila
        fila.remover(); // Remover o primeiro elemento
        let letra2 = fila.fila[fila.inicio]; // Próximo elemento da fila

        // Verifica se o par de letras é "ab"
        if (letra1 === 'a' && letra2 === 'b') {
            contador++;
        }
    }
    
    return contador;
}

// Exemplo de uso
var fila = new Filas(8);
fila.inserir('a');
fila.inserir('b');
fila.inserir('c');
fila.inserir('a');
fila.inserir('b');
fila.inserir('b');
fila.inserir('a');
fila.inserir('b');
console.log("Fila original: ",fila.fila)
console.log("Número de ocorrências de 'ab': ", contarSequenciaAB(fila));
