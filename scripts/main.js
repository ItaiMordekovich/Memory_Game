import { createGameImageArray } from "./cards.js";

const grid = document.getElementById('grid-container');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');

let firstPlayerName = prompt('First Player Name', '');
let secondPlayerName = prompt('Second Player Name', '');
let cardsNumber = Number(prompt('How many Cards you want to play? between 8-20..'));

let card1 = null;
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;



function flip(event) {
    const card = event.currentTarget;

    if (card === card1) {
        return;
    }

    card.classList.toggle('flip');

    if (card1 == null) {
        card1 = card;
    } else {
        if (card1.dataset.id == card.dataset.id) {
            card1.classList.add('opacity')
            card.classList.add('opacity')
            card.removeEventListener('click', flip);
            card1.removeEventListener('click', flip);
            card1 = null;

            if (currentPlayer === 1) {
                player1Score++;
                player1ScoreDisplay.textContent = `${firstPlayerName}'s Score: ${player1Score}`;
            } else {
                player2Score++;
                player2ScoreDisplay.textContent = `${secondPlayerName}'s Score: ${player2Score}`;
            }
            if (player1Score + player2Score === images.length / 2) {
                endGame();
            }
        } else {
            setTimeout(() => {
                card.classList.remove('flip');
                card1.classList.remove('flip');
                card1 = null;
                currentPlayer = currentPlayer === 1 ? 2 : 1;
            }, 1000)
        }
    }
}

function endGame() {
    let winner;

    function winnerIs() {
        setTimeout(winnerAlert, 500);
    }

    function winnerAlert() {
        alert(`Game Over.. ${winner} wins!`);
    }
    function tie() {
        setTimeout(tieAlert, 500);
    }

    function tieAlert() {
        alert("It's a tie.. you both Won!");
    }
    if (player1Score > player2Score) {
        winner = `${firstPlayerName}`;
        winnerIs();
    } else if (player2Score > player1Score) {
        winner = `${secondPlayerName}`;
        winnerIs();
    } else {
        tie();
    }

}

const images = createGameImageArray(`${cardsNumber}`);

images.forEach(s => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.addEventListener('click', flip);
    const back = document.createElement('img');
    back.classList.add('back')
    back.src = 'images/back-card.webp';
    back.alt = 'card-back';

    const front = document.createElement('img');
    front.classList.add('front');
    front.src = s;
    front.alt = s
        .replace('images/', '')
        .replace('.webp', '');

    div.dataset.id = front.alt;

    div.appendChild(back);
    div.appendChild(front);

    grid.appendChild(div);
});
