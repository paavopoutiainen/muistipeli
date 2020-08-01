var correctUpper = [];
var correctLower = [];
var sizeOfTheGrid = 4;
var numberOfGreens = 5;
var points = 0;
var greensClicked = 0;

const createGameGrids = () => {
  //Getting divs into which grid of blocks will be created at
  const gameGridDivsHTMLCollection = document.getElementsByClassName("gameGrid")
  var arr = Array.prototype.slice.call( gameGridDivsHTMLCollection )
  console.log("hehehehe")
  
  //Looping through divs and creating blocks into each
  arr.forEach(div => {
    div.innerHTML = ""
    div.style.gridTemplateRows = `repeat(${sizeOfTheGrid}, 1fr)`
    div.style.gridTemplateColumns = `repeat(${sizeOfTheGrid}, 1fr)`
  
    for(let i = 0; i < sizeOfTheGrid * sizeOfTheGrid; i++) {
      let gridItem = parent.document.createElement("div");
      let classList = div.className.split(/\s+/);
      if(classList.includes("answer")){
        gridItem.className += `${div.id} gameGridItem`
        gridItem.onclick = () => handleRightSideClick(i, gridItem)
      } else {
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
  for (i = 0; i < numberOfBlocksInTheGrid; i++) {
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

//Handling play game button click
const playGame = async () => {
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

  showGreens(upperLeftBlocksArray, correctUpper);
  setTimeout(() => {
    setBackToWhites(upperLeftBlocksArray)
    showGreens(lowerLeftBlocksArray, correctLower);
  }, 4000)
  setTimeout(() => {
    setBackToWhites(lowerLeftBlocksArray)
  }, 8000)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 8000)
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
  
  //Figure out which grid was blocked 
  const classList = gridItem.className.split(/\s+/);
  const correctArray = classList.includes("upperRight") ? correctUpper : correctLower;
  const blockInfo = correctArray[idNumber]
  if(blockInfo.green) {
    gridItem.style.backgroundColor = "green";
  } else {
    gridItem.style.backgroundColor = "red";
  }
  givePoints(blockInfo, correctArray, idNumber)
  console.log(points)
  if(greensClicked === numberOfGreens * 2){
    disableOnClickEvents()
    showResults()
  }
}

const disableOnClickEvents = () => {
  const gameGridItems = document.getElementsByClassName("gameGridItem")
  const gameGridItemsArray = Array.from(gameGridItems)
  gameGridItemsArray.forEach(block => {
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

createGameGrids();

