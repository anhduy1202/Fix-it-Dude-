

const quitGame = () => {
 const textbox = add([
    rect(500, 300, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 400),
    outline(4),
  ]);
  const quitTxt = add([
    text("BYE BYE :D", { size: 64 }),
    pos(center().x, center().y),
    scale(1),
    origin("center"),
    ]);
  const credit = add([
    text("Made by: Daniel Truong @2021", { size: 24 }),
    color(0, 150, 199),
    pos(center().x, center().y+100),
    scale(1),
    origin("center"),
    ]);
  
}

module.exports = quitGame;