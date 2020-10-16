class Obstaculo {

    elementoObstaculo;
    objetoAreaSegura;
    birdObjeto

    constructor(elementoHTML, birdObjeto) {
        this.birdObjeto = birdObjeto;

        if (elementoHTML != null && elementoHTML != undefined) {
            this.elementoObstaculo = elementoHTML;
            this.objetoAreaSegura = new AreaSegura(elementoHTML.firstElementChild);
        }
    }

    passaroBateu() {
        //Elemento obstaculo
        let obstaculo = this.getHTML();

        //Elemento safe area
        let safeArea = this.getAreaSegura().getHTML();
        //Posicoes do obstaculo
        let largurawidth = obstaculo.offsetWidth;
        let larguraheight = obstaculo.offsetHeight;
        let offsetTop = obstaculo.offsetTop;
        let offsetLeft = obstaculo.offsetLeft;

        //Posicoes do passaro
        let birdwidth = this.getBird().getTamanhoWidth();
        let birdheight = this.getBird().getTamanhoHeight();
        let birdoffTop = this.getBird().getPosHeigth();
        let birdoffLeft = this.getBird().getPosWidth();

        //Verifica se o passaro esta dentro das boundaries do obstaculo
        if (((birdoffLeft + birdwidth) >= offsetLeft && birdoffLeft < (offsetLeft + largurawidth)) &&
            ((birdoffTop + birdheight) > offsetTop && birdoffTop < (offsetTop + larguraheight))) {

            //Se ele tiver, pega as boundaries da safe area
            let safelargurawidth = safeArea.offsetWidth;
            let safelaguraheight = safeArea.offsetHeight;
            let safeoffTop = safeArea.offsetTop;
            let safeoffLeft = safeArea.offsetLeft + offsetLeft;

            //Verifica se ele esta dentro da safe area
            if (((birdoffLeft + birdwidth) >= safeoffLeft && birdoffLeft < (safeoffLeft + safelargurawidth)) &&
                (birdoffTop > safeoffTop && (birdoffTop + birdheight) < (safeoffTop + safelaguraheight))) {

                console.log("Ta na safe");
                return false;

            } else {
                console.log("Bateu no cano");
                return true;
            }
        } else {
            console.log("Ainda nao entrou no cano");
            return false;
        }

    }

    getHTML() {
        return this.elementoObstaculo
    }

    getAreaSegura() {
        return this.objetoAreaSegura
    }

    getBird() {
        return this.birdObjeto
    }

    getTamanhoWidth() {
        return this.elementoObstaculo.offsetWidth;
    }

    getTamanhoHeight() {
        return this.elementoObstaculo.offsetHeight;
    }

    getPosWidth() {
        return this.elementoObstaculo.offsetLeft;
    }

    getPosHeight() {
        return this.elementoObstaculo.offsetTop;
    }

}