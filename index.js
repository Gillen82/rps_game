const game = () => {
	let playerScore = 0;
	let computerScore = 0;
	let winner;

	// Game Components
	let playerPoints = document.querySelector('.player-points');
	let computerPoints = document.querySelector('.computer-points');
	let playerText = document.querySelector('.player-text');
	let computerText = document.querySelector('.computer-text');
	let result = document.querySelector('.result');
	const weapons = document.querySelectorAll('.choices');
	const reset = document.querySelector('.reset');

	playerPoints.innerText = playerScore;
	computerPoints.innerText = computerScore;

	// Style Scores
	playerPoints.classList.add('score-normal');
	computerPoints.classList.add('score-normal');

	// Player Selection
	const startBattle = () => {
		//Computer Selection
		const computerSelection = () => {
			const weapons = ['rock', 'paper', 'scissors'];
			const choice = Math.floor(Math.random() * weapons.length);
			const computerWeapon = weapons[choice];
			return computerWeapon;
		};

		// Choose Winner
		const chooseWinner = (res, win, play) => {
			win = play;

			// Add Point to winner and reset the round
			if (win === 'player') {
				res.innerHTML = `You have <span>won</span>... for now!`;
				++playerScore;
				playerPoints.innerText = playerScore;
				computerSelection();
			} else if (win === 'computer') {
				res.innerHTML = `You have <span>fallen</span>... but rise back to your feet!`;
				++computerScore;
				computerPoints.innerText = computerScore;
				computerSelection();
			} else {
				computerSelection();
			}

			checkScores(playerScore, computerScore);
		};

		// Check Scores
		const checkScores = (pScore, cScore) => {
			if (pScore === 5 || cScore === 5) {
				computerWeapon = null;
				weapons.forEach((weapon) => {
					weapon.removeEventListener('click', selectWeapons);
				});

				if (pScore === 5) {
					playerPoints.classList.add('score-win');
					computerPoints.classList.add('score-loss');
					playerText.innerHTML = `YOU ARE VICTORIOUS, BUT DON'T GET CARRIED AWAY!`;
					computerText.innerHTML = `THIS IS ONLY THE BEGINNING OF MY CODING JOURNEY!!`;
					result.innerText = '_-_-_-_-_-_-_-_-_';
				} else {
					computerPoints.classList.add('score-win');
					playerPoints.classList.add('score-loss');
					playerText.innerHTML = `YOU ARE WEAK AND HAVE FALLEN TO A SIMPLE COMPUTER GAME!`;
					computerText.innerHTML = `IMAGINE WHAT I COULD DO WITH MORE EXPERIENCE!!`;
					result.innerText = '_-_-_-_-_-_-_-_-_';
				}
			}
		};

		// Select Weapons
		function selectWeapons(e) {
			const playerWeapon = e.target.id;
			let computerWeapon = computerSelection();

			playerText.innerHTML = `You have chosen the mighty <span>${playerWeapon}</span> as your weapon!`;
			computerText.innerHTML = `Your opponent has chosen <span>${computerWeapon}</span>!`;

			switch (playerWeapon) {
				case computerWeapon:
					result.innerHTML = `The battle ends in a <span>draw</span>!`;
					winner = null;
					break;
				case 'rock':
					computerWeapon === 'paper'
						? chooseWinner(result, winner, 'computer')
						: chooseWinner(result, winner, 'player');
					break;
				case 'paper':
					computerWeapon === 'scissors'
						? chooseWinner(result, winner, 'computer')
						: chooseWinner(result, winner, 'player');
					break;
				case 'scissors':
					computerWeapon === 'rock'
						? chooseWinner(result, winner, 'computer')
						: chooseWinner(result, winner, 'player');
					break;
			}
		}

		weapons.forEach((weapon) => {
			weapon.addEventListener('click', selectWeapons);
		});
	};

	startBattle();

	const resetGame = () => {
		console.log('Reset');

		playerPoints.classList.remove('score-win', 'score-loss');
		playerPoints.classList.add('score-normal');
		computerPoints.classList.remove('score-win', 'score-loss');
		computerPoints.classList.add('score-normal');

		playerScore = 0;
		playerPoints.innerText = playerScore;
		computerScore = 0;
		computerPoints.innerText = computerScore;

		playerText.innerHTML = `You slowly reach into your pocket to find your weapon...`;
		computerText.innerHTML = `Your opponent eagerly awaits for your decision...`;

		startBattle();
	};

	reset.addEventListener('click', resetGame);
};

game();
