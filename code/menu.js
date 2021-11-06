const startMenu = () => {
  const startButton = (txt) => {
  const btn = add([
		text(txt, {size: 48}),
		pos(center().x, height() - 450),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])
  btn.onClick(() => debug.log("Start game"));
}
  const quitButton = (txt) => {
  const btn = add([
		text(txt, {size: 48}),
		pos(center().x, height() - 350),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])
  btn.onClick(() => debug.log("Quit game"));
}

const textbox = add([
    rect(500, 300, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 400),
    outline(2),
  ]);
const txt = add([
    text("", { size: 32, width: width() - 230 , font: "sinko"}),
    pos(textbox.pos),
    origin("center"),
  ]);

startButton("Start");
quitButton("Quit")

}

module.exports = startMenu;