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

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {  
    Game.start();
})
