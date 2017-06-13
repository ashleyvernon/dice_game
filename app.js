/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		// Random number
		var dice = Math.floor((Math.random() * 6) + 1);
		////set

		//2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice + '.png';

		//3. Update the round score IF the rolled number was NOT a 1
		if (dice !== 1){
			//add the dice
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else if (dice == 6) {
			var pastDice = 6;
			dice = pastDice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			document.getElementById('current-' + activePlayer).textContent = 0;
			nextPlayer();
		}
	} 

})

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying){
		//add current score to global score
		scores[activePlayer] += roundScore;

		//update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if player won the game
		if(scores[activePlayer] >= 20) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';		
			gamePlaying = false;
		} else {
			//next
			nextPlayer();		
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';		
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {
	gamePlaying = true;
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;	
	document.querySelector('.dice').style.display = 'none';		
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

// var x = document.querySelector('#score-0').textContent;


// activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
///////////////is the same as///////////////
//if (activePlayer === 0) {
// 	activePlayer = 1;
// } else {
// 	activePlayer = 0;
// }





