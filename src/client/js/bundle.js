/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/js/script.js":
/*!*********************************!*\
  !*** ./src/client/js/script.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar correctUpper = [];\nvar correctLower = [];\nvar sizeOfTheGrid = 4;\nvar numberOfGreens = 5;\nvar points = 0;\nvar totalPoints = 0;\nvar greensClicked = 0;\nvar time = 4;\nvar gameIsOnTimeout;\nvar gameIsOnPromiseTimeout;\nvar handlers = [];\n\nvar createGameGrids = function createGameGrids() {\n  //Getting divs into which grid of blocks will be created at\n  var gameGridDivsHTMLCollection = document.getElementsByClassName(\"gameGrid\");\n  var arr = Array.prototype.slice.call(gameGridDivsHTMLCollection);\n\n  //Looping through divs and creating blocks into each\n  arr.forEach(function (div) {\n    div.innerHTML = \"\";\n    div.style.gridTemplateRows = \"repeat(\" + sizeOfTheGrid + \", 1fr)\";\n    div.style.gridTemplateColumns = \"repeat(\" + sizeOfTheGrid + \", 1fr)\";\n\n    var _loop = function _loop(i) {\n      var gridItem = parent.document.createElement(\"div\");\n      var classList = div.className.split(/\\s+/);\n      if (classList.includes(\"answer\")) {\n        div.style.visibility = \"hidden\";\n        gridItem.className += div.id + \" gameGridItem\";\n        gridItem.onclick = function () {\n          return handleRightSideClick(i, gridItem);\n        };\n      } else {\n        div.style.visibility = \"visible\";\n        gridItem.className += div.id + \" gameGridItem\";\n      }\n      var newIdWithNumber = \"\" + div.id + i;\n      gridItem.id = newIdWithNumber;\n      div.appendChild(gridItem);\n    };\n\n    for (var i = 0; i < sizeOfTheGrid * sizeOfTheGrid; i++) {\n      _loop(i);\n    }\n  });\n};\n\n/*this function creates an array of booleans to be used in deciding which blocks will be \r\ncolored green during the game*/\nvar getRandomizedGreensArray = function getRandomizedGreensArray() {\n  var array = [];\n  var numberOfBlocksInTheGrid = sizeOfTheGrid ** 2;\n  var numberOfGivenGreens = 0;\n  for (var i = 0; i < numberOfBlocksInTheGrid; i++) {\n    /*Creating proper ratio for randomizing greens*/\n    var ratio = numberOfGreens / numberOfBlocksInTheGrid;\n    var greenOrNotBoolean = !(Math.random() >= ratio);\n    //Checking if green has to be given at certain loop round and also checking excessive greens are not given\n    if (checkIfGreenHasToBeGiven(i, numberOfGreens, numberOfGivenGreens, numberOfBlocksInTheGrid) || greenOrNotBoolean && checkIfGreenCanBeGiven(numberOfGreens, numberOfGivenGreens)) {\n      array.push({ green: true, checked: false });\n      numberOfGivenGreens++;\n    } else {\n      array.push({ green: false, checked: false });\n    }\n  }\n  return array;\n};\n\nvar disableButton = function disableButton() {};\n\nvar checkIfGreenHasToBeGiven = function checkIfGreenHasToBeGiven(index, numberOfGreens, numberOfGivenGreens, numberOfBlocksInTheGrid) {\n  var indexesLeft = numberOfBlocksInTheGrid - index;\n  var numberOfGreensYetToBeGiven = numberOfGreens - numberOfGivenGreens;\n  if (numberOfGreensYetToBeGiven === indexesLeft) {\n    return true;\n  } else return false;\n};\n\nvar checkIfGreenCanBeGiven = function checkIfGreenCanBeGiven(numberOfGreens, numberOfGivenGreens) {\n  if (numberOfGivenGreens < numberOfGreens) {\n    return true;\n  } else return false;\n};\n\n//Handling start game button click\nvar startGame = async function startGame() {\n  var startButtonElement = document.getElementById(\"startButton\");\n  startButtonElement.disabled = true;\n  var resetButtonElement = document.getElementById(\"resetButton\");\n  resetButtonElement.disabled = false;\n\n  //Filling global arrays of \n  correctUpper = getRandomizedGreensArray();\n  correctLower = getRandomizedGreensArray();\n\n  await handleLeftSide();\n  showRightSideHideLeftSide();\n};\n\nvar handleLeftSide = function handleLeftSide() {\n  var upperLeftDiv = document.getElementById(\"upperLeft\");\n  var upperLeftBlockNodes = upperLeftDiv.childNodes;\n  var upperLeftBlocksArray = Array.from(upperLeftBlockNodes);\n\n  var lowerLeftDiv = document.getElementById(\"lowerLeft\");\n  var lowerLeftBlockNodes = lowerLeftDiv.childNodes;\n  var lowerLeftBlocksArray = Array.from(lowerLeftBlockNodes);\n\n  var timeAsMilliseconds = time * 1000;\n\n  showGreens(upperLeftBlocksArray, correctUpper);\n  gameIsOnTimeout = setTimeout(function () {\n    setBackToWhites(upperLeftBlocksArray);\n    showGreens(lowerLeftBlocksArray, correctLower);\n  }, timeAsMilliseconds);\n\n  return new Promise(function (resolve) {\n    gameIsOnPromiseTimeout = setTimeout(function () {\n      resolve();\n    }, timeAsMilliseconds * 2);\n  });\n};\n\nvar showGreens = function showGreens(blockArray, correctArray) {\n  blockArray.forEach(function (block, i) {\n    var greenOrNotBoolean = correctArray[i].green;\n    if (greenOrNotBoolean) {\n      block.style.backgroundColor = \"green\";\n    }\n  });\n};\n\nvar setBackToWhites = function setBackToWhites(blockArray) {\n  blockArray.forEach(function (block) {\n    block.style.backgroundColor = \"white\";\n  });\n};\n\nvar showRightSideHideLeftSide = function showRightSideHideLeftSide() {\n  var rightSideDivsHTMLCollection = document.getElementsByClassName(\"answer\");\n  var rightSideDivsArray = Array.from(rightSideDivsHTMLCollection);\n  var leftSideDivsHTMLCollection = document.getElementsByClassName(\"question\");\n  var leftSideDivsArray = Array.from(leftSideDivsHTMLCollection);\n\n  rightSideDivsArray.forEach(function (div) {\n    div.style.visibility = \"visible\";\n  });\n\n  leftSideDivsArray.forEach(function (div) {\n    div.style.visibility = \"hidden\";\n  });\n};\n\n/*Check if clicked block was green or not and give points accordingly */\nvar handleRightSideClick = function handleRightSideClick(idNumber, gridItem) {\n\n  //Figure out which grid was clicked\n  var classList = gridItem.className.split(/\\s+/);\n  var correctArray = classList.includes(\"upperRight\") ? correctUpper : correctLower;\n  var blockInfo = correctArray[idNumber];\n  if (blockInfo.green) {\n    gridItem.style.backgroundColor = \"green\";\n  } else {\n    gridItem.style.backgroundColor = \"red\";\n  }\n  givePoints(blockInfo, correctArray, idNumber);\n  if (greensClicked === numberOfGreens * 2) {\n    handleEndOfRound();\n  }\n};\n\nvar handleEndOfRound = function handleEndOfRound() {\n  disableOnClickEvents();\n  totalPoints += points;\n  showPoints();\n  handleButtonsEndOfRound();\n};\n\nvar handleButtonsEndOfRound = function handleButtonsEndOfRound() {\n  document.getElementById(\"resetButton\").innerHTML = \"New Game\";\n};\n\nvar disableOnClickEvents = function disableOnClickEvents() {\n  var gameGridItems = document.getElementsByClassName(\"gameGridItem\");\n  var gameGridItemsArray = Array.from(gameGridItems);\n  gameGridItemsArray.forEach(function (block, i) {\n    block.onclick = \"\";\n  });\n};\n\nvar givePoints = function givePoints(blockInfo, correctArray, idNumber) {\n  if (!blockInfo.checked) {\n    correctArray[idNumber].checked = true;\n    if (blockInfo.green) {\n      greensClicked++;\n      points++;\n    } else {\n      points--;\n    }\n  }\n  showPoints();\n};\n\nvar showPoints = function showPoints() {\n  var roundPointsElement = document.getElementById(\"roundPoints\");\n  var totalPointsElement = document.getElementById(\"totalPoints\");\n\n  roundPointsElement.innerHTML = points;\n  totalPointsElement.innerHTML = totalPoints;\n};\n\nvar resetGame = function resetGame() {\n  clearTimeout(gameIsOnTimeout);\n  clearTimeout(gameIsOnPromiseTimeout);\n  var resetButtonElement = document.getElementById(\"resetButton\");\n  if (resetButtonElement.innerHTML === \"New Game\") {\n    resetButtonElement.innerHTML = \"Reset Game\";\n  }\n  createGameGrids();\n  correctUpper = [];\n  correctLower = [];\n  points = 0;\n  greensClicked = 0;\n  var startButtonElement = document.getElementById(\"startButton\");\n  startButtonElement.disabled = false;\n};\n\n//Handling user's changes in preferences\nvar changeGridSize = function changeGridSize() {\n  var newValue = document.getElementById(\"sizeOfTheGridSelect\").value;\n  var newValueAsNumber = parseInt(newValue);\n  sizeOfTheGrid = newValueAsNumber;\n  createGameGrids();\n};\n\nvar changeNumberOfGreens = function changeNumberOfGreens() {\n  var newValue = document.getElementById(\"numberOfGreensSelect\").value;\n  var newValueAsNumber = parseInt(newValue);\n  numberOfGreens = newValueAsNumber;\n};\n\nvar changeSeconds = function changeSeconds() {\n  var newValue = document.getElementById(\"seconds\").value;\n  var newValueAsNumber = parseInt(newValue);\n  time = newValueAsNumber;\n};\n\n//Adding eventlisteners\nvar startButton = document.getElementById(\"startButton\");\nvar resetButton = document.getElementById(\"resetButton\");\nvar sizeSelectElement = document.getElementById(\"sizeOfTheGridSelect\").addEventListener(\"change\", changeGridSize);\nvar numberOfGreensSelectElement = document.getElementById(\"numberOfGreensSelect\").addEventListener(\"change\", changeNumberOfGreens);\nvar timeSelectElement = document.getElementById(\"seconds\").addEventListener(\"change\", changeSeconds);\nresetButton.addEventListener(\"click\", resetGame);\nstartButton.addEventListener(\"click\", startGame);\n\ncreateGameGrids();\n\n//# sourceURL=webpack:///./src/client/js/script.js?");

/***/ })

/******/ });