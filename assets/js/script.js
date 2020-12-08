const statBtn = document.querySelector('.start-btn');
const main = document.querySelector('main');
// let audio = new Audio;
// audio.src='../sounds/final_answer.mp3';

let questionNumber = 0;
let score = 0;

const checkAnswer = (correctIndex) => {
    const progressBar = document.querySelector('.progress-bar');
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            if (answer.id == correctIndex) {
                console.log(true);
                score++;
                progressBar.classList.add('progress-true');
                
            }else{
                console.log(false);
                progressBar.classList.add('progress-false');
            }
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
    questions[questionNum].answerList.forEach(element => {
        let answer = document.createElement('div');
        answer.innerText = element
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

    checkAnswer(questions[questionNum].correctAnswer);
}

statBtn.addEventListener('click', (e) => {
    e.preventDefault();
    renderQuiz(questionNumber);
    // audio.play;
})

const pasNextQuestion = () => {
    const quiz = document.querySelector('.quiz');
    questionNumber++;
    if (!(questionNumber == questions.length)){
        setTimeout(() => {
            quiz.remove();
            renderQuiz(questionNumber);
            console.log('passed next question');
        }, 5000);
    }
    
}