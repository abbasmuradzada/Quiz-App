const startBtn = document.querySelector('.start-btn');
const main = document.querySelector('main');
const scoreText = document.querySelector('.score');
const playerForm = document.querySelector('form');
const moduleBg = document.querySelector('.module-bg');
const playerInput = document.getElementById('player-name');
// const restartBtn = document.querySelector('.restart-btn');
// let audio = new Audio;
// audio.src='../sounds/final_answer.mp3';

let questionNumber = 0;
let score = 0;
let playerName;

const checkAnswer = (correctIndex) => {
    const progressBar = document.querySelector('.progress-bar');
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            if (answer.id == correctIndex) {
                console.log(true);
                score++;
                progressBar.classList.add('progress-true');
                answer.classList.add('correct-answer');
            }else{
                console.log(false);
                progressBar.classList.add('progress-false');
                answer.classList.add('wrong-answer');
            }
            scoreText.innerText=score;
            pasNextQuestion();
        })
    });
}

const renderQuiz = (questionNum) => {
    const quiz = document.createElement('div');
    quiz.className='quiz';
    const quizHeader = document.createElement('div');
    quizHeader.className = 'quiz-header';
    quizHeader.innerText= `Question ${questions[questionNum].id} / ${questions.length}`
    const question = document.createElement('span');
    question.className='question';
    question.innerText=questions[questionNum].question;
    quiz.append(quizHeader, question);
    let answerId = 1;
    //
    questions[questionNum].answerList.forEach((element, index) => {
        let answer = document.createElement('div');
        answer.innerText = `${variants[index]})      ${element}`
        answer.className='answer';
        answer.id = answerId;
        answerId++;
        quiz.append(answer);
        main.appendChild(quiz);
        
    });
    //Create Timeline
    let timeLine = document.createElement('div');
    timeLine.className='timeline';
    let progressbar = document.createElement('div');
    progressbar.className='progress-bar';
    timeLine.appendChild(progressbar);
    quiz.append(timeLine);

    scoreText.innerText=score;

    checkAnswer(questions[questionNum].correctAnswer);
}

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playerName = playerInput.value;
    renderQuiz(questionNumber);
    playerForm.remove();
    // audio.play;
})

const restartQuiz = () => {
    const quiz = document.querySelector('.quiz');
    moduleBg.style.display = 'none';
    score = 0;
    questionNumber = 0;
    quiz.remove();
    renderQuiz(questionNumber);
}

const formModal = () => {
    moduleBg.style.display = 'block';
    moduleBg.firstElementChild.innerText=`Congrats ${playerName}. ${score<3 ? 'Not Bad' : 'Good'}. Your score is ${score}`;
    restartBtn = document.createElement('button');
    restartBtn.innerText='Restart Quiz'
    moduleBg.firstElementChild.appendChild(restartBtn);
    restartBtn.addEventListener('click', ()=>{
        restartQuiz();
    })
}

const pasNextQuestion = () => {
    const quiz = document.querySelector('.quiz');
    questionNumber++;
    setTimeout(() => {
        if(questionNumber == questions.length){
            formModal();
        }else{
            quiz.remove();
            renderQuiz(questionNumber);
        }
    }, 500);   
    
}