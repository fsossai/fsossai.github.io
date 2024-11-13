let mode = "character";
let characterSet = "simplified";
let current = null;
let question = document.getElementById("question");
let answer = document.getElementById("answer");
let description = document.getElementById("description");
setup();
displayQuestion();

function setup() {
  question.innerText = "";
  answer.innerText = "";
  document.getElementById("description").innerText = "";
  question.onclick = questionClickHandler;
  answer.onclick = displayDescription;
  document.getElementById("rank-max").value = dictionary.length;
  document.getElementById("mode").onclick = flipMode;
  document.getElementById("charset").onclick = flipCharacterSet;
  let rmax = document.getElementById("rank-max");
  let rmin = document.getElementById("rank-min");
  rmin.value = 1;
  rmax.value = 100;
  rmin.min = 1;
  rmin.max = dictionary.length;
  rmax.min = 1;
  rmax.max = dictionary.length;
  current = null;
  updateInfo();
}

function getRandomNumberInRange(min, max) {
  let size = max - min + 1;
  return Math.floor(Math.random() * size) + min;
}

function getAnswer() {
  switch (mode) {
    case "character":
      return current.pinyin;
    case "pinyin":
      return current[characterSet];
  }
}

function getQuestion() {
  switch (mode) {
    case "character":
      return current[characterSet];
    case "pinyin":
      return current.pinyin;
  }
}

function displayQuestion() {
  const randomIndex = getRandomNumberInRange(
    parseInt(document.getElementById("rank-min").value, 10),
    parseInt(document.getElementById("rank-max").value, 10)
  );
  current = dictionary[randomIndex];
  question.innerText = getQuestion();
  answer.innerText = "";
  document.getElementById("description").innerText = "";
}


function displayAnswer() {
  answer.innerText = getAnswer();
}

function updateInfo() {
  document.getElementById("mode").innerText = `${mode}`;
  document.getElementById("charset").innerText = `${characterSet}`;
}

function displayDescription() {
  document.getElementById("description").innerText = current.description;
}

function questionClickHandler() {
  let q = question;
  let a = answer;
  if (q.innerText === "") {
      displayQuestion();
  } else {
    if (a.innerText !== "") {
      displayQuestion();
    } else {
      displayAnswer();
    }
  }
}

function flipMode() {
  switch (mode) {
    case "character":
      mode = "pinyin";
      break;
    case "pinyin":
      mode = "character";
      break;
  }
  setup();
  updateInfo();
}

function flipCharacterSet() {
  switch (characterSet) {
    case "simplified":
      characterSet = "traditional";
      break;
    case "traditional":
      characterSet = "simplified";
      break;
  }
  switch (mode) {
    case "character":
      if (question.innerText !== "") {
        question.innerText = getQuestion();
      }
      break;
    case "pinyin":
      if (answer.innerText !== "") {
        answer.innerText = getAnswer();
      }
      break;
  }
  updateInfo();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case '.':
      flipMode();
      break;
    case '+':
      flipCharacterSet();
      break;
    case 'Enter':
      displayQuestion();
      break;
    case ' ':
      displayAnswer();
      break;
    case 'h':
    case ',':
      displayDescription();
      break;
    default:
  }
});
