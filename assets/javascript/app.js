// Global Values
let counter=30;
let currentQuestion=0;
let core=0;
let lost=0;
let timer;

// Display questions and choices together
function loadQuestion() {
    var question = batmanQuestions[currentQuestion].question;
    var choices = batmanQuestions[currentQuestion].choices;
    $("#timer").html('Time Left: ' + counter);
    $("#game").html(`<h4> ${question} </h4>`);
    };
loadQuestion();