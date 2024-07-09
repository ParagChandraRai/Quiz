const questions = [
    {
        question: "Who developed the C programming language?",
        options: ["Dennis Ritchie", "Ken Thompson", "Bjarne Stroustrup", "Brian Kernighan"],
        answer: 0
    },
    {
        question: "Which of the following is not a valid variable name in C?",
        options: ["my_var", "var_1", "123var", "_var"],
        answer: 2
    },
    {
        question: "What is the result of 5 + 3 * 2 in C?",
        options: ["16", "11", "13", "10"],
        answer: 1
    },
    {
        question: "Which of the following is used to comment in C?",
        options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
        answer: 1
    },
    {
        question: "What is the output of the following C code?\n\n#include <stdio.h>\nint main() {\n    int a = 5, b = 10;\n    a = a + b;\n    b = a - b;\n    a = a - b;\n    printf(\"%d %d\\n\", a, b);\n    return 0;\n}",
        options: ["5 10", "10 5", "0 0", "10 10"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let startTime;
const questionTimes = [];
const correctAnswers = [];

function loadNextQuestion() {
    if (currentQuestionIndex > 0) {
        const elapsedTime = (Date.now() - startTime) / 1000;
        questionTimes.push(elapsedTime);

        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const selectedAnswer = parseInt(selectedOption.value);
            const correctAnswer = questions[currentQuestionIndex - 1].answer;
            correctAnswers.push(selectedAnswer === correctAnswer);
            if (selectedAnswer === correctAnswer) {
                score++;
            }
        } else {
            correctAnswers.push(false);
        }
    }

    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    document.getElementById('option0').textContent = questionData.options[0];
    document.getElementById('option1').textContent = questionData.options[1];
    document.getElementById('option2').textContent = questionData.options[2];
    document.getElementById('option3').textContent = questionData.options[3];

    startTime = Date.now();
    currentQuestionIndex++;
}

function endQuiz() {
    const totalTimeInSeconds = questionTimes.reduce((acc, time) => acc + time, 0);
    const queryParams = new URLSearchParams({
        score: score,
        total: questions.length,
        timeTaken: totalTimeInSeconds,
        questionTimes: JSON.stringify(questionTimes),
        correctAnswers: JSON.stringify(correctAnswers)
    });

    window.location.href = `result.html?${queryParams.toString()}`;
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}

window.onload = function() {
    const timerDisplay = document.getElementById('timer');
    startTimer(60 * 5, timerDisplay);  // 5 minutes timer
    loadNextQuestion();
};
