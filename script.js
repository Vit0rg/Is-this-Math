const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => 
{
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() 
{
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() 
{
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) 
{
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => 
  {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) 
    {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() 
{
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) 
  {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) 
{
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => 
  {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) 
  {
    nextButton.classList.remove("hide");
  } 
  else 
  {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) 
{
  clearStatusClass(element);
  if (correct) 
  {
    element.classList.add("correct");
  } 
  else 
  {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) 
{
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "(2+2)*15/5 ?",
    answers: [
      { text: "13", correct: false },
      { text: "15", correct: false },
      { text: "12", correct: true },
      { text: "14", correct: false },
    ],
  },
  {
    question: "1+2*3 ?",
    answers: [
      { text: "7", correct: true },
      { text: "9", correct: false },
      { text: "6", correct: false },
      { text: "8", correct: false },
    ],
  },
  {
    question: "2-4(-2)+3 ?",
    answers: [
      { text: "7", correct: false },
      { text: "-6", correct: false },
      { text: "12", correct: false },
      { text: "13", correct: true },
    ],
  },
  {
    question: "0*2/2+2+3*10-3*2*0?",
    answers: [
      { text: "0", correct: false },
      { text: "32", correct: true },
      { text: "30", correct: false },
      { text: "33", correct: false },
    ],
  },
];