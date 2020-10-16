class Estagio {

    //elemento HTML do estagio onde o bird fica
    elementoEstagio;

    //Objeto Bird contendo os dados
    objetoBird;

    //Pontuacao do jogador
    pontuacao = 0;

    //Boundaries da arena
    maxBoundsWidth = -1;
    maxBoundsHeight = -1;

    //Funcao callback para quando o usuario pontua
    funcaopontuar;

    //Funcao callback para quando o usuario perder
    funcaoperdeu;

    //Funcao callback para quando iniciar
    funcaoiniciar;

    //Funcao callback quando perde e iniciar novamente
    funcaoreiniciar

    //Construtor que recebe o elemento HTML da arena e o objeto do passaro
    constructor(elementoEstagio, objetoPassaro) {
        this.elementoEstagio = elementoEstagio;
        this.objetoBird = objetoPassaro;

        //Carrega as boundaries
        this.carregaBoundaries();
    }

    //Carrega a altura/largura da arena
    carregaBoundaries() {

        //Modifica o tamanho do estagio baseado no tamanho do elemento div do bird
        this.maxBoundsWidth = this.getEstagio().clientWidth - this.getBird().getTamanhoWidth();
        this.maxBoundsHeight = this.getEstagio().clientHeight - this.getBird().getTamanhoHeight();

        // console.log("Max width da arena: " + this.maxBoundsWidth);
        // console.log("Max height da arena: " + this.maxBoundsHeight);

        //Verifico se o passaro esta dentro as boundaries(caso o usuario de resize)
        this.estaForaDasBounds()
    }

    //Verifica se o bird pode ir pra cima
    podeMoverParaCima() {
        return this.getBird().getPosHeigth() > 0;
    }

    //Verifica se o bird pode ir para a direita
    podeMoverParaDireita() {
        return this.getBird().getPosWidth() < this.getMaxWidthArena();
    }

    //Verifica se o bird pode ir para baixo
    podeMoverParaBaixo() {
        return this.getBird().getPosHeigth() < this.getMaxHeightArena();
    }

    //Verifica se o bird pode ir para a esquerda
    podeMoverParaEsquerda() {
        return this.getBird().getPosWidth() > 0;
    }

    //Caso o passaro esteja fora das boundaries da arena, eu altero a posicao dele pra dentro dela.
    estaForaDasBounds() {
        if (this.getBird().getPosHeigth() > this.getMaxHeightArena()) {
            // console.log("height do passaro fora dos bounds (abaixo)");
            this.getBird().setPosHeight(this.getMaxHeightArena());
        } else if (this.getBird().getPosWidth() > this.getMaxWidthArena()) {
            // console.log("width do passaro fora dos bounds (direita)");
            this.getBird().setPosWidth(this.getMaxWidthArena());
        }
    }

    //Move o bird pra cima
    moveCima(totalPx) {

        //Verifico se tem espaco pra subir
        if ((this.getBird().getPosHeigth() - totalPx) > 0) {
            this.getBird().moveCima(totalPx);
        } else {
            //Caso nao tenha espaco pra subir, verifico se tem como completar o espaco que falta pra nao sobrar bordas
            //Em relacao ao passaro com a borda do estagio
            // console.log(this.getBird().getPosHeigth());
            let espacoRestante = this.getBird().getPosHeigth();

            if (espacoRestante > 0) {

                this.getBird().moveCima(espacoRestante);
            }
        }

    }

    //Move o passaro para baixo
    moveBaixo(totalPx) {
        // console.log("Pode mover para baixo: " + this.podeMoverParaBaixo());
        if ((this.getBird().getPosHeigth() + totalPx) < this.getMaxHeightArena()) {
            this.getBird().moveBaixo(totalPx);
        } else {
            let espacoRestante = this.getMaxHeightArena() - this.getBird().getPosHeigth();

            if (espacoRestante > 0) {
                // console.log("Movendo espaco restante");
                this.getBird().moveBaixo(espacoRestante);
            }
        }
    }

    //Move o passaro para a direita
    moveDireita(totalPx) {
        // console.log("Pode mover pra direita: " + this.podeMoverParaDireita());
        if ((this.getBird().getPosWidth() + totalPx) < this.getMaxWidthArena()) {
            this.getBird().moveDireita(totalPx);
        } else {
            let espacoRestante = this.getMaxWidthArena() - this.getBird().getPosWidth();

            if (espacoRestante > 0) {
                // console.log("Movendo espaco restante");
                this.getBird().moveDireita(espacoRestante);
            }
        }
    }

    //Move o passaro para a esquerda
    moveEsquerda(totalPx) {
        // console.log("Pode mover para a esquerda: " + this.podeMoverParaEsquerda());
        if ((this.getBird().getPosWidth() - totalPx) > 0) {
            this.getBird().moveEsquerda(totalPx);
        } else {

            let espacoRestante = this.getBird().getPosWidth();
            if (espacoRestante > 0) {
                // console.log("Movendo espaco restante");
                this.getBird().moveEsquerda(espacoRestante);
            }
        }
    }

    //Retorna o objeto Bird com seus dados
    getBird() {
        return this.objetoBird;
    }

    //Retorna o elemento estadio
    getEstagio() {
        return this.elementoEstagio;
    }

    //Retorna a largura maxima da arena
    getMaxWidthArena() {
        return this.maxBoundsWidth;
    }

    //Retorna a altura maxima da arena
    getMaxHeightArena() {
        return this.maxBoundsHeight;
    }

    getPontuacao() {
        return this.pontuacao;
    }

    addPontuacao(novoValor) {
        this.pontuacao += novoValor;
        this.onpontuar();
    }

    setPontuacao(novoValor) {
        this.pontuacao = novoValor;
        this.onpontuar();
    }

    onpontuar() {
        this.funcaopontuar(this.pontuacao);
    }

    onperdeu() {
        this.funcaoperdeu();
    }

    oniniciar() {
        this.funcaoiniciar();
    }

    onreiniciar() {
        this.onreiniciar();
    }
}