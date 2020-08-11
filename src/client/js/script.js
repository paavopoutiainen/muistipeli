var correctUpper = [];
var correctLower = [];
var sizeOfTheGrid = 4;
var numberOfGreens = 5;
var points = 0;
var totalPoints = 0;
var greensClicked = 0;
var time = 4;
var gameIsOnTimeout;
var gameIsOnPromiseTimeout;
var handlers = []

const createGameGrids = () => {
  //Getting divs into which grid of blocks will be created at
  const gameGridDivsHTMLCollection = document.getElementsByClassName("gameGrid")
  var arr = Array.prototype.slice.call( gameGridDivsHTMLCollection )
  
  //Looping through divs and creating blocks into each
  arr.forEach(div => {
    div.innerHTML = ""
    div.style.gridTemplateRows = `repeat(${sizeOfTheGrid}, 1fr)`
    div.style.gridTemplateColumns = `repeat(${sizeOfTheGrid}, 1fr)`
  
    for(let i = 0; i < sizeOfTheGrid * sizeOfTheGrid; i++) {
      let gridItem = parent.document.createElement("div");
      let classList = div.className.split(/\s+/);
      if(classList.includes("answer")){
        div.style.visibility = "hidden";
        gridItem.className += `${div.id} gameGridItem`
        gridItem.onclick = () => handleRightSideClick(i, gridItem)
      } else {
        div.style.visibility = "visible"
        gridItem.className += `${div.id} gameGridItem`
      }
      const newIdWithNumber = `${div.id}${i}`
      gridItem.id = newIdWithNumber;
      div.appendChild(gridItem);
    }
  })
}

/*this function creates an array of booleans to be used in deciding which blocks will be 
colored green during the game*/
const getRandomizedGreensArray = () => { 
  const array = [];
  const numberOfBlocksInTheGrid = sizeOfTheGrid ** 2;
  let numberOfGivenGreens = 0
  for (var i = 0; i < numberOfBlocksInTheGrid; i++) {
    /*Creating proper ratio for randomizing greens*/
    const ratio = numberOfGreens / numberOfBlocksInTheGrid;
    const greenOrNotBoolean = !(Math.random() >= ratio);
    //Checking if green has to be given at certain loop round and also checking excessive greens are not given
    if(checkIfGreenHasToBeGiven(i, numberOfGreens, numberOfGivenGreens, numberOfBlocksInTheGrid) || (greenOrNotBoolean && checkIfGreenCanBeGiven(numberOfGreens, numberOfGivenGreens))){
      array.push({green: true, checked: false})
      numberOfGivenGreens++
    } else {
      array.push({green: false, checked: false})
    }  
  }
  return array
}

const disableButton = () => {

}

const checkIfGreenHasToBeGiven = (index, numberOfGreens, numberOfGivenGreens, numberOfBlocksInTheGrid) => {
  const indexesLeft = numberOfBlocksInTheGrid - index;
  const numberOfGreensYetToBeGiven = numberOfGreens - numberOfGivenGreens;
  if(numberOfGreensYetToBeGiven === indexesLeft) {
    return true;
  } else return false;
}

const checkIfGreenCanBeGiven = (numberOfGreens, numberOfGivenGreens) => {
  if(numberOfGivenGreens < numberOfGreens) {
    return true;
  } else return false;
}

//Handling start game button click
const startGame = async () => {
  const startButtonElement = document.getElementById("startButton")
  startButtonElement.disabled = true
  const resetButtonElement = document.getElementById("resetButton")
  resetButtonElement.disabled = false

  //Filling global arrays of 
  correctUpper = getRandomizedGreensArray();
  correctLower = getRandomizedGreensArray();

  await handleLeftSide();
  showRightSideHideLeftSide();
}

const handleLeftSide = () => {
  const upperLeftDiv = document.getElementById("upperLeft")
  const upperLeftBlockNodes = upperLeftDiv.childNodes
  const upperLeftBlocksArray = Array.from(upperLeftBlockNodes)

  const lowerLeftDiv = document.getElementById("lowerLeft")
  const lowerLeftBlockNodes = lowerLeftDiv.childNodes
  const lowerLeftBlocksArray = Array.from(lowerLeftBlockNodes)

  const timeAsMilliseconds = time * 1000;

  showGreens(upperLeftBlocksArray, correctUpper);
  gameIsOnTimeout = setTimeout(() => {
    setBackToWhites(upperLeftBlocksArray)
    showGreens(lowerLeftBlocksArray, correctLower);
  }, timeAsMilliseconds)
  
  return new Promise(resolve => {
    gameIsOnPromiseTimeout = setTimeout(() => {
      resolve()
    }, timeAsMilliseconds * 2)
  })
}

