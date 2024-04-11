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

    const eventListen = () => {
        const squares = document.querySelectorAll('.square')
        squares.forEach(square => {
            square.addEventListener('click', (event) => {
                const squareIndex = parseInt((event.target.id).slice(7));
                console.log(squareIndex)
                Gameboard.setValue(squareIndex, activePlayer)
                switchPlayerTurn();
            })
        });
    }


    return {start, eventListen}
})();

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {  
    Game.start();
})