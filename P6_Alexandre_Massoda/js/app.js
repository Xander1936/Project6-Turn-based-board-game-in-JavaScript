/*Set the lenght of the boardMap, the number of obstacles 
And the number of moves for each player*/
const rows = 10;
const cols = 10;
let boardMap = [];
const numObstacles = 10;

const numMoves = 3;

let currentMoves = 1;

//Set the attack and defence buttons
let attack1 = document.getElementById("attack1");
let attack2 = document.getElementById("attack2");
let defence1 = document.getElementById("defence1");
let defence2 = document.getElementById("defence2");

//Create the Weapon class
class Weapon {
  constructor(name, className, damage) {
    this.name = name
    this.className = className
    this.damage = damage 
  }  
}
//Create weapons objects
const AK = new Weapon("AK", "AK", 25);
const pistol = new Weapon("pistol", "pistol", 15);
const sword = new Weapon("sword", "sword", 10);
const knife =  new Weapon("knife", "knife", 5);
//Put all the weapons in the array called weapons
let weapons = [AK, pistol, knife, sword];

//Create the player class with all the methods and properties
class Player {
  constructor(name, className, gun, x, y) {
      this.name = name
      this.className = className
      this.gun = gun
      this.x = x
      this.y = y
      this.defence = false
      this.health = 100
      this.alive = true
  }
  //Method to change the player position
  setPosition = (x, y) => {
      this.x = x
      this.y = y
  }
  //Method to pick a weapon
  setWeapon = (weapon) => {
    this.gun = weapon
  }
  /*Method to calculate the other player damage after the current player attack 
  whenever in normal or in defence mode*/
  takeDamage = (damage) => {
    if (this.defence === true) {
      this.defence = false
      this.health = this.health-damage/2
    }
    else {
      this.health = this.health-damage
    }
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  }
}
/*Create new objects player1 and player2 and put them in the array players
Here the object knife is the default weapon*/
let player1 = new Player("Batman", "player1", knife, -1, 0);
let player2 = new Player("Mario", "player2", knife, 0, 1);
//Put player1 and player2 in the array players
let players = [player1, player2];

//Define player1 and player2 as current and otherPlayer 
let currentPlayer = player1;
let otherPlayer = player2;

//Declare functions addBox, clearBoard, updateDashboard, draw and generateBoard
//addBox function
function addBox(classname) { 
    let box = document.createElement("div")
    box.innerHTML = "&nbsp;"
    box.setAttribute("class", "box " + classname)
    document.getElementById("board").append(box)
}

//Function to Reset the boardMap
function clearBoard() {
    document.getElementById("board").innerHTML = ""
}
//UpdateDashboard function 
function updateDashboard() {
  document.getElementById("player1_name").innerHTML = player1.name;
  document.getElementById("player1_health").innerHTML = player1.health;
  document.getElementById("player1_weapon").innerHTML = player1.gun.name;
  document.getElementById("player1_damage").innerHTML = player1.gun.damage;
  document.getElementById("player1_defence").innerHTML = player1.defence;
  document.getElementById("player2_name").innerHTML = player2.name;
  document.getElementById("player2_health").innerHTML = player2.health;
  document.getElementById("player2_weapon").innerHTML = player2.gun.name;
  document.getElementById("player2_damage").innerHTML = player2.gun.damage;
  document.getElementById("player2_defence").innerHTML = player2.defence;
  document.getElementById("player1_bar").value = player1.health;
  document.getElementById("player2_bar").value = player2.health;
}
//Draw function
const draw = () => {
    clearBoard();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        addBox(boardMap[i][j]);
      }
    }
  }; 
