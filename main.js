const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const tituloStrong = document.querySelector(".app__title-strong");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoImput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarBtIcone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioPausa = new Audio("/sons/pause.mp3");
const audioTempoFinalizado = new Audio("/sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoImput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

/* ants de criar a função alterar Contexto
focoBt.addEventListener("click", () => {
  html.setAttribute("data-contexto", "foco");
  banner.setAttribute('src', '/imagens/foco.png')
});

curtoBt.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-curto");
  banner.setAttribute('src', '/imagens/descanso-curto.png')
});

longoBt.addEventListener('click', ()=>{
    html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', '/imagens/descanso-longo.png')
})*/

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  titulo.hasAttribute("h1", contexto);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarBtIcone.setAttribute("src", `/imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarBtIcone.setAttribute("src", `/imagens/play_arrow.png`);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
