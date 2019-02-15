var questionCount = 0;
var score = 0;
var answer;
var timedOut = 0;
var rand;
var record = [];
var status = 0;

var quiz = $('quiz');
var quizSet = $('quizSet');
var resultBox = $('resultBox');
var question = $('question');
var option1 = $('option1');
var option2 = $('option2');
var option3 = $('option3');
var option4 = $('option4');
var submit = $('submit');
var progress = $('progress');
var result = $('result');
var retake = $('retake');
var button1 = $('btn1');
var button2 = $('btn2');
var button3 = $('btn3');
var button4 = $('btn4');

var tracker;
var countDown;
var secondsInput = 5;
var seconds = secondsInput;
var t;

function setQuestion(qCount, rand)
{
    var questionItems = questions[rand];
    question.textContent = (qCount + 1) + ". " + questionItems.question;
    option1.textContent = questionItems.option1;
    option2.textContent = questionItems.option2;
    option3.textContent = questionItems.option3;
    option4.textContent = questionItems.option4;
}

function changeProgressBar(qCount) {
    progress.innerHTML = 'Question ' + (qCount + 1) + " of 10";
    tracker = $('no' + (qCount + 1));
    tracker.style.backgroundColor = '#cc7a00';
}

function defaultOptionColors()
{
    button1.style.backgroundColor = '#e6f3ff';
    button2.style.backgroundColor = '#e6f3ff';
    button3.style.backgroundColor = '#e6f3ff';
    button4.style.backgroundColor = '#e6f3ff';
}

function getQuestion(qCount, rand)
{
    if(qCount == 9) { // this is the last question
        submit.innerHTML = 'Submit Test';
        submit.style.backgroundColor = '#00b300';
    }

    if(qCount > 9) {
        return;
    }

    setQuestion(qCount, rand);
    changeProgressBar(qCount);
    defaultOptionColors();

    startTimer(seconds, 'timer');
}

function setCorrect()
{
    score++;
    tracker.style.backgroundColor = '#009900';
}

function setWrong()
{
    tracker.style.backgroundColor = '#cc0000';
}

function finalScore()
{
    if(score > 5) {
        result.innerHTML = 'Congrats! You passed! <br>Your score is ' + score + '!';
    } else {
        result.innerHTML = 'Sorry. You failed.<br>Your score is ' + score + '!';
    }
}

function setResultPage()
{
    quizSet.style.display = 'none';
    resultBox.style.display = 'block';
    progress.innerHTML = 'Quiz completed';
    timer.textContent = '00:00';
    finalScore();
}

function randomGenerator()
{
    while (status == 0) {
        rand = Math.round(Math.random() * questions.length);

        if(rand !== questions.length) {
            for(var j = 0; j < record.length; j++) {
                if(rand === record[j]) {
                    break;
                } else if (j == record.length - 1) {
                    record[questionCount] = rand;
                    status = 1;
                }
            }
        }
    }

    status = 0;
    return rand;
}

function startTimer(secs, elem)
{
    t = $(elem);
    t.innerHTML = '00:' + secs;

    if(secs < 0) {
        clearTimeout(countDown);

        if(button1.style.backgroundColor !== "rgb(26, 255, 26)"
            && button2.style.backgroundColor !== "rgb(26, 255, 26)"
            && button3.style.backgroundColor !== "rgb(26, 255, 26)"
            && button4.style.backgroundColor !== "rgb(26, 255, 26)")
        {
            if(questionCount == 9) {
                setWrong();
                setResultPage();
                return;
            }

            setWrong();
            secs = secondsInput;
            getQuestion(++questionCount, randomGenerator());

        } else {
            if(questionCount == 9) {
                if (answer === questions[rand].answer) {
                    setCorrect();
                } else {
                    setWrong();
                }
                setResultPage();
                return;
            }

            if(answer == questions[rand].answer) {
                setCorrect();
                secs = secondsInput;
                getQuestion(++questionCount, randomGenerator());
            } else {
                setWrong();
                secs = secondsInput;
                getQuestion(++questionCount, randomGenerator());
            }
        }
        return;
    }

    secs--;
    countDown = setTimeout('startTimer('+secs+',"'+elem+'")', 1000);
}

option1.addEventListener('click', optionSelect);
option2.addEventListener('click', optionSelect);
option3.addEventListener('click', optionSelect);
option4.addEventListener('click', optionSelect);

function optionSelect(e)
{
    var parentEl = e.target.parentElement;
    parentEl.style.backgroundColor = '#1aff1a';

    switch (e.target.id) {
        case 'option1':
            button2.style.backgroundColor = '#e6f3ff';
            button3.style.backgroundColor = '#e6f3ff';
            button4.style.backgroundColor = '#e6f3ff';
            break;
        case 'option2':
            button1.style.backgroundColor = '#e6f3ff';
            button3.style.backgroundColor = '#e6f3ff';
            button4.style.backgroundColor = '#e6f3ff';
            break;
        case 'option3':
            button1.style.backgroundColor = '#e6f3ff';
            button2.style.backgroundColor = '#e6f3ff';
            button4.style.backgroundColor = '#e6f3ff';
            break;
        case 'option4':
            button1.style.backgroundColor = '#e6f3ff';
            button2.style.backgroundColor = '#e6f3ff';
            button3.style.backgroundColor = '#e6f3ff';
            break;
    }

    answer = parseInt(e.target.id.replace('option', ''));
}

submit.addEventListener('click', nextQuestion);

function nextQuestion()
{
    console.log(button1.style.backgroundColor);
	console.log(button1.style.backgroundColor !== "rgb(26, 255, 26)");
    if(button1.style.backgroundColor !== "rgb(26, 255, 26)" && button2.style.backgroundColor !== "rgb(26, 255, 26)" && button3.style.backgroundColor !== "rgb(26, 255, 26)" && button4.style.backgroundColor !== "rgb(26, 255, 26)")
    {
        alert('Please select an option');
        return;
    } else {
        clearTimeout(countDown);
        secs = secondsInput;

        if(questionCount == 9 && questionCount != 10) {
            if(answer == questions[rand].answer) {
                setCorrect();
            } else {
                setWrong();
            }
            setResultPage();
            return;
        }

        if(answer == questions[rand].answer) {
            setCorrect();
            getQuestion(++questionCount, randomGenerator());
        } else {
            setWrong();
            getQuestion(++questionCount, randomGenerator());
        }
    }
}

retake.addEventListener('click', retakeTest);

function retakeTest() {
    window.location.reload();
}

rand = Math.round(Math.random() * questions.length);
while(rand == question.length) {
    rand = Math.round(Math.random() * questions.length);
}

record[0] = rand;

window.onload = getQuestion(questionCount, rand);
