let colorOne = document.getElementById("color-a");
let colorTwo = document.getElementById("color-b");
let currentDirection = "to top";
let outputCode = document.getElementById("code");

function setDirection(value, _this) {
  let direcrtions = document.querySelectorAll(".buttons button");
  for (let i of direcrtions) {
    i.classList.remove("active");
  }
  _this.classList.add("active");
  currentDirection = value;
}

function generateCode() {
  outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
  document.getElementsByTagName(
    "BODY"
  )[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

function copyText() {
  outputCode.select();
  document.execCommand("copy");
  alert("Gradient Copied!");
}

function generateRandomGradient() {
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  colorOne.value = randomColor1;
  colorTwo.value = randomColor2;

  const directions = [
    "to top",
    "to bottom",
    "to right",
    "to left",
    "to top right",
    "to top left",
    "to bottom right",
    "to bottom left",
  ];
  const randomDirection =
    directions[Math.floor(Math.random() * directions.length)];

  currentDirection = randomDirection;
  generateCode();
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

generateCode();

document
  .getElementById("generate-random")
  .addEventListener("click", generateRandomGradient);
