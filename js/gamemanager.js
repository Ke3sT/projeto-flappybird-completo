var taskGame;
var taskColisao;
var isPausado = true;
var obstaculoAtual;
var estaVerificandoColisao = false;
var jogadorPerdeu = false;
var tempoEntreObstaculos = 0;

//Funcao para iniciar o jogo
function iniciar() {
    if (pausado()) {
        setPausado(false);

        if (jogadorPerdeu) {
            estagio.getBird().girarPassaro(0, 0, 5, false, 1);
            reiniciar();
            jogadorPerdeu = false;
            estagio.onreiniciar();
        } else {
            estagio.oniniciar();
        }
    }
    clearInterval(taskGame);

    if (tempoEntreObstaculos <= 0) {
        criarObstaculo();
        tempoEntreObstaculos = 2000;
    }

    taskGame = setInterval(() => {
        estagio.moveBaixo(5);
        if (pausado()) {
            clearInterval(taskGame);
            return;
        }

        if (tempoEntreObstaculos <= 0) {
            console.log("Se passou " + tempoEntreObstaculos + " segundos");
            tempoEntreObstaculos = 2000;
            criarObstaculo();
        } else {
            tempoEntreObstaculos -= 20;
        }
    }, 20);
}

//Funcao para pausar
function pausar() {
    setPausado(true);
}

//Retorna se esta pausado o jogo
function pausado() {
    return isPausado;
}

//Seta o status do pausado
function setPausado(valorBooleano) {
    isPausado = valorBooleano;

    if (pausado()) {
        estagio.getBird().cancelaTaskGirar();
    }
}

function perdeu() {
    jogadorPerdeu = true;
    setPausado(true)
    estagio.onperdeu();
    console.log("Voce bateu no cano amigo :(");
}

function reiniciar() {
    estagio.setPontuacao(0);
    estagio.getBird().getBirdElement().style.left = "45%";
    estagio.getBird().getBirdElement().style.top = "35%";
    clearInterval(taskGame);
    clearInterval(taskColisao);
    estaVerificandoColisao = false;
    removeTodosObstaculos();
}

function criarObstaculo() {
    let novoObstaculo = document.createElement("div");
    let areaSeguraObstaculo = document.createElement("div");

    novoObstaculo.classList.add("obstaculo");
    areaSeguraObstaculo.classList.add("areasegura");

    novoObstaculo.appendChild(areaSeguraObstaculo);
    estagio.getEstagio().insertAdjacentElement("beforeend", novoObstaculo);
    novoObstaculo.style.left = (estagio.getMaxWidthArena() + novoObstaculo.offsetWidth) + "px";

    moverObstaculo(novoObstaculo);

    if (!estaVerificandoColisao) {
        console.log("Verificacao de colisao desligada. Ativando...");
        iniciarVerificadorColisao();
        estaVerificandoColisao = true;
    }

}

function iniciarVerificadorColisao() {
    console.log("Fui chamado pra verificar colisao");
    obstaculoAtual = new Obstaculo(estagio.getBird().getBirdElement().nextElementSibling, estagio.getBird());

    if (taskColisao != undefined) {
        console.log("Ja existe uma task de verifica colisao, cancelando a antiga...");
        clearInterval(taskColisao);
    }

    taskColisao = setInterval(() => {

        if (!pausado()) {
            if (obstaculoAtual.getHTML() == undefined || obstaculoAtual.getHTML() == null) {
                console.log("Obstaculo nao encontrado. Cancelando a verificacao atual...");
                estaVerificandoColisao = false;
                clearInterval(taskColisao);
                return;
            }

            if (obstaculoAtual.passaroBateu()) {
                console.log("BATEU!!!");
                perdeu();
            }

            if (obstaculoAtual.getBird().getPosWidth() > (obstaculoAtual.getPosWidth() + obstaculoAtual.getTamanhoWidth())) {
                console.log("Bird passou pelo obstaculo!");
                console.log(obstaculoAtual);
                obstaculoAtual = new Obstaculo(obstaculoAtual.getHTML().nextElementSibling, estagio.getBird());
                console.log("Novo obs: ");
                console.log(obstaculoAtual);
                estagio.addPontuacao(1);
            }
        }
    }, 10)
}

function removeTodosObstaculos() {
    document.querySelectorAll(".estagio .obstaculo").forEach(obstaculo => {
        obstaculo.remove();
    })
}

function moverObstaculo(obstaculo) {

    let obstaculoParaMover = obstaculo;
    setInterval(() => {
        if (!pausado()) {
            if ((obstaculoParaMover.offsetLeft + obstaculoParaMover.offsetWidth) < 0) {
                // obstaculoParaMover.style.left = (estagio.getMaxWidthArena() + obstaculoParaMover.offsetWidth) + "px";
                obstaculoParaMover.remove();
            }
            obstaculoParaMover.style.left = (obstaculoParaMover.offsetLeft - 5) + "px";
        }
    }, 20)
}

//Funcao para subir o passaro, o efeito de "voar"
function subirPassaro(pixeis) {
    let tempoLimite = 0;
    let timerSobePassaro = setInterval(() => {

        if (pausado()) {
            clearInterval(timerSobePassaro);
            return;
        }

        estagio.moveCima(pixeis);
        if (tempoLimite > 50) {
            clearInterval(timerSobePassaro);
        } else {
            tempoLimite += 5;
        }
    }, 10);
}

//Evento para quando o usuario apertar o arrow up
window.onkeydown = ev => {
    if (!pausado()) {
        let teclaPressionada = ev.key;
        switch (teclaPressionada) {
            case "ArrowUp":
                subirPassaro(10);

                estagio.getBird().girarPassaro(50, -55, 4, true, 7).then(a => {
                        estagio.getBird().girarPassaro(-55, 50, 2, false, 11).then(() => {

                        });
                    })
                    // estagio.moveCima(5);
                break;
                // case "ArrowRight":
                //     estagio.moveDireita(5);
                //     break;
                // case "ArrowDown":
                //     estagio.moveBaixo(5);
                //     break;
                // case "ArrowLeft":
                //     estagio.moveEsquerda(5);
                //     break;
        }
    }
}