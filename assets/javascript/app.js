// Global Values
let counter=30;
let currentQuestion=1;
let core=0;
let lost=0;
let timer;

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function timeUp() {
    clearInterval(timer);
    lost--; 
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
    counter=30;
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
loadQuestion();