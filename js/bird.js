class Bird {

    //Variavel que armazena o elemento HTML
    elementoPassaro;

    //Elemento imagem do bird
    imgBird;

    //Variavel para armazenar o setinterval
    timerGiraPassaro;

    //Variavel pra salvar o progress da task anterior
    rotacaoAtual = 0;

    //Construtor que recebe o elemento HTML do passaro
    constructor(elementoDiv) {
        this.elementoPassaro = elementoDiv;
        this.imgBird = this.elementoPassaro.querySelector("#imgBird");
    }

    //Seta o width do bird
    setPosWidth(novaPos) {
        this.getBirdElement().style.left = novaPos + "px";
    }

    //Seta o heigh to bird
    setPosHeight(novaPos) {
        this.getBirdElement().style.top = novaPos + "px";
    }

    //Pega a largura do elemento passaro
    getTamanhoWidth() {
        return this.getBirdElement().offsetWidth;
    }

    //Pega a altura do elemento passaro
    getTamanhoHeight() {
        return this.getBirdElement().offsetHeight;
    }

    //Pega o Y atual do passaro dentro da arena
    getPosHeigth() {
        return this.getBirdElement().offsetTop;
    }

    //Pega o X da posicao atual do passar
    getPosWidth() {
        return this.getBirdElement().offsetLeft;
    }

    //Pega o elemento HTML do passaro
    getBirdElement() {
        return this.elementoPassaro
    }

    //Retorna o elemento imagem do bird
    getImg() {
        return this.imgBird;
    }

    //Move para cima em X pixeis
    moveCima(px) {

        this.getBirdElement().style.top = (this.getBirdElement().offsetTop - px) + "px";
    }


    //Move para a direita em X pixeis
    moveDireita(px) {
        // console.log("Movendo p direita");
        this.getBirdElement().style.left = (this.getBirdElement().offsetLeft + px) + "px";

    }

    //Move para baixo em X pixeis
    moveBaixo(px) {
        // console.log("Movendo p baixo");
        this.getBirdElement().style.top = (this.getBirdElement().offsetTop + px) + "px";

    }

    //Move para a esquerda em X pixeis
    moveEsquerda(px) {
        // console.log("Movendo p esquerda");
        this.getBirdElement().style.left = (this.getBirdElement().offsetLeft - px) + "px";

    }

    //Gira a imagem do passaro
    //Aceita 5 parametros: inicio: é da onde a imagem ira comecar a rodar
    //fim: até qual grau onde ela deve girar
    //velocidadepasso: a velocidade que serao adicionados os graus
    //irReverso: rodar a imagem ao contrario, exemplo de 0 até -40
    //velocidadeTimer: velocidade do timer
    girarPassaro(inicio, fim, velocidadepasso, irReverso, velocidadeTimer) {
        if (pausado()) {
            clearInterval(this.timerGiraPassaro);
            return;
        }

        if (this.timerGiraPassaro) {
            // console.log("Achei uma task ja em execucao, cancelando ela...");
            clearInterval(this.timerGiraPassaro);
            inicio = this.rotacaoAtual;
            // console.log(this.rotacaoAtual);
        }

        return new Promise(resolve => {
            this.timerGiraPassaro = setInterval(() => {
                // console.log("inicio: " + inicio);
                // console.log("Fim: " + fim);
                this.imgBird.style.transform = `rotate(${inicio}deg)`;

                if (irReverso) {
                    inicio -= velocidadepasso;
                } else {
                    inicio += velocidadepasso;
                }

                this.rotacaoAtual = inicio;

                if (irReverso) {
                    if (inicio <= fim) {
                        // console.log("Imagem terminou de rotacionar");
                        clearInterval(this.timerGiraPassaro);
                        this.timerGiraPassaro = undefined;
                        resolve();
                    }
                } else {
                    if (inicio >= fim) {
                        // console.log("Imagem terminou de rotacionar");
                        clearInterval(this.timerGiraPassaro);
                        this.timerGiraPassaro = undefined;
                        resolve();
                    }
                }

            }, velocidadeTimer);
        })
    }
    cancelaTaskGirar() {
        clearInterval(this.timerGiraPassaro);
    }

}