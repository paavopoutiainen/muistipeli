

var correctUpper = [];
var correctLower = [];
var sizeOfTheGrid = 4;
var numberOfGreens = 5;

const createGameGrids = () => {
  //Getting divs into which blocks will be created at
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
      var classList = div.className.split(/\s+/);
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

const checkIfgreenBlocksLeft = (numberOfGreens, numberOfGivenGreens) => {
  if(numberOfGivenGreens < numberOfGreens) {
    return true;
  } else return false;
}

const checkIfgreenHasToBeGiven = (index, numberOfGreens, numberOfGivenGreens, numberOfBlocksInTheGrid) => {
  const indexesLeft = numberOfBlocksInTheGrid - index;
  const numberOfGreensYetToBeGiven = numberOfGreens - numberOfGivenGreens;
  if(numberOfGreensYetToBeGiven === indexesLeft) {
    return true;
  } else return false;
}

//this function creates an array of booleans to be used in deciding which blocks will be 
//cologreen green during the game
const getRandomizedGreensArray = (gridRows, numberOfGreens) => { 
  
  const array = [];
  const numberOfBlocksInTheGrid = gridRows ** 2;
  let numberOfGivenGreens = 0
  for (i = 0; i < numberOfBlocksInTheGrid; i++) {
    const ratio = numberOfGreens / numberOfBlocksInTheGrid;
    const greenOrNotBoolean = !(Math.random() >= ratio);
    if(checkIfgreenHasToBeGiven(i, numberOfGreens, numberOfGivenGreens, numberOfBlocksInTheGrid) || (greenOrNotBoolean && checkIfgreenBlocksLeft(numberOfGreens, numberOfGivenGreens))){
      array.push(true)
      numberOfGivenGreens++
    } else {
      array.push(false)
    }  
  }
  return array
}

const showGreens = (blockArray, correctArray) => {
  blockArray.forEach((block, i) => {
    const greenOrNotBoolean = correctArray[i]
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

const handleLeftSide = (correctUpper, correctLower) => {
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

const playGame = async () => {
  //eli tässä vain luotais ne vihreät 
  correctUpper = getRandomizedGreensArray(sizeOfTheGrid, numberOfGreens);
  correctLower = getRandomizedGreensArray(sizeOfTheGrid, numberOfGreens);

  await handleLeftSide(correctUpper, correctLower)
  showRightSideHideLeftSide()
}

const handleRightSideClick = (idNumber, gridItem) => {
  const classList = gridItem.className.split(/\s+/)
  const correctArray = classList.includes("upperRight") ? correctUpper : correctLower;
  //tsekkaa oliko klikatun blockin id true vai false, jos true niin muuta väri vihreäksi jos 
  //false niin muuta väri punaiseksi
  if(correctArray[idNumber]) {
    gridItem.style.backgroundColor = "green"
  } else {
    gridItem.style.backgroundColor = "red"
  }
}

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

createGameGrids(sizeOfTheGrid);

