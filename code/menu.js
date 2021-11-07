const startMenu = () => {
  const startButton = (txt) => {
    const btn = add([
      text(txt, { size: 48 }),
      pos(center().x, height() - 450),
      area({ cursor: "pointer" }),
      scale(1),
      origin("center"),
    ]);
    btnHover(btn);
    btn.onClick(() => go("gameplay"));
   
  };
  const quitButton = (txt) => {
    const btn = add([
      text(txt, { size: 48 }),
      pos(center().x, height() - 350),
      area({ cursor: "pointer" }),
      scale(1),
      origin("center"),
    ]);
    btnHover(btn);
    btn.onClick(() => debug.log("Quit game"));
  };

  const textbox = add([
    rect(500, 300, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 400),
    outline(2),
  ]);
  const worker = add([
    sprite("worker"),
    scale(5),
    origin("center"),
    pos(center().sub(-40, 250)),
  ]);
  const mayor = add([
    sprite("mayor"),
    scale(5),
    origin("center"),
    pos(center().sub(70, 250)),
  ]);


  const txt = add([
    text("FIX IT DUDE", { size: 64, width: width() - 230, font: "sinko" }),
    color(254, 200, 154),
    pos(center().x, height()-170),
    origin("center"),
  ]);

  startButton("Start");
  quitButton("Quit");
};

const btnHover = (btn)=>{
   btn.onUpdate(()=> { 
    if (btn.isHovering()) {
      btn.color= rgb(254, 197, 187);
      btn.scale = vec2(1.2);
    }
    else {
      btn.color=rgb();
      btn.scale=vec2(1);
    }
    })
}

module.exports = startMenu;
