//SCORES & TEXTS
let pointsThisRound = document.querySelector(".pointsThisRound");
const totalScore = document.querySelectorAll(".totalScorePlayer-0");
let currentScore = document.querySelector(".currentscore-0");
let plusThisRound = document.querySelector(".plusthisround-0");
const languageText = document.querySelector(".language");
const playerNames = document.querySelectorAll(".name-0");
//top side of bars
const playeBar = document.querySelector(".playersBars");
const playerBars = document.querySelectorAll(".player-bar");
//constants of the dices images
let dices = document.getElementsByClassName("diceImage");
const diceBox = document.querySelector(".dice");
const inGameMenu = document.querySelector(".middleText");
const playersBoards = document.querySelector(".playGround");
let playerNamesInput = document.querySelectorAll(".text");
const inputControl = document.querySelector(".nameImputs");

//BUTTONS
const start = document.querySelector("#start");
const skipTurn = document.querySelector("#skipTurn");
const nextPlayer = document.querySelector("#writeScore");
const rollDice = document.querySelector("#rollDice");
const rollNewDices = document.querySelector("#rollAllDice");
const languageBtn = document.querySelector(".languageBtn");
const numbersOfPlayersChooseMenu = document.querySelector(".radioBtn");
const numbersOfPlayersChooseUpText = document.querySelector(".radioBtnText");
const numberOfPlayersChoose = document.querySelectorAll(".radio");
const numberOfPlayersChooseText = document.querySelectorAll(".radioText");

//CONSTANTS
//score needed to win the game
const scoreTowin = 10000;
//value needed to write your turn
const valueToWrite = 300;
//source of score values
const Player1 = {
  playerNames: ["PLAYER 1", "PLAYER 2", "PLAYER 3", "PLAYER 4"],
  totalScore: [0, 0, 0, 0],
  currentScore: 0,
  plusThisRound: 0,
};
//number of players
let numberOfPlayers = 1;
//index of active player
let activePlayer = 0;
//VALUES OF DICES
const maxNumberOfDices = 6;
const diceArr = [0, 0, 0, 0, 0, 0];
//values of dice combinations, for 0,1,2,3,4,5,6
const combinations = [
  //value for 0 times same number
  [0, 0, 0, 0, 0, 0],
  //value for 1 times same number
  [100, 0, 0, 0, 50, 0],
  //value for 2 times same number
  ["xxx", 0, 0, 0, "xxx", 0],
  //value for 3 times same number
  [1000, 200, 300, 400, 500, 600],
  //value for 4 times same number
  [2000, 400, 600, 800, 1000, 1200],
  //value for 5 times same number
  [4000, 800, 1200, 1600, 2000, 2400],
  //value for 6 times same number
  [8000, 1600, 2400, 3200, 4000, 4800],
];

//variable for language chnaging
let language = "en";

//MULTI LANGUAGE
const en_cs = {
  pointsThisRound: ["POINTS THIS ROUND", "SKÓRE TOTO KOLO"],
  roll: ["ROLL!", "HOĎ!"],
  rollAll: ["ROLL ALL!", "HOĎ VŠEMI KOSTKAMI!"],
  skip: ["SKIP (next player)", "VZDEJ SE TAHU (další hráč)"],
  write: ["WRITE (next player)", "ULOŽ SKÓRE (další hráč)"],
  startGame: ["START THE GAME", "ZAČÍT HRÁT"],
  language: ["EN", "CS"],
  players: ["Choose number of players:", "Zvol počet hráčů:"],
  nmbOfPlayers: [
    ["1 Player", "1 Hráč"],
    ["2 Players", "2 Hráči"],
    ["3 Players", "3 Hráči"],
    ["4 Players", "4 Hráči"],
  ],
};

//EVENT LISTENERS
rollDice.addEventListener("click", rollDices);
rollNewDices.addEventListener("click", rollWithNewDices);
nextPlayer.addEventListener("click", writeForNextPlayer);
skipTurn.addEventListener("click", skipYourTurn);
languageBtn.addEventListener("click", changeLanguage);
start.addEventListener("click", showInGameMenu);
for (let i = 0; i < numberOfPlayersChoose.length; i++) {
  numberOfPlayersChoose[i].addEventListener("click", function () {
    changeNumberOfPlayers(i);
  });
}

//FUNCTIONS
function changeLanguage() {
  if (language === "en") {
    language = "cs";
    changeToLanguage(1);
  } else {
    language = "en";
    changeToLanguage(0);
  }
}

//change language algorithm
function changeToLanguage(i) {
  rollDice.textContent = en_cs.roll[i];
  rollNewDices.textContent = en_cs.rollAll[i];
  nextPlayer.textContent = en_cs.write[i];
  skipTurn.textContent = en_cs.skip[i];
  languageText.textContent = en_cs.language[i];
  start.textContent = en_cs.startGame[i];
  pointsThisRound.textContent = en_cs.pointsThisRound[i];
  numbersOfPlayersChooseUpText.textContent = en_cs.players[i];
  for (let j = 0; j < numberOfPlayersChooseText.length; j++) {
    numberOfPlayersChooseText[j].textContent = en_cs.nmbOfPlayers[j][i];
  }
}

