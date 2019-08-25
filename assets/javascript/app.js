// Global Values

let counter=15;
let currentQuestion=0;
let score=0;
// answerCounter & answerTimer are for transitions between selected answer and next question
let answerCounter = 5;
let answerTimer;
// --------------------------
let timer;
var document = new Document();

function nextQuestion() {
    clearInterval(answerTimer);

    const noMoreQuestions = (batmanQuestions.length -1) === currentQuestion;
    if (noMoreQuestions) {
        endGame();
        console.log("End of Game");
    }
    else {
    currentQuestion++;
    loadQuestion();
    };
}

function endGame () {
    var gameOver = `
    <h1>Game Over</h1>
    <h3>Score: ${score}??</h3>
    <p> Enjoy your city in ASHES!</p>
    <button class= "btn btn-dark" id= "reset">Play Again</button>
    `
    var happyEnding = `
    <h1>Game Over</h1>
    <h3>Score: ${score}</h3>
    <p> Guess that's enough to keep your precious Gotham alive. Until next time, Batman!</p>
    <button class= "btn btn-dark" id= "reset">Play Again</button>
    `
    if (score < 4) {
        $("#game").html(gameOver);
    }

    else {
        $("#game").html(happyEnding);
    }
}

// click function for resetting game
$(document).on('click', '#reset', function(){
    counter = 15;
    currentQuestion = 0;
    score = 0;
    timer = null;
    loadQuestion();
})

function transitionCountDown () {
    if (answerCounter > 0) {
        answerCounter--;
    }

    if (answerCounter===0) {
        nextQuestion();
    }
    console.log(answerCounter)
}

function timeUp() {

    var outOfTime = `
    <h1>Time's Up Batman!</h1>
    <p>The correct answer is: ${batmanQuestions[currentQuestion].answer}</p>
    `
    clearInterval(timer);
    $("#game").html(outOfTime);
    answerTimer = setInterval(transitionCountDown, 1000);
}

function countDown() {
    if (counter > 0) {
        counter--;
    }

    if (counter===0) {
        timeUp();
    }
    $('#time').html('Time Left: ' + counter);
}

// Display questions and choices together
function loadQuestion() {
    $("#startButton").hide();
    counter=15;
    answerCounter = 5;
    timer= setInterval(countDown, 1000);

    var question = batmanQuestions[currentQuestion].question;
    var choices = batmanQuestions[currentQuestion].choices;
    $("#time").html('Time Left: ' + counter);
    $("#game").html(`
    <h4> ${question} </h4>
    ${loadChoices(choices)}
    `);
};


// Dispay all our choices at once
function loadChoices(choices) {
    let result='';

    for(let i=0;i<choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}



function questionAnswered(selAnswer, corAnswer) {
    var right= `
    <h1>Correct!</h1>
    <h3>Correct Answer: ${batmanQuestions[currentQuestion].answer}</h3>
    <p>Keep 'em coming, Batman! Gotham is DYING to see you win.</p>
    `

    var wrong = `
    <h1>Wrong!</h1>
    <h3>Correct Answer: ${batmanQuestions[currentQuestion].answer}</h3>
    <p>Bats! Your memory fails you! Enough of these and Gotham will be a pile of rubble!</p>
    `
    
    
    if (selAnswer===corAnswer) {
        $("#game").html(right);
        console.log("You are correct!")
        score++;
        
    }
    else {
        $("#game").html(wrong);
        console.log("you got it wrong!")
    }
    clearInterval(timer);
    answerTimer = setInterval(transitionCountDown, 1000);
    console.log("your peasant answer: " + selAnswer);
    console.log("MYYY ANSWERR: " + corAnswer);
}


$("#startButton").click(function() {
loadQuestion();

})
// choice Buttons
$(document).on('click', '.choice', function(){
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = batmanQuestions[currentQuestion].answer;
    questionAnswered(selectedAnswer, correctAnswer);
})
