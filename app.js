const keys = document.getElementById("qwerty");
const phraseKeys = document.getElementById("phrase");
const overlay = document.getElementById("overlay");
const heartImgs = document.querySelectorAll(".tries img");
const title = document.querySelector(".title");

let missed = 0;

const startBtn = document.querySelector(".btn__reset");

startBtn.addEventListener("click", () => {
  overlay.style.display = "none";

  const phrases = [
    "Jason Gilmore",
    "Guil Hernandez",
    "Treasure Porth",
    "Anwar Montasir",
    "Reggie Williams",
  ];

  function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return Array.prototype.slice.call(randomPhrase);
  }

  const phraseArray = getRandomPhraseAsArray(phrases);
  console.log(phraseArray);

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
  const letterArray = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < letterArray.length; i++) {
    if (
      clickedButton.textContent.toUpperCase() === letterArray[i].textContent
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
  }

  if (missed > 4) {
    for (let i = 0; i < showClassList.length; i++) {
      showClassList[i].classList.remove("show");
    }

    overlay.classList.add = "lose";
    title.textContent = "OOOpsy!!!! Not this Time buddy!";
    overlay.style.display = "flex";
  }
}
