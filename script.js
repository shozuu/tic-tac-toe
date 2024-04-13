const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const getGameboard = () => gameboard;

    const render = () => {
        Game.setRoundToFalse()
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
        if (gameboard[squareIndex] != '') return;
        gameboard[squareIndex] = activePlayer.getPlayerSymbol();
        
        Game.switchPlayerTurn();
        render();
        Game.checkWin();
    }

    const resetGameboard = () => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
    }

    return {getGameboard, render, createPlayer, setValue, resetGameboard}
})();

const Game = (() => {
    let players = []
    let activePlayer;
    let roundOver;
    let XScore = 0;
    let tie = 0;
    let OScore = 0;


    const start = () => {
        if(players.length != 0) return
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
                if (roundOver === true) return;
                const squareIndex = parseInt((event.target.id).slice(7));
                Gameboard.setValue(squareIndex, activePlayer)
            })
        });
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const checkWin = () => {
        let gameboard = Gameboard.getGameboard();
        let tieCondition = gameboard.every((square) => square != '');
        let X = [];
        let O = [];
        let winningCombo = [];
        const winCombos = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]  
        ];

        gameboard.forEach((square, index) => {
            if (square === 'X') {
                X.push(index)
            }
            else if (square === 'O') {
                O.push(index)
            }
            else return;
        });

        let resultX = winCombos.some((combo) => combo.every((element) => X.includes(element)));
        let resultO = winCombos.some((combo) => combo.every((element) => O.includes(element)));

        if (resultX === true) {
            scoreboard().XAddScore();
            DisplayMessage.showXScore();
            endRound();
        }
        else if (resultO ===  true) {
            scoreboard().OAddScore();
            DisplayMessage.showOScore();
            endRound();
        }
        else if (tieCondition === true && resultX === false && resultO === false) {
            scoreboard().tieAddScore();
            DisplayMessage.showTieScore();
            endRound();
        }
    }

    const scoreboard = () => {
        const XAddScore = () => XScore++;
        const tieAddScore = () => tie++;
        const OAddScore = () => OScore++;

        const getXScore = () => XScore;
        const getTie = () => tie;
        const getOScore = () => OScore;

        return {XAddScore, tieAddScore, OAddScore,  getXScore, getTie, getOScore}
    }

    const endRound = () => {
        roundOver = true;
        switchPlayerTurn();
        // Gameboard.resetGameboard();
        // Gameboard.render();
    }

    const setRoundToFalse = () => roundOver = 'false';

    return {start, eventListen, switchPlayerTurn, getActivePlayer, checkWin, scoreboard, setRoundToFalse}
})();

const DisplayMessage = (() => {
    const player1Score = document.querySelector('.player1Score');
    const player2Score = document.querySelector('.player2Score');
    const tieScore = document.querySelector('.tie');

    const showXScore = () => {
        player1Score.textContent = Game.scoreboard().getXScore();
    }

    const showOScore = () => {
        player2Score.textContent = Game.scoreboard().getOScore();
    }

    const showTieScore = () => {
        tieScore.textContent = Game.scoreboard().tieScore();
    }

    return {showXScore, showOScore, showTieScore}
})();



const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {  
    Game.start();
})

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', () => {
    if (Game.getActivePlayer().getPlayerSymbol() === 'O') {
        Game.switchPlayerTurn()
    }
    Gameboard.resetGameboard();
    Gameboard.render();
})