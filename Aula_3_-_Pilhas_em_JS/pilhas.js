console.log("TAD: Pilhas")
console.log("=======")

class Pilhas {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.topo = -1;
        this.pilha = new Array(tamanho);  // Removido .fill(0) para evitar preencher com zeros
    }

    top() {
        if (this.topo == -1) {
            return "Pilha vazia.";
        } else {
            return this.pilha[this.topo];
        }
    }

    push(elemento) {
        if (!this.isFull()) {
            this.topo++;
            this.pilha[this.topo] = elemento;
        } else {
            console.log('Pilha está cheia.');
        }
    }

    pop() {
        if (!this.isEmpty()) {
            let e = this.pilha[this.topo];
            this.topo--;
            return e;
        } else {
            console.log("Pilha está vazia.");
            return null;
        }
    }

    isEmpty() {
        return this.topo == -1;
    }

    isFull() {
        return this.topo == this.tamanho - 1;
    }

    // Método auxiliar para imprimir a pilha até o topo corretamente
    print() {
        if (this.isEmpty()) {
            console.log("Pilha está vazia.");
        } else {
            console.log("Pilha: ", this.pilha.slice(0, this.topo + 1));
        }
    }
}

// Função para ordenar a pilha usando uma pilha auxiliar
function ordenarPilha(pilha) {
    let aux = new Pilhas(pilha.tamanho); // Pilha auxiliar para ordenar

    // Enquanto a pilha original não estiver vazia
    while (!pilha.isEmpty()) {
        // Remove o elemento do topo da pilha original
        let temp = pilha.pop();

        // Mover elementos maiores de aux para a pilha original
        while (!aux.isEmpty() && aux.top() > temp) {
            pilha.push(aux.pop());
        }

        // Empilhar o elemento atual na pilha auxiliar
        aux.push(temp);
    }

    // Agora, todos os elementos estão em ordem crescente na pilha auxiliar
    // Precisamos transferi-los de volta para a pilha original
    while (!aux.isEmpty()) {
        pilha.push(aux.pop());
    }
}

// Função para calcular maior, menor e média
function calcularEstatisticas(pilha) {
    if (pilha.isEmpty()) {
        console.log("Pilha está vazia.");
        return;
    }

    let aux = new Pilhas(pilha.tamanho);  // Pilha auxiliar
    let maior = -Infinity;
    let menor = Infinity;
    let soma = 0;
    let contador = 0;

    // Processa todos os elementos da pilha
    while (!pilha.isEmpty()) {
        let elemento = pilha.pop();
        aux.push(elemento);

        // Verifica maior e menor
        if (elemento > maior) {
            maior = elemento;
        }
        if (elemento < menor) {
            menor = elemento;
        }

        soma += elemento;
        contador++;
    }

    // Retorna os elementos da pilha auxiliar para a pilha original
    while (!aux.isEmpty()) {
        pilha.push(aux.pop());
    }

    let media = soma / contador;

    console.log(`Maior: ${maior}`);
    console.log(`Menor: ${menor}`);
    console.log(`Média: ${media}`);
}

// Exemplo de uso
let pilha = new Pilhas(10);
pilha.push(1);
pilha.push(5);
pilha.push(3);
pilha.push(2);
pilha.push(4);

console.log("Pilha original: ");
pilha.print();

calcularEstatisticas(pilha);

console.log("Pilha após cálculo de estatísticas (não alterada): ");
pilha.print();