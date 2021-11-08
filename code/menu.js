const startMenu = (score) => {
  const bgMusic = play("arcade", {
    loop:true,
    volume:0.5
  })
  bgMusic.play();
  const startButton = (txt,bgMusic) => {
    const btn = add([
      text(txt, { size: 48 }),
      pos(center().x, height() - 450),
      area({ cursor: "pointer" }),
      scale(1),
      origin("center"),
    ]);
    btnHover(btn);
    btn.onClick(() =>{
      bgMusic.pause();
      play("click");
      go("gameplay",0);
       });
   
  };
  const quitButton = (txt,bgMusic) => {
    const btn = add([
      text(txt, { size: 48 }),
      pos(center().x, height() - 350),
      area({ cursor: "pointer" }),
      scale(1),
      origin("center"),
    ]);
    btnHover(btn);
    btn.onClick(() =>{
      bgMusic.pause();
      play("click");
       go("quit");
    });
  };

  const textbox = add([
    rect(500, 300, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 400),
    outline(4),
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
  
 if(score >= 0) {
  const textScore = add([
    text("BUILDINGS: " + score, {size:48}),
    pos(center().x, height()-80),
    origin("center"),
  ]);
  }
 
  const txt = add([
    text(`"FIX" IT DUDE`, { size: 64, width: width() - 230, font: "sinko" }),
    outline(2),
    color(254, 200, 154),
    pos(center().x, height()-170),
    origin("center"),
  ]);

  startButton("START",bgMusic);
  quitButton("QUIT",bgMusic);
};

const btnHover = (btn)=>{
  const hoverSfx = play("hover");
   btn.onUpdate(()=> { 
    if (btn.isHovering()) {
      hoverSfx.play();
      btn.color= rgb(254, 197, 187);
      btn.scale = vec2(1.2);
    }
    else {
      hoverSfx.pause();
      btn.color=rgb();
      btn.scale=vec2(1);
    }
    })
}

module.exports = startMenu;
