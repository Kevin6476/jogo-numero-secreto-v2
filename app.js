let numeroSecreto, tentativas,
    numeroSecretoMaximo = 10,
    numerosUsados = [];

function gerarNumeroSecreto() {
    let numeroAleatorio = Math.floor(Math.random() * numeroSecretoMaximo) + 1;

    if(numerosUsados.length === numeroSecretoMaximo) numerosUsados = [];

    if(numerosUsados.includes(numeroAleatorio)) {
        return gerarNumeroSecreto();
    } else {
        numerosUsados.push(numeroAleatorio);
        console.log('Numeros já usados: ', numerosUsados);
        return numeroAleatorio;
    }
}

function escreverTextoNaTela(tag, texto) {
    const elemento = document.querySelector(tag);
    elemento.innerText = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.5;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute() {
    const input = document.querySelector('input');
    const chute = parseInt(input.value);

    if (isNaN(chute) || chute < parseInt(input.min) || chute > parseInt(input.max)) {
        escreverTextoNaTela('h1', 'Valor inválido!');
        escreverTextoNaTela('p', `Digite um número entre ${input.min} e ${input.max}.`);
        input.value = '';
        return;
    }

    if (chute === numeroSecreto) {
        escreverTextoNaTela('h1', 'Parabéns! Você acertou!');
        escreverTextoNaTela('p', `Você acertou o número secreto em ${tentativas} tentativas!`);
        document.getElementById('chutar').disabled = true;
        document.getElementById('reiniciar').disabled = false;
    } else {
        let textoChuteErrado = `O número secreto é ${numeroSecreto > chute ? 'maior' : 'menor'} que ${chute}. Tente novamente!`;
        escreverTextoNaTela('h1', 'Errou!');
        escreverTextoNaTela('p', textoChuteErrado);
        document.querySelector('input').value = '';
        tentativas += 1;
    }
}

function iniciarOuReiniciarApp() {
    const input = document.querySelector('input');
    input.value = '';
    input.max = numeroSecretoMaximo;
    document.getElementById('chutar').disabled = false;
    document.getElementById('reiniciar').disabled = true;
    escreverTextoNaTela('h1', 'Bem vindo ao jogo do número secreto!');
    escreverTextoNaTela('p', `Escolha um número entre 1 e ${ numeroSecretoMaximo }`);
    numeroSecreto = gerarNumeroSecreto();
    tentativas = 1;
}

function definirNivelDificuldade() {
    const dificuldade = parseInt(prompt('Selecione um nível de dificuldade:\n1 - Fácil\n2 - Médio\n3 - Difícil'));

    if(dificuldade === 1) numeroSecretoMaximo = 10;
    else if(dificuldade === 2) numeroSecretoMaximo = 100;
    else if (dificuldade === 3) numeroSecretoMaximo = 1000;
    else {
        alert('Nível de dificuldade inválido! O jogo será iniciado no nível Fácil.');
        numeroSecretoMaximo = 10;
    }
    numerosUsados = [];
    iniciarOuReiniciarApp();
}

iniciarOuReiniciarApp();