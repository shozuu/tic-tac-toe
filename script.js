const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const getGameboard = () => gameboard;

    const render = () => {
        Game.setRoundToFalse()
        const boardContainer = document.querySelector('.gameboard');
        boardContainer.innerHTML = '';

        gameboard.forEach((square, index) => {

            if (square === 'X') {
                boardContainer.innerHTML += `<div class='square' id='square-${index}'><p style='color:#F9B217'>${square}</p></div>`;// square is the value of the current element
            }
            else if (square === 'O') {
                boardContainer.innerHTML += `<div class='square' id='square-${index}'><p style='color:#0D98BA'>${square}</p></div>`;
            }
            else {
                boardContainer.innerHTML += `<div class='square' id='square-${index}'><p>${square}</p></div>`;
            }
            
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
        
        render();
        Game.checkWin();

        if (Game.getRoundOver() === true) return;
        Game.switchPlayerTurn();
        DisplayMessage.showPlayerTurn();
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

        if (document.querySelector('.player1').value === '' && document.querySelector('.player2').value === '') {
            players = [
                Gameboard.createPlayer('Player1', 'X'),
                Gameboard.createPlayer('Player2', 'O')
            ]
        }
        else if (document.querySelector('.player1').value === '' && document.querySelector('.player2').value != '') {
            players = [
                Gameboard.createPlayer('Player1', 'X'),
                Gameboard.createPlayer(document.querySelector('.player2').value, 'O')
            ]
        }
        else if (document.querySelector('.player1').value != '' && document.querySelector('.player2').value === '') {
            players = [
                Gameboard.createPlayer(document.querySelector('.player1').value, 'X'),
                Gameboard.createPlayer('Player2', 'O')
            ]
        }
        else {

            players = [
                Gameboard.createPlayer(document.querySelector('.player1').value, 'X'),
                Gameboard.createPlayer(document.querySelector('.player2').value, 'O')
            ]
        }
        
        activePlayer = players[0];
        DisplayMessage.showPlayerTurn();
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
        let colorCombo = [];

        winCombos.forEach(combo => {
            if (combo.every((element) => X.includes(element))) {
                if (colorCombo != '') return

                combo.forEach(element => {
                    colorCombo.push(element)
                });
                
                DisplayMessage.colorTiles(colorCombo, gameboard);
            }
            if (combo.every((element) => O.includes(element))) {
                if (colorCombo != '') return
                
                combo.forEach(element => {
                    colorCombo.push(element)
                });
                
                DisplayMessage.colorTiles(colorCombo, gameboard);
            }
        });

        if (resultX === true) {
            scoreboard().XAddScore();
            DisplayMessage.showXScore();
            DisplayMessage.showPlayerWin();
            endRound();
        }
        else if (resultO ===  true) {
            scoreboard().OAddScore();
            DisplayMessage.showOScore();
            DisplayMessage.showPlayerWin();
            endRound();
        }
        else if (tieCondition === true && resultX === false && resultO === false) {
            scoreboard().tieAddScore();
            DisplayMessage.showTieScore();
            DisplayMessage.showPlayerTie();
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
    }

    const setRoundToFalse = () => roundOver = false;

    const getRoundOver = () => roundOver;

    return {start, eventListen, switchPlayerTurn, getActivePlayer, checkWin, scoreboard, setRoundToFalse, getRoundOver}
})();

const DisplayMessage = (() => {
    const player1Score = document.querySelector('.player1Score');
    const player2Score = document.querySelector('.player2Score');
    const tieScore = document.querySelector('.tie');
    const playerTurn = document.querySelector('.player-turn');

    const showPlayerTurn = () => {
        playerTurn.innerHTML = `${Game.getActivePlayer().getPlayerName()}'s Turn`;
    }

    const showPlayerWin = () => {
        playerTurn.innerHTML = `${Game.getActivePlayer().getPlayerName()} Wins!`;
    }

    const showPlayerTie = () => {
        playerTurn.innerHTML = "It's a tie!";
    }

    const showXScore = () => {
        player1Score.textContent = Game.scoreboard().getXScore();
    }

    const showOScore = () => {
        player2Score.textContent = Game.scoreboard().getOScore();
    }

    const showTieScore = () => {
        tieScore.textContent = Game.scoreboard().getTie();
    }

    const colorTiles = (colorCombo, gameboard) => {
        const squares = document.querySelectorAll('.square')

        if (Game.getActivePlayer().getPlayerSymbol() === 'X') {
            colorCombo.forEach(index => {
                squares[index].style.backgroundColor = '#F9B217'
                squares[index].innerHTML = '<p style="color:#121212">X</p>';
            });
        }
        else if (Game.getActivePlayer().getPlayerSymbol() === 'O') {
            colorCombo.forEach(index => {
                squares[index].style.backgroundColor = '#0D98BA'
                squares[index].innerHTML = '<p style="color:#121212">O</p>';
            });
        }
    }

    return {showPlayerTurn, showPlayerWin, showPlayerTie, showXScore, showOScore, showTieScore, colorTiles}
})();



const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {  
    Game.start();

    const mask = document.querySelector('.mask');
    mask.addEventListener('click', () => {
        mask.classList.add('inactive');
    })

})

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', () => {
    if (Game.getActivePlayer().getPlayerSymbol() === 'O') {
        Game.switchPlayerTurn()
    }
    Gameboard.resetGameboard();
    DisplayMessage.showPlayerTurn();
    Gameboard.render();
})