// Global Values

let counter=15;
let currentQuestion=0;
let core=0;
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
    counter--;
    $('#time').html('Time Left: ' + counter);

    if (counter===0) {
        timeUp();
    }
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


$("#startButton").click(function() {
loadQuestion();

})

$(document).on('click', '.choice', function(){
    var selectedAnswer = $(this).attr('data-answer');
    console.log(selectedAnswer);
})