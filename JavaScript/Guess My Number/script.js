'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
// document.querySelector('.number').textContent = secretNumber;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    // When There is no input
    // if no guess num
    if(!guess){
        // document.querySelector('.message').textContent = '🙈 No Number!';
        displayMessage('🙈 No Number!');

    // When player wins
    } else if (guess === secretNumber) {
        // document.querySelector('.message').textContent = '🥳 Correct Number!';
        displayMessage('🥳 Correct Number!');

        // When player wins display the secrete number
        document.querySelector('.number').textContent = secretNumber;

        // changing body CSS color background when wins
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        // Implementing Highscore and also keeping scores to the variable
        if(score > highscore){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        };

        // When Guess is wrong
    } else if (guess !== secretNumber) {
        if(score > 1) {
            // document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
            displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
            // score = score - 1;
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            // document.querySelector('.message').textContent = '😞 You lost the game';
            displayMessage('😞 You lost the game');
            document.querySelector('.score').textContent = 0;
        };
    };
});


document.querySelector('.again').addEventListener('click', function(){
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    // document.querySelector('.message').textContent = 'Start guessing...';
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});