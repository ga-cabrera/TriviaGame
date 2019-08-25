// Global Values

let counter=15;
let currentQuestion=0;
let score=0;
let lost=0;
let timer;
var document = new Document();

function nextQuestion() {

    const noMoreQuestions = (batmanQuestions.length -1) === currentQuestion;
    if (noMoreQuestions) {
        console.log("End of Game");
    }
    else {
    currentQuestion++;
    loadQuestion();
    };
}

function timeUp() {
    clearInterval(timer);
    lost++; 

    nextQuestion();
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
    if (selAnswer===corAnswer) {
        alert("congrats! That is correct");
        console.log("You are correct!")
        score++;
        
    }
    else {
        alert("You lose, Batsy. Enough of these and Gotham will be a pile of rubble!!")

    }
    clearInterval(timer);
    nextQuestion();
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
