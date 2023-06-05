const keys = document.getElementById("qwerty");
const phraseKeys = document.getElementById("phrase");
const overlay = document.getElementById("overlay");
const heartImgs = document.querySelectorAll(".tries img");
const title = document.querySelector(".title");

console.log(heartImgs);

let missed = 0;

const startBtn = document.querySelector(".btn__reset");

startBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  if (startBtn.textContent === "Another Round!") {
    reset();
  } else if (startBtn.textContent === "Try Again!") {
    reset();
  }

  const phrases = [
    "Jason Gilmore",
    "Guil Hernandez",
    "Treasure Porth",
    "Anwar Montasir",
    "Reggie Williams",
  ];

  function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    localStorage.setItem("newPhrase", "randomPhrase");
    return Array.prototype.slice.call(randomPhrase);
  }

  const phraseArray = getRandomPhraseAsArray(phrases);

  function addPhraseToDisplay(arr) {
    const phraselist = document.querySelector("#phrase ul");

    arr.forEach((char) => {
      let li = document.createElement("li");
      li.textContent = char;
      phraselist.appendChild(li);

      if (char !== " ") {
        li.classList.add("letter");
      }
    });
  }
  addPhraseToDisplay(phraseArray);
});

function checkLetter(clickedButton) {
  letterArray = document.querySelectorAll(".letter");

  let match = null;
  for (let i = 0; i < letterArray.length; i++) {
    if (
      clickedButton.textContent.toUpperCase() ===
      letterArray[i].textContent.toUpperCase()
    ) {
      letterArray[i].classList.add("show");
      match = clickedButton.textContent;
    }
  }
  return match;
}

keys.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const clickedButton = e.target;
    clickedButton.classList.add("chosen");
    clickedButton.disabled = "true";

    let letterFound = checkLetter(clickedButton);
    if (letterFound === null) {
      missed += 1;
      heartImgs[heartImgs.length - missed].src = "images/lostHeart.png";
    }
  }
  checkWin();
});

function checkWin() {
  const letterClassList = document.querySelectorAll(".letter");
  const showClassList = document.querySelectorAll(".show");

  if (letterClassList.length === showClassList.length) {
    for (let i = 0; i < showClassList.length; i++) {
      showClassList[i].classList.remove("show");
    }

    overlay.classList.add = "win";
    title.textContent = "Yaay!!!! You won!!!";
    overlay.style.display = "flex";
    startBtn.textContent = "Another Round!";
  }

  if (missed > 4) {
    for (let i = 0; i < showClassList.length; i++) {
      showClassList[i].classList.remove("show");
    }

    overlay.classList.add = "lose";
    title.textContent = "OOOpsy!!!! Not this Time buddy!";
    overlay.style.display = "flex";
    startBtn.textContent = "Try Again!";
  }
}

function reset() {
  const buttons = document.getElementsByTagName("BUTTON");
  const heartImgs = document.querySelectorAll(".tries img");
  const phraselist = document.querySelector("#phrase ul");
  missed = 0;
  overlay.classList.remove("win");
  overlay.classList.remove("lose");

  localStorage.clear();

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.remove("chosen");
  }
  for (let i = 0; i < 5; i++) {
    heartImgs[i].src = "images/liveHeart.png";
  }

  let newRandomPhrase = getRandomPhraseAsArray(phrases);
  if (localStorage.getItem("randomPhrase") !== newRandomPhrase) {
    getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newRandomPhrase);
  } else {
    localStorage.removeItem("newPhrase");
    localStorage.setItem("newRandomPhrase");
    newRandomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseToDisplay);
  }
}
