import kaboom from "kaboom";
const startConver = require("./conversations.js");
const startMenu = require("./menu.js");
// initialize context
kaboom({ background: [255, 229, 217] });

// load assets
loadSprite("avatar", "sprites/dude-avatar.png");
loadSprite("mayor", "sprites/mayor.png");
loadSprite("worker", "sprites/dude-worker.png");
scene("start", () => {
startConver();
 
});

go("start");


scene("startButton", () => {
  startMenu();

})