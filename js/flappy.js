let divEstagio = document.querySelector("[estagio]");
let divBird = document.querySelector("[bird]");
let hPontuacao = document.querySelector("[pontuacao]");
let hPerdeu = document.querySelector(".perdeu");

const passaro = new Bird(divBird);
const estagio = new Estagio(divEstagio, passaro);

//Recarregar as boundaries quando dar resize
window.onresize = ev => {
    console.log("Reajusdando boundarios da arena..");
    estagio.carregaBoundaries();
}

estagio.oniniciar = () => {
    console.log("Iniciou o game");
}

estagio.onreiniciar = () => {
    console.log("Reiniciou o game");
    hPerdeu.style.display = "none";
    estagio.getEstagio().style.opacity = 1;
}

estagio.funcaoperdeu = () => {
    console.log("Perdeu ");
    hPerdeu.style.display = "block";
    hPerdeu.innerText = "Voce perdeu meu amigo :("
    estagio.getEstagio().style.opacity = 0.3;
}

estagio.funcaopontuar = novaPontuacao => {
    hPontuacao.innerText = "Pontuacao: " + novaPontuacao;
}

//Impedir scroll na pagina
window.onscroll = ev => {
    ev.preventDefault();
}

//Informacoes extras
divBird.onclick = ev => {
    console.log(ev);
}

divEstagio.onclick = ev => {
    console.log(ev);
}

imgBird.onclick = ev => {
    console.log("Clicou no passaro");

}