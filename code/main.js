import kaboom from "kaboom";
const startConver = require("./conversations.js");
const startMenu = require("./menu.js");
const gamePlay= require("./gameplay.js");
const displayLose = require("./lose.js");
const quitGame = require("./quit.js");
// initialize context
kaboom({ background: [255, 229, 217] });

//load sound
loadSound("level4","sounds/level4.mp3");
loadSound("level3","sounds/level3.mp3");
loadSound("level2","sounds/level2.mp3");
loadSound("level1","sounds/gamemusic.mp3");
loadSound("arcade","sounds/arcade.mp3");
loadSound("hit","sounds/hit.wav");
loadSound("kaboom", "sounds/kaboom.wav");
loadSound("click","sounds/click.wav");
loadSound("hover","sounds/hover.wav");
// load assets
loadSprite("avatar", "sprites/dude-avatar.png");
loadSprite("mayor", "sprites/mayor.png");
loadSprite("worker", "sprites/dude-worker.png");
loadSprite("grocery","sprites/grocery.png");
loadSprite("grocery2","sprites/pink-grocery.png");
loadSprite("buildinglabel","sprites/buildinglabel.png");
loadSprite("police","sprites/police-cir.png");
loadSprite("street","sprites/street.png");
loadSpriteAtlas('sprites/woker-movement.png', {
  "fixguy": {
    "x": 0,
    "y": 0,
    "width": 96,
    "height": 32,
    "sliceX": 6,
    "anims": {
  
      "down": {"from": 1, "to":1, "loop":true, "speed": 7},
      "up": {"from": 0, "to":0, "loop":true, "speed": 7},
      "right": {"from": 2, "to":2, "loop":true, "speed": 7},
      "left": {"from":3, "to":5, "loop":true, "speed":7},
    }
  }
});


scene("start", () => {
  startConver();
});

go("start");
scene("quit", () => {
  quitGame();
})
scene("startButton", (score) => {
  startMenu(score);
});

scene("gameplay", (levelIdx) => {
  gamePlay(levelIdx);
})

scene("lose", (score) => {
  displayLose(score);
})