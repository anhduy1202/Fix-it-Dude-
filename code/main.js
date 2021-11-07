import kaboom from "kaboom";
const startConver = require("./conversations.js");
const startMenu = require("./menu.js");
const gamePlay= require("./gameplay.js");
// initialize context
kaboom({ background: [255, 229, 217] });

// load assets
loadSprite("avatar", "sprites/dude-avatar.png");
loadSprite("mayor", "sprites/mayor.png");
loadSprite("worker", "sprites/dude-worker.png");
loadSprite("grocery","sprites/grocery.png");
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

scene("startButton", () => {
  startMenu();
});

scene("gameplay", () => {
  gamePlay();
})