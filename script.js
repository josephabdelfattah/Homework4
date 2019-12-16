var momentQuestion = 0;
var time = questions.length * 15;
var questIon = document.getElementById("questions");
var timerBox = document.getElementById("time");
var selectIon = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var initialsBox = document.getElementById("initials");
var feedBack = document.getElementById("feedback");
var timerId;


function startQuiz() {
  var begginIng = document.getElementById("start-screen");
  begginIng.setAttribute("class", "hide");
  questIon.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerBox.textContent = time;
  getQuestion();
}

function getQuestion() {
  
  var iQuestion = questions[momentQuestion];
  var titLe = document.getElementById("question-title");
  titLe.textContent = iQuestion.title;
  selectIon.innerHTML = "";
  iQuestion.choices.forEach(function(choice, i) {
    var clickOn = document.createElement("button");
    clickOn.setAttribute("class", "choice");
    clickOn.setAttribute("value", choice);
    clickOn.textContent = i + 1 + ". " + choice;
    clickOn.onclick = questionClick;
    selectIon.appendChild(clickOn);
  });
}
function questionClick() {
    if (this.value !== questions[momentQuestion].answer) {
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
  
      feedBack.textContent = "Wrong!";
    } else {
        feedBack.textContent = "Correct!";
      }
    
      feedBack.setAttribute("class", "feedback");
      setTimeout(function() {
        feedBack.setAttribute("class", "feedback hide");
      }, 1000);
    
      momentQuestion++;
    
      if (momentQuestion === questions.length) {
        quizEnd();
      } else {
        getQuestion();
      }
    }
    function quizEnd() {
       
        clearInterval(timerId);
      
       
        var timesUp = document.getElementById("end-screen");
        timesUp.removeAttribute("class");
      
        var yourScore = document.getElementById("final-score");
        yourScore.textContent = time;
      
        
        questIon.setAttribute("class", "hide");
      }
      
      function clockTick() {
      
        time--;
        timerBox.textContent = time;
      
        
        if (time <= 0) {
          quizEnd();
        }
      }
      function saveHighscore() {
        
        var inputOn = initialsBox.value.trim();
      
      
        if (inputOn !== "") {
          var advanceScores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];
      
       
          var updateScore = {
            score: time,
            inputOn: inputOn
          };
          advanceScores.push(updateScore);
          window.localStorage.setItem("highscores", JSON.stringify(advanceScores));
          window.location.href = "scores.html";
        }
      }
      
      function checkForEnter(event) {
        if (event.key === "Enter") {
          saveHighscore();
        }
      }
      
      submitButton.onclick = saveHighscore;
      startButton.onclick = startQuiz;
      initialsBox.onkeyup = checkForEnter;