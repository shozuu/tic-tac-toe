const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        const boardContainer = document.querySelector('.gameboard');
        boardContainer.innerHTML = '';

        gameboard.forEach((square, index) => {
            boardContainer.innerHTML += `<div class='square' id='square-${index}'><p>${square}</p></div>`;// square is the value of the current element
        });
        Game.eventListen();
    }
    return {render}
})();

const Game = (() => {
    let players = []
    let activePlayer;


    const start = () => {
        players = [
            Gameboard.createPlayer(document.querySelector('.player1').value, 'X'),
            Gameboard.createPlayer(document.querySelector('.player2').value, '0')
        ]
        activePlayer = players[0];
        Gameboard.render();
    }
    return {start}
})();

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {  
    Game.start();
})