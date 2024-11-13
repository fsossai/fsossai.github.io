let mode = "character";
let characterSet = "simplified";
const question = { "character": characterSet, "pinyin": "pinyin" }
const answer = { "character": "pinyin", "pinyin": characterSet }
const modeFlipper = { "character": "pinyin", "pinyin": "character" };
const characterSetFlipper = { "simplified": "traditional", "traditional": "simplified" };
let current = null;
setup();
displayQuestion();

function setup() {
  document.getElementById("rank-max").value = dictionary.length;
  let rmax = document.getElementById("rank-max");
  let rmin = document.getElementById("rank-min");
  rmin.value = 1;
  rmax.value = 100;
  rmin.min = 1;
  rmin.max = dictionary.length;
  rmax.min = 1;
  rmax.max = dictionary.length;
  document.getElementById("question").innerText = "";
  document.getElementById("answer").innerText = "";
  document.getElementById("description").innerText = "";
  current = null;

  document.getElementById("question").onclick = questionClickHandler;
  document.getElementById("answer").onclick = displayDescription;
  document.getElementById("mode").onclick = flipMode;
  document.getElementById("charset").onclick = flipCharacterSet;

  updateInfo();
}

function getRandomNumberInRange(min, max) {
  let size = max - min + 1;
  return Math.floor(Math.random() * size) + min;
}

function displayQuestion() {
  const randomIndex = getRandomNumberInRange(
    parseInt(document.getElementById("rank-min").value, 10),
    parseInt(document.getElementById("rank-max").value, 10)
  );
  current = dictionary[randomIndex];
  document.getElementById("question").innerText = current[question[mode]];
  document.getElementById("answer").innerText = "";
  document.getElementById("description").innerText = "";
}

function displayAnswer() {
  document.getElementById("answer").innerText = current[answer[mode]];
}

function updateInfo() {
  document.getElementById("mode").innerText = `${mode}`;
  document.getElementById("charset").innerText = `${characterSet}`;
}

function displayDescription() {
  document.getElementById("description").innerText = current.description;
}

function questionClickHandler() {
  let q = document.getElementById("question");
  let a = document.getElementById("answer");
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
  mode = modeFlipper[mode];
  setup();
  updateInfo();
}

function flipCharacterSet() {
  characterSet = characterSetFlipper[characterSet];
  setup();
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
