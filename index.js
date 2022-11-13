const gameText = document.querySelector('.game-text');
const weaponChoices = document.querySelectorAll('.choice');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const playerText = document.querySelector('.player-text');
const computerText = document.querySelector('.computer-text');
const resultText = document.querySelector('.result-text');
const btnReset = document.querySelector('.btn-reset');

let playing,
	playerCurrScore,
	comCurrScore,
	playerWeapon,
	computerWeapon,
	winner;

const initGame = () => {
	// Initialize Values
	playing = true;
	playerCurrScore = 0;
	comCurrScore = 0;
	playerWeapon = null;
	computerWeapon = null;

	// Update Game Text
	playerScore.textContent = 0;
	computerScore.textContent = 0;
	playerText.textContent =
		'You slowly reach into your pocket to find your weapon...';
	computerText.textContent =
		'Your opponent eagerly awaits for your decision...';
	resultText.textContent = '_-_-_-_-_-_-_-_-_';

	// Update Classes
	playerScore.classList.remove('score-win', 'score-loss');
	computerScore.classList.remove('score-win', 'score-loss');
};

initGame();

// Computer Weapon Choice
const computerSelection = () => {
	const weapons = ['rock', 'paper', 'scissors'];
	const choice = Math.floor(Math.random() * weapons.length);
	computerWeapon = weapons[choice];
};

// Game Win Conditions
const gameWin = (playerWeapon, computerWeapon, winner) => {
	if (playing) {
		if (playerWeapon === computerWeapon) {
			return (winner = 'draw');
		}

		switch (playerWeapon) {
			case 'rock':
				computerWeapon === 'paper'
					? (winner = 'computer')
					: (winner = 'player');
				return winner;
			case 'paper':
				computerWeapon === 'scissors'
					? (winner = 'computer')
					: (winner = 'player');
				return winner;
			case 'scissors':
				computerWeapon === 'rock' ? (winner = 'computer') : (winner = 'player');
				return winner;
		}
	}
};

// Award point to winner
const awardPoint = (winner) => {
	if (playing) {
		switch (winner) {
			case 'player':
				playerCurrScore++;
				playerScore.textContent = playerCurrScore;
				resultText.textContent =
					'You have won this round, but the battle continues...';
				break;
			case 'computer':
				comCurrScore++;
				computerScore.textContent = comCurrScore;
				resultText.textContent =
					'You fall to your knees, but arise to continue the fight...';
				break;
			case 'draw':
				resultText.textContent =
					'You clash weapons, but both stand in defiance!';
		}

		if (playerCurrScore === 5 || comCurrScore === 5) {
			playing = false;

			if (playerCurrScore === 5) {
				playerText.textContent = 'As you strike your oponent...';
				computerText.textContent = 'They fall defeated...';
				resultText.textContent = 'But this is only the beginning...';
				playerScore.classList.add('score-win');
				computerScore.classList.add('score-loss');
			}
			if (comCurrScore === 5) {
				playerText.textContent = 'You are weak...';
				computerText.textContent = 'You have been defeated by a simple game...';
				resultText.textContent =
					'Imagine what I could do with more training...';
				playerScore.classList.add('score-loss');
				computerScore.classList.add('score-win');
			}
		}
	}
};

// Play Game
weaponChoices.forEach((item) => {
	item.addEventListener('click', (e) => {
		if (playing) {
			playerWeapon = e.target.id;
			playerText.textContent = `You have chosen ${playerWeapon} as your weapon!`;

			computerSelection();
			computerText.textContent = `Your opponent has chosen ${playerWeapon} as their weapon!`;

			winner = gameWin(playerWeapon, computerWeapon, winner);
			awardPoint(winner);
		}
	});
});

// Reset the Game
btnReset.addEventListener('click', () => {
	initGame();
});
