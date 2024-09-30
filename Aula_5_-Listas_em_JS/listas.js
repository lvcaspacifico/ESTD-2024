<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Menu Lista Encadeada</title>
    <style>
        #output {
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 10px;
            height: 200px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <h1>TAD: Listas</h1>
    <div id="menu"></div>
    <input type="text" id="opcaoInput" placeholder="Digite a opção">
    <button id="enviarBtn">Enviar</button>
    <div id="output"></div>

    <script>
        class No {
            constructor(valor) {
                this.valor = valor;
                this.proximoNo = null;
            }

            getValor() {
                return this.valor;
            }
            setValor(valor) {
                this.valor = valor;
            }
            getProximoNo() {
                return this.proximoNo;
            }
            setProximoNo(proximoNo) {
                this.proximoNo = proximoNo;
            }
        }

        class Lista {
            constructor() {
                this.noHead = null;
                this.noUltimo = null;
                this.totalDeElementos = 0;
                this.msg_erro_posicao = "Posição não existe";
                this.msg_erro_vazia = "A Lista está vazia";
            }

            inserirNoHead(valor) {
                const no = new No(valor);
                no.setProximoNo(this.noHead);
                this.noHead = no;

                if (this.totalDeElementos === 0) {
                    this.noUltimo = this.noHead;
                }
                this.totalDeElementos++;
            }

            inserirNoFim(valor) {
                if (this.totalDeElementos === 0) {
                    this.inserirNoHead(valor);
                } else {
                    const no = new No(valor);
                    this.noUltimo.setProximoNo(no);
                    this.noUltimo = no;
                    this.totalDeElementos++;
                }
            }

            inserirNaPosicao(posicao, valor) {
                if (posicao < 0 || posicao > this.totalDeElementos) {
                    console.log(this.msg_erro_posicao);
                    return;
                }
                if (posicao === 0) {
                    this.inserirNoHead(valor);
                } else if (posicao === this.totalDeElementos) {
                    this.inserirNoFim(valor);
                } else {
                    const noAnterior = this.pesquisarNo(posicao - 1);
                    const noNovo = new No(valor);
                    noNovo.setProximoNo(noAnterior.getProximoNo());
                    noAnterior.setProximoNo(noNovo);
                    this.totalDeElementos++;
                }
            }

            removeInicio() {
                if (this.totalDeElementos === 0) {
                    console.log(this.msg_erro_vazia);
                    return;
                }
                
                this.noHead = this.noHead.getProximoNo();
                this.totalDeElementos--;

                if (this.totalDeElementos === 0) {
                    this.noUltimo = null;
                }
            }

            removeFim() {
                if (this.totalDeElementos === 0) {
                    console.log(this.msg_erro_vazia);
                    return;
                }
                if (this.totalDeElementos === 1) {
                    this.removeInicio();
                } else {
                    const noPenultimo = this.pesquisarNo(this.totalDeElementos - 2);
                    noPenultimo.setProximoNo(null);
                    this.noUltimo = noPenultimo;
                    this.totalDeElementos--;
                }
            }

            removePosicao(posicao) {
                if (posicao < 0 || posicao >= this.totalDeElementos) {
                    console.log(this.msg_erro_posicao);
                    return;
                }
                if (posicao === 0) {
                    this.removeInicio();
                } else if (posicao === this.totalDeElementos - 1) {
                    this.removeFim();
                } else {
                    const noAnterior = this.pesquisarNo(posicao - 1);
                    const noAtual = noAnterior.getProximoNo();
                    noAnterior.setProximoNo(noAtual.getProximoNo());
                    this.totalDeElementos--;
                }
            }

            listaToString() {
                let listaConcatenada = [];
                let proximo = this.noHead;
                while (proximo != null) {
                    listaConcatenada.push(proximo.getValor());
                    proximo = proximo.getProximoNo();
                }
                return listaConcatenada.join(', ');
            }

            pesquisarNo(posicao) {
                if (posicao < 0 || posicao >= this.totalDeElementos) {
                    console.log(this.msg_erro_posicao);
                    return null;
                }
                let noAtual = this.noHead;
                for (let i = 0; i < posicao; i++) {
                    noAtual = noAtual.getProximoNo();
                }
                return noAtual;
            }

            inverter() {
                if (this.totalDeElementos <= 1) {
                    return;
                }

                let noAnterior = null;
                let noAtual = this.noHead;
                let noProximo = null;

                this.noUltimo = this.noHead;

                while (noAtual !== null) {
                    noProximo = noAtual.getProximoNo();
                    noAtual.setProximoNo(noAnterior);
                    noAnterior = noAtual;
                    noAtual = noProximo;
                }

                this.noHead = noAnterior;
            }
        
            dividirListaParImpar(){
                const listaPar = new Lista();
                const listaImpar = new Lista();

                let noAtual = this.noHead;
                while (noAtual !== null) {
                    if (noAtual.getValor() % 2 === 0) {
                        listaPar.inserirNoFim(noAtual.getValor());
                    } else {
                        listaImpar.inserirNoFim(noAtual.getValor());
                    }
                    noAtual = noAtual.getProximoNo();
                }

            return { listaPar, listaImpar };
            }
            moverMenorParaInicio() {
                if (this.noHead === null || this.noHead.getProximoNo() === null) {
                    // Lista está vazia ou tem apenas um elemento, então já está ordenada
                    return;
                }

                let noAtual = this.noHead;
                let noAnteriorMenor = null;
                let noMenor = this.noHead;
                let noAnteriorAtual = null;

                // Encontrar o menor elemento
                while (noAtual !== null) {
                    if (noAtual.getValor() < noMenor.getValor()) {
                        noMenor = noAtual;
                        noAnteriorMenor = noAnteriorAtual;
                    }
                    noAnteriorAtual = noAtual;
                    noAtual = noAtual.getProximoNo();
                }

                // Se o menor já está no início, não precisa mover
                if (noMenor === this.noHead) {
                    return;
                }

                // Ajustar os ponteiros para remover o menor de sua posição original
                if (noAnteriorMenor !== null) {
                    noAnteriorMenor.setProximoNo(noMenor.getProximoNo());
                }

                // Colocar o menor elemento no início
                noMenor.setProximoNo(this.noHead);
                this.noHead = noMenor;
            }
        }

        class Menu {
            constructor() {
                this.opcao = 0;
                this.lista = new Lista();
                this.menu();
            }
            
            menu() {
                this.exibirMenu();
                document.getElementById('enviarBtn').onclick = () => {
                    this.opcao = parseInt(document.getElementById('opcaoInput').value, 10);
                    this.processarOpcao();
                };
            }

            exibirMenu() {
                const menuHTML = `
                    <p>-----------------------------------------------</p>
                    <p>1 - Inserir no início da Lista</p>
                    <p>2 - Inserir no final da Lista</p>
                    <p>3 - Inserir em posição específica da Lista</p>
                    <p>4 - Quantidade de Nós (tamanho)</p>
                    <p>5 - Imprimir percorrendo a Lista</p>
                    <p>6 - Pesquisar um nó ou uma posição específica</p>
                    <p>7 - Remover do início da lista</p>
                    <p>8 - Remover do final da lista</p>
                    <p>9 - Remover de qualquer posição</p>
                    <p>10 - Inverter Posições</p>
                    <p>11 - Dividir Lista para Lista Pares e Lista Impares</p>
                    <p>12 - Menor Valor se torna Primeiro Nó</p>
                    <p>99 - Sair</p>
                    <p>-----------------------------------------------</p>
                `;
                document.getElementById('menu').innerHTML = menuHTML;
            }

            atualizarOutput(mensagem) {
                const outputDiv = document.getElementById('output');
                outputDiv.innerHTML += mensagem + '<br>';
                outputDiv.scrollTop = outputDiv.scrollHeight; // Rolar para baixo
            }

            processarOpcao() {
                switch(this.opcao) {
                    case 1:
                        const valor1 = parseInt(prompt("Qual valor deseja inserir no Nó?"), 10);
                        this.lista.inserirNoHead(valor1);
                        this.atualizarOutput("1 - Inserir no início da Lista: " + valor1);
                        break;
                    case 2:
                        const valor2 = parseInt(prompt("Qual valor deseja inserir no Nó?"), 10);
                        this.lista.inserirNoFim(valor2);
                        this.atualizarOutput("2 - Inserir no final da Lista: " + valor2);
                        break;
                    case 3:
                        const posicao3 = parseInt(prompt("Digite a posição específica que deseja inserir: "), 10);
                        const valor3 = parseInt(prompt("Digite o valor que deseja inserir na posição específica: "), 10);
                        this.lista.inserirNaPosicao(posicao3, valor3);
                        this.atualizarOutput("3 - Inserir na posição " + posicao3 + ": " + valor3);
                        break;
                    case 4:
                        this.atualizarOutput("4 - Quantidade de Nós (tamanho): " + this.lista.totalDeElementos);
                        break;
                    case 5:
                        this.atualizarOutput("5 - Lista de Nós: " + this.lista.listaToString());
                        break;
                    case 6:
                        const posicao6 = parseInt(prompt("Digite uma posição para pesquisar: "), 10);
                        const valorNaPosicao = this.lista.pesquisarNo(posicao6).getValor();
                        this.atualizarOutput(`6 - O valor na posição ${posicao6} é ${valorNaPosicao}`);
                        break;
                    case 7:
                        this.lista.removeInicio();
                        this.atualizarOutput("7 - Remover do início da lista. Lista atual: " + this.lista.listaToString());
                        break;
                    case 8:
                        this.lista.removeFim();
                        this.atualizarOutput("8 - Remover do final da lista. Lista atual: " + this.lista.listaToString());
                        break;
                    case 9:
                        const posicao9 = parseInt(prompt("Digite uma posição para remover: "), 10);
                        this.lista.removePosicao(posicao9);
                        this.atualizarOutput("9 - Remover da posição " + posicao9 + ". Lista atual: " + this.lista.listaToString());
                        break;
                    case 10:
                        this.lista.inverter();
                        this.atualizarOutput("10 - Inverter a Lista. Lista atual: " + this.lista.listaToString());
                        break;
                    case 11:
                        const { listaPar, listaImpar } = this.lista.dividirListaParImpar();
                        this.atualizarOutput("11 - Dividir lista em par e ímpar");
                        this.atualizarOutput("Lista Original: " + this.lista.listaToString());
                        this.atualizarOutput("Lista Par: " + listaPar.listaToString());
                        this.atualizarOutput("Lista Ímpar: " + listaImpar.listaToString());
                        break;
                    case 12:
                        this.lista.moverMenorParaInicio();
                        this.atualizarOutput("12 - Menor elemento movido para o início. Lista atual: " + this.lista.listaToString());
                        break;
                    case 99:
                        this.atualizarOutput("99 - Sair <= ESCOLHIDO");

                        break;
                    default:
                        this.atualizarOutput("Inválido! Escolha outra opção entre 1 e 99.");
                        break;            
                }
                this.exibirMenu();
            }
        }

        const menu = new Menu();
    </script>
</body>
</html>