//GenerateBoard function
const generateBoard = () => {
  boardMap = [];
  player1 = new Player("Batman", "player1", knife, -1, 0);
  player2 = new Player("Mario", "player2", knife, 0, 1);
  players = [player1, player2]
  currentPlayer = player1
  otherPlayer = player2
  currentMoves = 1;
  addFreeSpaces();
  addObstacles();
  addPlayers();
  addWeapons();
  draw();
  updateDashboard();
  document.removeEventListener("keydown", handleKeys);
  document.addEventListener('keydown', handleKeys, false);
  disablePlayer1Buttons();
  disablePlayer2Buttons();
};
//AddFreeSpaces function
const addFreeSpaces = () => {
  for (let i = 0; i < rows; i++) {
    boardMap.push([]);
    for (let j = 0; j < cols; j++) {
      boardMap[i][j] = "free";
    }
  }
};
//Declare all the functions to set the random board 
const addObstacles = () => {
  let i = 0;
  let randomI;
  let randomJ;
  while (i < numObstacles) {
    randomI = Math.floor(Math.random() * rows);
    randomJ = Math.floor(Math.random() * cols);
    if (boardMap[randomI][randomJ] === "free") {
      boardMap[randomI][randomJ] = "obstacle";
      i++;
    }
  }
};
//addPlayers Function: randomly set the position of the players on the boardMap
const addPlayers = () => {
  let i = 0;
  let randomI;
  let randomJ;
  while (i < players.length) {
    randomI = Math.floor(Math.random() * rows);
    randomJ = Math.floor(Math.random() * cols);
    if (boardMap[randomI][randomJ] === "free") {
      boardMap[randomI][randomJ] = players[i].className;
      players[i].setPosition(randomI, randomJ);
      i++;
    }
  }
}
//addWeapons Function: randomly set the position of the weapons on the boardMap
const addWeapons = () => {
  let i = 0;
  let randomI;
  let randomJ;
  while (i < weapons.length) {
    randomI = Math.floor(Math.random() * rows);
    randomJ = Math.floor(Math.random() * cols);
    if (boardMap[randomI][randomJ] === "free") {
      boardMap[randomI][randomJ] = weapons[i].className;
      i++;
    }
  }
}
//addGuns function: randomly put the guns on the boardMap
const addGuns = () => {
  let i = 0;
  let randomI;
  let randomJ;
  while (i < guns.length) {
    randomI = Math.floor(Math.random() * rows);
    randomJ = Math.floor(Math.random() * cols);
    if (boardMap[randomI][randomJ] === "free") {
      boardMap[randomI][randomJ] = guns[i].name;
      i++;
    }
  }
};
//swapPlayers function to Switch player1 to player2 with the game rules
function swapPlayers() {
  if(currentPlayer.name === player1.name) {
    currentPlayer = player2
    otherPlayer = player1
  }
  else {
    currentPlayer = player1
    otherPlayer = player2
  }
}
//Move function with all the weapons, boundaries and number of moves conditions. 
const move = (player, dir) => {
  let oldX = player.x
  let oldY = player.y
  let newX = oldX
  let newY = oldY
  if (dir === "left") {
    newY = newY-1
  }
  else if (dir === "right") {
    newY = newY+1
  }
  if (dir === "up") {
    newX = newX-1
  }
  else if (dir === "down") {
    newX = newX+1 
}
//currentPlayer stay within Mapboundary
if (boundaryCheck(newX,newY) === true) {
  if (boardMap[newX][newY] === "free") {
    player.setPosition(newX,newY)
    boardMap[newX][newY] = player.className
    boardMap[oldX][oldY] = "free"
    draw()
    updateDashboard() 
  }
  /*currentPlayer leaves old weapon and takes new weapon
  map: sort all the weapon in a new array by className 
  and check if there is a weapon on the new position around newX, newY*/
  else if(weapons.map(w => w.className).includes(boardMap[newX][newY])) {
    //leave the current player gun on his old position oldX, oldY
    boardMap[oldX][oldY] = player.gun.className
    //Filter all the weapons in the array Weapons and check the weapon which correspond to the weapon at newX, newY
    //Set the new weapon the first index 0 
    const newWeapon = weapons.filter(w => w.className == boardMap[newX][newY])[0]
    //Current player picks the new weapon
    player.setWeapon(newWeapon)
    //The current player position is now newX, newY
    player.setPosition(newX,newY)
    boardMap[newX][newY] = player.className
    draw()
    updateDashboard()  
  }
  //battleCheck: set the battle mode when the current player is moving on the boardMap 
  //and when he meets the other player
  if (battleCheck(newX, newY) === true ) {
    //Deactivate move function and maintains the players to the battle mode 
    document.removeEventListener("keydown", handleKeys)
    //Show the fight buttons when players meet each others
    if (currentPlayer.name === player1.name) {
      enablePlayer1Buttons();
      disablePlayer2Buttons();
    }
    else {
      enablePlayer2Buttons();
      disablePlayer1Buttons();
    }
  }
  else {
    if (currentMoves === numMoves) {
      currentMoves = 1;
      /*If currentPlayer equal 0 return 1 else return 0 to change player1 to player2
      after 3 moves counted even on obstacle or on the boundary*/
      swapPlayers()  
    }
    else if (currentMoves < numMoves ) {
      currentMoves ++;
    }
  }
}
}
//boundaryCheck Function maintain the players on the boardMap bounds
const boundaryCheck = (x,y) => {
  if (x < 0 || x >= rows || y  < 0 || y >= cols) {
    return false
  } 
  else {
    return true
  }  
};
//battleCheck function: player1 and player2 Battle conditions 
const battleCheck = (newX, newY) => {
  //New cordinates around the current player
  let pos = [
    [newX-1, newY],
    [newX+1, newY],
    [newX, newY-1],
    [newX, newY+1],
  ]
  /*Filter all the positions in boundary 
  and filter players in positions p[0]-X and p[1]-Y return true if there is another player around the current player*/ 
  if (pos.filter((p) => boundaryCheck(p[0], 
    p[1])).filter(p => boardMap[p[0]][p[1]] === otherPlayer.className).length > 0) {
      return true
  }
  else {
    return false;
  }
}
//Player1 and player2 fight_buttons rules: show for the display method "block" and hide for "none"
const enablePlayer1Buttons = () => {
  document.getElementById("player1_fightbuttons").style.display = "block"
}
const disablePlayer1Buttons = () => {
  document.getElementById("player1_fightbuttons").style.display = "none"
}
const enablePlayer2Buttons = () => {
  document.getElementById("player2_fightbuttons").style.display = "block"
}
const disablePlayer2Buttons = () => {
  document.getElementById("player2_fightbuttons").style.display = "none"
}
//Attack function with all the game rules 
const attack = () => {
    if (currentPlayer.className === player1.className) {
      disablePlayer1Buttons()
      enablePlayer2Buttons()
    }
    else {
      disablePlayer2Buttons()
      enablePlayer1Buttons()
    }
    otherPlayer.takeDamage(currentPlayer.gun.damage)
    if (otherPlayer.alive === false) {
      otherPlayer.health = 0;
      alert("🚩🚨 Game Over ! 🏰 The winner is " + currentPlayer.name + ". 🥇🏆🎯 " + otherPlayer.name + " surrenders 🏳. Click on OK to restart the game. 😁😎😉")
      generateBoard()
    }
    else {
      updateDashboard()
      swapPlayers()
    }  
}
//Defend function with all the game rules
const defend = () => {
  if (currentPlayer.className === player1.className) {
    disablePlayer1Buttons()
    enablePlayer2Buttons()
  }
  else {
    disablePlayer2Buttons()
    enablePlayer1Buttons()
  }
  currentPlayer.defence = true;
  updateDashboard()
  swapPlayers() 
}
//disableKeyPress function "event" to prevent default on the Dashboard
const disableKeyPress = (e) => {
  e.preventDefault();
};
//Set the arrow keys on the keyboard to move the current player
const handleKeys =  (event) => { 
  //To avoid the default movements of the boardMap by click or keyboard  
  event.preventDefault()
  //Set the arroww key with the currentPlayerIndex  
  const keyName = event.key;    
  console.log(keyName)
  if (keyName === "ArrowLeft") {
    move(currentPlayer, "left")
  }
  if (keyName === "ArrowRight") {
    move(currentPlayer, "right")
  }
  if (keyName === "ArrowUp") {
    move(currentPlayer, "up")
  }
  if (keyName === "ArrowDown") {
    move(currentPlayer, "down")
  }
}

//Here we call the generateBoard() function to manage all together 
generateBoard()

