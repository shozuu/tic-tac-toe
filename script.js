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

    const createPlayer = (playerName, playerSymbol) => {
        playerName,
        playerSymbol

        const getPlayerName = () => playerName;
        const getPlayerSymbol = () => playerSymbol;
        return {getPlayerName, getPlayerSymbol}
    }

    const setValue = (squareIndex, activePlayer) => {
        gameboard[squareIndex] = activePlayer.getPlayerSymbol();
        console.log(gameboard[squareIndex])
        render();
    }

    return {render, createPlayer, setValue}
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

    // const playRound = () => {
        
    // }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    return {start, eventListen, switchPlayerTurn, getActivePlayer}
})();



const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {  
    Game.start();
})

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', () => {
    console.log('working')
})