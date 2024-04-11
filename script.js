const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const getGameboard = () => gameboard;

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
        if (gameboard[squareIndex] != '') return
        gameboard[squareIndex] = activePlayer.getPlayerSymbol();
        render();
        Game.checkWin();
    }

    return {getGameboard, render, createPlayer, setValue}
})();

const Game = (() => {
    let players = []
    let activePlayer;


    const start = () => {
        players = [
            Gameboard.createPlayer(document.querySelector('.player1').value, 'X'),
            Gameboard.createPlayer(document.querySelector('.player2').value, 'O')
        ]
        activePlayer = players[0];
        Gameboard.render();
    }

    const eventListen = () => {
        const squares = document.querySelectorAll('.square')
        squares.forEach(square => {
            square.addEventListener('click', (event) => {
                const squareIndex = parseInt((event.target.id).slice(7));
                Gameboard.setValue(squareIndex, activePlayer)
                switchPlayerTurn();
            })
        });
    }

    const checkWin = () => {
        const winCombos = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ]
        console.log(Gameboard.getGameboard())
        let gameboard = Gameboard.getGameboard();
        let X = []
        let O = []

        gameboard.forEach((square, index) => {
            if (square === 'X') {
                X.push(index)
            }
            else if (square === 'O') {
                O.push(index)
            }
            else return;
        });

        winCombos.forEach(combo => {
            console.log('combo:', combo)
            let result = X.includes(combo);
            console.log(result, X)
            // if (result === 'false') console.log('true')
            //maybe because the one you are checking also has [] counted so it always returns false
        });

        console.log('x: ', X, 'o: ', O)
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    return {start, eventListen, checkWin, switchPlayerTurn, getActivePlayer}
})();



const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {  
    Game.start();
})

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', () => {
    console.log('working')
    // Game.restart();
})