function changeNumberOfPlayers(i) {
  if (numberOfPlayersChoose[i].checked) {
    numberOfPlayers = i + 1;
  }
  for (let j = 0; j < 4; j++) {
    playerNamesInput[j].style.display = "inline";
  }
  for (let j = i + 1; j < 4; j++) {
    playerNamesInput[j].style.display = "none";
  }
}

//algorithm for ADD SCORE by slicking on dices
function addScore() {
  //array that count same numbers
  let count = [0, 0, 0, 0, 0, 0];
  //function that will count all numbers and save them to count array
  countNumbers(count);
  //algoritmus pro kombinace
  definesBestCombinations(count);
}
//event listenery pro vice kostek
function eventListeners(i, value) {
  for (let j = 0; j < i.length; j++) {
    dices[i[j]].addEventListener("mouseenter", function () {
      cursorOnOneDice(i, value);
    });
    dices[i[j]].addEventListener("mouseleave", function () {
      cursorOfOneDice(i);
    });
    dices[i[j]].addEventListener("click", function () {
      clickOnTheDice(i, value);
    });
  }
}

//function that add hover to the right dice
function cursorOnOneDice(i, value) {
  //change border of dice. i = index of the dice
  addBorder(i, "14px solid #F2f2f2");
  //show plus this round with new value on hover
  showPlusThisMove(value, "#F2F2F2");
}

//undo/default cursor on the dice function
function cursorOfOneDice(i) {
  for (let j = 0; j < i.length; j++) {
    plusThisRound.style.color = "#0f0f0f";
    dices[i[j]].style.border = "none";
    if (plusThisRound > 0) {
      plusThisRound.textContent = "+ " + Player1.plusThisRound;
    } else {
      plusThisRound.textContent = "0";
    }
  }
}

//function that will lauch while click on valued dice
function clickOnTheDice(i, value) {
  for (let j = 0; j < i.length; j++) {
    //hide dice
    dices[i[j]].style.display = "none";
    //delete index of dice from array
    diceArr.pop();
  }
  //add value to the player plusthis round
  Player1.plusThisRound += value;
  //moves sorete to plus this round(red square)
  moveScoreToCurrentScore();
  //rewrite whole board
  reWriteBoard();
  //function that controls option to write score
  if (Player1.currentScore >= valueToWrite) {
    enableBtn(nextPlayer);
  }
  //enable roll options
  if (diceArr.length > 0) {
    enableBtn(rollDice);
  } else {
    enableBtn(rollNewDices);
  }
}

//change border of dice
function addBorder(i, border) {
  for (let j = 0; j < i.length; j++) {
    dices[i[j]].style.border = border;
    dices[i[j]].style.borderRadius = "8px";
  }
}

function showPlusThisMove(value, color) {
  //change color of plus this round
  plusThisRound.style.color = color;
  //change value of text in plus this round
  plusThisRound.textContent = "+ " + (Player1.plusThisRound + value);
}

function remakeDices() {
  removeOldDices();
  generateNewDices();
}

//removes all dices from HTML
function removeOldDices() {
  while (dices.length > 0) {
    dices[0].remove();
  }
}

//create new dices images - to delete old event listeners
function generateNewDices() {
  for (let i = 0; i < diceArr.length; i++) {
    let div = document.createElement("img");
    div.className = "diceImage";
    diceBox.appendChild(div);
  }
}

//algorithm for DICE ROLL
function rollDices() {
  //create new dices - to add new event listeners
  remakeDices();
  //rotate dices
  rotateDice();
  //function that will dive display: inline
  showDices();
  //roll dices
  shuffleDices();
  //rules for all dices
  addScore();
  //disable write button
  disableBtn(nextPlayer);
  disableBtn(rollDice);
  disableBtn(rollNewDices);
}

//move score when dice roll
function moveScoreToCurrentScore() {
  Player1.currentScore += Player1.plusThisRound;
  Player1.plusThisRound = 0;
}

//algorithm for add new dice and roll with them
function rollWithNewDices() {
  //push number of dices back to the max value
  while (diceArr.length < maxNumberOfDices) {
    diceArr.push(0);
  }
  //roll all dices
  rollDices();
}

//function for shuffle dices
function shuffleDices() {
  for (let j = 0; j < dices.length; j++) {
    //generate number from 1 to 6
    diceArr[j] = Math.ceil(Math.random() * 6);
    //change image
    dices[j].src = "img/" + diceArr[j] + ".png";
  }
}

//show in game menu
function showInGameMenu() {
  start.style.display = "none";
  inGameMenu.style.display = "flex";
  hideDices();
  disableBtn(rollDice);
  disableBtn(nextPlayer);
  showBtnGrid(playeBar);
  hideBtn(numbersOfPlayersChooseMenu);
  hideNonplayingPlayerBars();
  getPlayerNames();
  hideBtn(inputControl); //here
}

