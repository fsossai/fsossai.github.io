let mode = "character";
let charset = "simplified";
let current = null;
setup();
displayQuestion();

function setup() {
  $("#question").text("");
  $("#answer").text("");
  $("#description").text("");
  $("#question").click(questionClickHandler);
  $("#answer").click(displayDescription);
  $("#mode").click(flipMode);
  $("#charset").click(flipCharset);
  $("#rank-min").val(1);
  $("#rank-max").val(100);
  $("#rank-min").attr("min", 1);
  $("#rank-min").attr("max", dictionary.length);
  $("#rank-max").attr("min", 1);
  $("#rank-max").attr("max", dictionary.length);
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
      return current[charset];
  }
}

function getQuestion() {
  switch (mode) {
    case "character":
      return current[charset];
    case "pinyin":
      return current.pinyin;
  }
}

function displayQuestion() {
  const randomIndex = getRandomNumberInRange(
    parseInt($("#rank-min").val(), 10),
    parseInt($("#rank-max").val(), 10),
  );
  current = dictionary[randomIndex];
  $("#question").text(getQuestion());
  $("#answer").text("");
  $("#description").text("");
}


function displayAnswer() {
  $("#answer").text(getAnswer());
}

function updateInfo() {
  $("#mode").text(`${mode}`);
  $("#charset").text(`${charset}`);
}

function displayDescription() {
  $("#description").text(current.description);
}

function questionClickHandler() {
  if ($("#question").text() === "") {
      displayQuestion();
  } else {
    if ($("#answer").text() === "") {
      displayAnswer();
    } else {
      displayQuestion();
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
  updateInfo();
  displayQuestion();
}

function flipCharset() {
  switch (charset) {
    case "simplified":
      charset = "traditional";
      break;
    case "traditional":
      charset = "simplified";
      break;
  }
  switch (mode) {
    case "character":
      if ($("#question").text() !== "") {
        $("#question").text(getQuestion());
      }
      break;
    case "pinyin":
      if ($("#answer").text() !== "") {
        $("#answer").text(getAnswer());
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
      flipCharset();
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
