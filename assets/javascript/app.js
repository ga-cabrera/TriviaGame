// Global Values
let counter=30;
let currentQuestion=1;
let core=0;
let lost=0;
let timer;

// Display questions and choices together
function loadQuestion() {
    var question = batmanQuestions[currentQuestion].question;
    var choices = batmanQuestions[currentQuestion].choices;
    $("#timer").html('Time Left: ' + counter);
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