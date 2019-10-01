let boton = document.getElementById('boton');
let bombo = 0;
let cartonPlayer = 0;
let cartonCpu = 0;

const generateRandomNumCard = (bombo) => {
    let array = _.shuffle(bombo);
    array = array.slice(0, 15);

    return array;
}

const generateCard = (parent, cpBombo, player) => {
    let array = generateRandomNumCard(cpBombo);

    for(let i=0; i<15; i++){
        let div = document.createElement('div');
        div.className = `numCel ${player}num${i}`;
        div.textContent = `${array[i]}`;
        parent.appendChild(div);
    }  

    return array;
}

const crossNum = (ball) => {
    cartonPlayer.forEach((element, i) => { 
        if(element == ball){
            let num = document.querySelector(`.Pnum${i}`);
            num.className += " tachado";
        }
    });

    cartonCpu.forEach((element, i) => { 
        if(element == ball){
            let num = document.querySelector(`.Cnum${i}`);
            num.className += ' tachado';
        }
    });
}

const throwBall = () => {
    disBall  = bombo.pop();
    document.getElementById('numero').innerHTML = disBall;

    crossNum(disBall);
    calculateWinner();
}

const generateBombo = () => {
    bombo = _.range(1, 91);
    bombo = _.shuffle(bombo);

    generateRandomNumCard(bombo);

    cartonPlayer = generateCard(document.querySelector('.cartonPlayer'), bombo, 'P');
    cartonCpu = generateCard(document.querySelector('.cartonCpu'), bombo, 'C');
}

const showWinner = (claseName, whoWins) => {
    winner = `${whoWins} Wins!!`;
    carton = document.querySelector(`${claseName}`);
    carton.className = ' win';
    carton.textContent = winner;
    boton.remove();
}

const calculateWinner = () => {
    let player = document.querySelector('.cartonPlayer');
    let cpu = document.querySelector('.cartonCpu');

    if(player.querySelectorAll('.tachado').length == 15){
        showWinner('.cartonPlayer', 'Jugador');

    } 
    if(cpu.querySelectorAll('.tachado').length == 15){
        showWinner('.cartonCpu', 'CPU');
    } 
}

generateBombo();
throwBall();
boton.addEventListener('click', throwBall);
calculateWinner();