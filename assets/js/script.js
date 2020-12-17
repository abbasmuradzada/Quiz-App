const startBtn = document.querySelector('.start-btn');
const main = document.querySelector('main');
const logo = document.querySelector('.logo');
const scoreText = document.querySelector('.score');
const playerForm = document.querySelector('form');
const moduleBg = document.querySelector('.module-bg');
const playerInput = document.getElementById('player-name');
const jokers = document.querySelector('.jokers');
const telJokerBtn = document.querySelector('.tel-joker')
const peopleJokerBtn = document.querySelector('.people-joker')
const jokerModal = document.querySelector('.joker-module-bg'); 
// const restartBtn = document.querySelector('.restart-btn');

let audio = new Audio;
audio.autoplay = true;
audio.src = mainAudio;
let questionNumber = 0;
let score = 0;
let playerName;
const salam = 'd';
// Check Answer
const checkAnswer = (correctIndex) => {
    let clickable = true;
    const progressBar = document.querySelector('.progress-bar');
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.addEventListener('click', () => {            
            if (clickable) {
                if (answer.id == correctIndex) {
                    console.log(true);
                    audio.src = correctAudio;
                    score++;
                    progressBar.classList.add('progress-true');
                    answer.classList.add('correct-answer');
                }else{
                    console.log(false);
                    audio.src = wrongAudio;
                    progressBar.classList.add('progress-false');
                    answer.classList.add('wrong-answer');
                    document.getElementById(correctIndex).classList.add('correct-answer-of-wrong');
                }
                scoreText.innerText=score;
                pasNextQuestion();
                clickable = false;
            }
        })
        return
    });
}

//Render Quiz
const renderQuiz = (questionNum) => {
    audio.src = startAudio;
    const quiz = document.createElement('div');
    quiz.className='quiz';
    const quizHeader = document.createElement('div');
    quizHeader.className = 'quiz-header';
    quizHeader.innerText= `Question ${questions[questionNum].id} / ${questions.length}`
    const question = document.createElement('div');
    question.className='question';
    question.innerText=questions[questionNum].question;
    quiz.append(quizHeader, question);
    let answerId = 1;
    // Create Answers
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
    jokers.style.display='block';
    scoreText.innerText=`Score: ${score}`;
    checkAnswer(questions[questionNum].correctAnswer);
    useJoker(questions[questionNum].answerList[questions[questionNum].correctAnswer - 1], questions[questionNum].correctAnswer);
}

// Start Quiz
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logo.remove();
    playerName = playerInput.value;
    renderQuiz(questionNumber);
    playerForm.remove();
})

// Restart Quiz
const restartQuiz = () => {
    moduleBg.style.display = 'none';
    score = 0;
    questionNumber = 0;
    renderQuiz(questionNumber);
}

// Create Modal
const formModal = () => {
    moduleBg.style.display = 'block';
    moduleBg.firstElementChild.innerText=`Congrats ${playerName}. ${score < (questions.length/2) ? 'Not Bad' : 'Good'}. Your score is ${score}`;
    restartBtn = document.createElement('button');
    restartBtn.innerText='Restart Quiz';
    goMenuBtn = document.createElement('button');
    goMenuBtn.innerText='Undo Menu';
    moduleBg.firstElementChild.append(restartBtn, goMenuBtn);
    restartBtn.addEventListener('click', ()=>{
        restartQuiz();
    })
    goMenuBtn.addEventListener('click', () => {
        window.location.reload();
    })
}

// Next Question
const pasNextQuestion = () => {
    const quiz = document.querySelector('.quiz');
    questionNumber++;
    setTimeout(() => {
        quiz.remove();
        if(questionNumber == questions.length){
            formModal();
            audio.src = breakAudio;
        }else{
            renderQuiz(questionNumber);
        }
    }, 5000);     
}

// Jokers
const useJoker = (correctAnswer, cIndex) => {
    telJokerBtn.addEventListener('click', () => {
        jokerModal.firstElementChild.firstElementChild ? jokerModal.firstElementChild.firstElementChild.remove() : null;
        let text;
        audio.src = jokerAudio;
        jokerModal.style.display='block';
        const friendsList = document.createElement('div');
        friendsList.className='friends-list';
        jokerModal.firstElementChild.appendChild(friendsList);
        frends.forEach(friend => {
            const friendCard = document.createElement('div');
            friendCard.className = 'friend-card';
            const friendName = document.createElement('span');
            friendName.innerText = friend.name;
            const friendImg = document.createElement('img');
            friendImg.src = friend.imgUrl;
            const friendStatus = document.createElement('p');
            friendStatus.innerText = friend.status;
            friendCard.append(friendName, friendImg, friendStatus);
            friendsList.appendChild(friendCard);
        
            document.querySelectorAll('.friend-card').forEach(element => {
                element.addEventListener('click', () => {
                    text = `${element.firstElementChild.innerText}: In my opinion correct answer is ${correctAnswer}`
                    element.parentElement.remove();
                    jokerModal.firstElementChild.innerText= text;
                    telJokerBtn.setAttribute('disabled', 'true');
                });        
            });    
        });

    })
    peopleJokerBtn.addEventListener('click', () => {
        jokerModal.firstElementChild.firstElementChild ? jokerModal.firstElementChild.firstElementChild.remove() : null;
        jokerModal.firstElementChild.innerText= '';
        
        const randomNums = [Math.floor(Math.random()*25), Math.floor(Math.random()*25), Math.floor(Math.random()*25)]
        let randomNumsIndex = 0;
        
        audio.src = jokerAudio;
        jokerModal.style.display='block';
        const indicatorsList = document.createElement('div');
        indicatorsList.className = 'indicators-list';
        jokerModal.firstElementChild.appendChild(indicatorsList);
        variants.forEach((element, index) => {
            const indicator = document.createElement('div');
            indicator.className='indicator';
            if (index == cIndex-1) {
                let maxPercent = 100;
                randomNums.forEach(rNum => {
                    maxPercent-=rNum;
                    indicator.innerText = `${element}. ${correctAnswer} ----- (${maxPercent}%)`;

                });
                indicator.style.width=`${maxPercent}%`
            }else{
                indicator.style.width=`${randomNums[randomNumsIndex]}%`
                randomNumsIndex++;
                indicator.innerText = element;
            }
            indicatorsList.appendChild(indicator);
        });
        peopleJokerBtn.setAttribute('disabled', 'true');
    })

}

// Close Modals
window.onclick = function(event) {
    if (event.target == jokerModal) {
        jokerModal.style.display = "none";
        audio.src = startAudio;
    }
}
