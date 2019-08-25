//  --------------- GLOBAL VARIABLES ------------------ //
let counter=15;
let currentQuestion=0;
let score=0;
let timer;
var document = new Document();
// answerCounter & answerTimer are for transitions between selected answer and next question
let answerCounter = 5;
let answerTimer;


// ----------------------- FUNCTIONS ----------------------- //

// Intro Monologue from The Riddler, will disappear once game begins 
function displayIntro() {
    var welcome = `
    <h1>Riddler Me This!</h1>
    <p>What's nowhere but everywhere, except where something <b>Was</b>?</p>
    <h3>GOTHAM AFTER I BLOW IT TO SMITHEREENS!</h3>
    <p>I hope your favorite triva topic is <b>YOU</b>, Batman! because the fate of your precious city depends on it!</p>
    <p>Let Us Begin!</p>
    `
    $("#game").html(welcome);
}
displayIntro();

// function that loads up next object (question) in batmanQuestion Array in questions.js. will also call endGame function when there are no more questions
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

// When there are no more questions left in batmanQuestion Array, this function is called to see if you win or lose, and resets game if you so choose, with reset button.
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
    if (score < 6) {
        $("#game").html(gameOver);
    }

    else {
        $("#game").html(happyEnding);
    }
}

// grabs id="reset" (the reset button in endGame function) and when clicked, will reset game from the top
$(document).on('click', '#reset', function(){
    counter = 15;
    currentQuestion = 0;
    score = 0;
    timer = null;
    loadQuestion();
})

// function that counts down our AnswerCounter from 5 to 0. whenever answerCounter===0, next questions is loaded on screen.
function transitionCountDown () {
    if (answerCounter > 0) {
        answerCounter--;
    }

    if (answerCounter===0) {
        nextQuestion();
    }
    console.log(answerCounter)
}

// Whenver var counter === 0, time is up and the following is presented to the screen, which then starts the transitionTimer, counting down the answerCounter from 5 to 0.
function timeUp() {

    var outOfTime = `
    <h1>Time's Up Batman!</h1>
    <p>The correct answer is: ${batmanQuestions[currentQuestion].answer}</p>
    `
    clearInterval(timer);
    $("#game").html(outOfTime);
    answerTimer = setInterval(transitionCountDown, 1000);
}

// function that lets counter count down from 15 to 0. whenever counter === 0, the timeUp function is called.
function countDown() {
    if (counter > 0) {
        counter--;
    }

    if (counter===0) {
        timeUp();
    }
    $('#time').html('Time Left: ' + counter);
}

// Whenever we click on the element with the id of startButton (begin button), the loadQuestion function is called.
$("#startButton").click(function() {
    loadQuestion();
})

// Function that displays question on the screen via id = "game" and displays our timer via id ="time".
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


// function that loads all our choices from our batmanQuestion Array
function loadChoices(choices) {
    let result='';

    for(let i=0;i<choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}


// function that compares the answer we chose verses the correct answer. If answer is correct, var right will be displayed and var score will increment. if answer is incorrect, var wrong will be diplayed.
function questionAnswered(selAnswer, corAnswer) {
    var right= `
    <h1>Correct!</h1>
    <h3>Answer: ${corAnswer}</h3>
    <p>Keep 'em coming, Batman! Gotham is DYING to see you win.</p>
    `

    var wrong = `
    <h1>Wrong!</h1>
    <h3>Your Pathetic Answer: ${selAnswer}
    <h3>Correct Answer: ${corAnswer}</h3>
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

// choice Buttons
$(document).on('click', '.choice', function(){
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = batmanQuestions[currentQuestion].answer;
    questionAnswered(selectedAnswer, correctAnswer);
})