const showGreens = (blockArray, correctArray) => {
  blockArray.forEach((block, i) => {
    const greenOrNotBoolean = correctArray[i].green
    if (greenOrNotBoolean){
      block.style.backgroundColor = "green"
    }
  })
} 

const setBackToWhites = (blockArray) => {
  blockArray.forEach((block) => {
    block.style.backgroundColor = "white"
  })
}

const showRightSideHideLeftSide = () => {
  const rightSideDivsHTMLCollection = document.getElementsByClassName("answer")
  const rightSideDivsArray = Array.from(rightSideDivsHTMLCollection)
  const leftSideDivsHTMLCollection = document.getElementsByClassName("question")
  const leftSideDivsArray = Array.from(leftSideDivsHTMLCollection)
  
  rightSideDivsArray.forEach(div => {
    div.style.visibility = "visible"
  })

  leftSideDivsArray.forEach(div => {
    div.style.visibility = "hidden"
  })
}

/*Check if clicked block was green or not and give points accordingly */
const handleRightSideClick = (idNumber, gridItem) => {
  
  //Figure out which grid was clicked
  const classList = gridItem.className.split(/\s+/);
  const correctArray = classList.includes("upperRight") ? correctUpper : correctLower;
  const blockInfo = correctArray[idNumber]
  if(blockInfo.green) {
    gridItem.style.backgroundColor = "green";
  } else {
    gridItem.style.backgroundColor = "red";
  }
  givePoints(blockInfo, correctArray, idNumber)
  if(greensClicked === numberOfGreens * 2){
    handleEndOfRound()
  }
}

const handleEndOfRound = () => {
  disableOnClickEvents()
  totalPoints += points
  showPoints()
  handleButtonsEndOfRound()
}

const handleButtonsEndOfRound = () => {
  document.getElementById("resetButton").innerHTML = "New Game"
}

const disableOnClickEvents = () => {
  const gameGridItems = document.getElementsByClassName("gameGridItem")
  const gameGridItemsArray = Array.from(gameGridItems)
  gameGridItemsArray.forEach((block, i) => {
    block.onclick = "";
  })
}

const givePoints = (blockInfo, correctArray, idNumber) => {
  if(!blockInfo.checked) {
    correctArray[idNumber].checked = true
    if(blockInfo.green) {
      greensClicked++
      points++;
    } else {
      points--;
    }
  } 
  showPoints()
}

const showPoints = () => {
  const roundPointsElement = document.getElementById("roundPoints")
  const totalPointsElement = document.getElementById("totalPoints")

  roundPointsElement.innerHTML = points
  totalPointsElement.innerHTML = totalPoints
}

const resetGame = () => {
  clearTimeout(gameIsOnTimeout)
  clearTimeout(gameIsOnPromiseTimeout)
  const resetButtonElement = document.getElementById("resetButton")
  if(resetButtonElement.innerHTML === "New Game") {
    resetButtonElement.innerHTML = "Reset Game"
  }
  createGameGrids()
  correctUpper = [];
  correctLower = [];
  points = 0;
  greensClicked = 0;
  const startButtonElement = document.getElementById("startButton")
  startButtonElement.disabled = false
}

//Handling user's changes in preferences
const changeGridSize = () => {
  const newValue = document.getElementById("sizeOfTheGridSelect").value
  const newValueAsNumber = parseInt(newValue)
  sizeOfTheGrid = newValueAsNumber 
  createGameGrids()
}

const changeNumberOfGreens = () => {
  const newValue = document.getElementById("numberOfGreensSelect").value
  const newValueAsNumber = parseInt(newValue)
  numberOfGreens = newValueAsNumber
}

const changeSeconds = () => {
  const newValue = document.getElementById("seconds").value
  const newValueAsNumber = parseInt(newValue)
  time = newValueAsNumber
}

//Adding eventlisteners
const startButton = document.getElementById("startButton")
const resetButton = document.getElementById("resetButton")
const sizeSelectElement = document.getElementById("sizeOfTheGridSelect").addEventListener("change", changeGridSize)
const numberOfGreensSelectElement = document.getElementById("numberOfGreensSelect").addEventListener("change", changeNumberOfGreens)
const timeSelectElement = document.getElementById("seconds").addEventListener("change", changeSeconds)
resetButton.addEventListener("click", resetGame)
startButton.addEventListener("click", startGame)

createGameGrids();