function hideNonplayingPlayerBars() {
  for (let i = numberOfPlayers; i < 4; i++) {
    playerBars[i].style.display = "none";
  }
  playeBar.style.gridTemplateColumns = "repeat(" + numberOfPlayers + ", 1fr)";
}

//function to write score, let play new player
function writeForNextPlayer() {
  removeOldDices();
  Player1.totalScore[activePlayer] += Player1.currentScore;
  Player1.currentScore = 0;
  Player1.plusThisRound = 0;
  reWriteBoard();
  //enables/disables in game buttons, give +1 active player index
  changeActivePlayer();
}

//function to skip your turn
function skipYourTurn() {
  removeOldDices();
  Player1.currentScore = 0;
  Player1.plusThisRound = 0;
  reWriteBoard();
  //enables/disables in game buttons, give +1 active player index
  changeActivePlayer();
}

//function that null player score in JS
function nullGame() {
  for (let i = 0; i < numberOfPlayers; i++) {
    Player1.totalScore[i] = 0;
  }
  Player1.currentScore = 0;
  Player1.plusThisRound = 0;
}

//function that null text content in game
function reWriteBoard() {
  for (let i = 0; i < numberOfPlayers; i++) {
    totalScore[i].textContent = Player1.totalScore[i];
  }
  currentScore.textContent = Player1.currentScore;
  plusThisRound.textContent = "0";
}

//function that disable btn
function disableBtn(btn) {
  btn.setAttribute("disabled", "disabled");
}
//function that enable btn
function enableBtn(btn) {
  btn.removeAttribute("disabled");
}

//function that will hide btn
function hideBtn(btn) {
  btn.style.display = "none";
}

//function that will show button - flex
function showBtnGrid(btn) {
  btn.style.display = "grid";
}

//function that will hide all dices
function hideDices() {
  for (let i = 0; i < dices.length; i++) {
    dices[i].style.display = "none";
  }
}

//function that will show all dices
function showDices() {
  for (let i = 0; i < dices.length; i++) {
    dices[i].style.display = "inline";
  }
}

//function that will hide all dices
function hideDices() {
  for (let i = 0; i < dices.length; i++) {
    dices[i].style.display = "none";
  }
}

///function that will get all indexes
function getAllIndexes(arr, val) {
  let indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

//function that count values in one throw
function countNumbers(count) {
  //for every number on the dice
  for (let j = 1; j <= 6; j++) {
    //for every dice
    for (let i = 0; i < diceArr.length; i++) {
      //if dice is similar as some number
      if (diceArr[i] === j) {
        //write it to count array
        count[j - 1]++;
      }
    }
  }
}

//algorithm that difines whole dice values
function definesBestCombinations(count) {
  for (let i = 0; i < 6; i++) {
    //indexes - promenna pro vsechny indexy
    let indexes = getAllIndexes(diceArr, i + 1);
    //typicka situace
    if (combinations[count[i]][i] > 0) {
      eventListeners(indexes, combinations[count[i]][i]);
      //situace kdy je vyskyt 2x1 nebo 2x5 na kostk8ch
    } else if (combinations[count[i]][i] === "xxx") {
      for (let k = 0; k < indexes.length; k++) {
        eventListeners([indexes[k]], combinations[count[i] - 1][i]);
      }
    }
  }
}

//function that will rotate a dice
function rotateDice() {
  for (let i = 0; i < dices.length; i++) {
    let deg = Math.floor(Math.random() * 360);
    dices[i].style.transform = "rotate(" + deg + "deg)";
  }
}

//function that chnage player index
function changeActivePlayer() {
  enableBtn(rollNewDices);
  disableBtn(rollDice);
  disableBtn(nextPlayer);
  if (numberOfPlayers > 1) {
    if (activePlayer < numberOfPlayers - 1) {
      swap(
        playeBar.children[4 + activePlayer],
        playeBar.children[4 + activePlayer + 1]
      );
      activePlayer++;
    } else {
      swap(playeBar.children[4 + activePlayer], playeBar.children[4]);
      activePlayer = 0;
    }
    currentScore = document.querySelector(".currentscore-0");
    plusThisRound = document.querySelector(".plusthisround-0");
    pointsThisRound = document.querySelector(".pointsThisRound");
  }
}

function swap(element1, element2) {
  var clonedElement1 = element1.cloneNode(true);
  var clonedElement2 = element2.cloneNode(true);

  element2.parentNode.replaceChild(clonedElement1, element2);
  element1.parentNode.replaceChild(clonedElement2, element1);

  return clonedElement1;
}

function getPlayerNames() {
  for (let i = 0; i < numberOfPlayers; i++) {
    Player1.playerNames[i] = playerNamesInput[i].value;
    playerNames[i].textContent = playerNamesInput[i].value;
  }
}

//function that

nullGame();
reWriteBoard();
