const startConver = () => {
  const bgMusic = play("arcade", {
    loop:true,
    volume:0.5
  })
  bgMusic.play();
  const dialogs = [
    ["avatar", "Hi! I'm the Fix It Dude"],
    [
      "mayor",
      "Hi! I'm Mayonnaise the Mayor, fix my city ! -panik-",
    ],
    [
      "worker",
      "Don't worry Mr.Mayonnaise, the best way to FIX anything is by DESTROYING IT !!!",
    ],
    ["mayor", "WHAT ?!!"],
    ["mayor", "empty"],
  ];

  let currentDialog = 0;

  const textbox = add([
    rect(width() - 150, 250, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 200),
    outline(2),
  ]);

  const avatar = add([
    sprite("avatar"),
    scale(11),
    origin("center"),
    pos(center().sub(0, 100)),
  ]);
  const txt = add([
    text("", { size: 32, width: width() - 230, font: "sinko" }),
    pos(textbox.pos),
    origin("center"),
  ]);
  const instruction = add([
    text("Hit space to continue", { size: 25 }),
    pos(width() / 2.6, height() - 100),
    color(233, 196, 106),
  ]);
  onKeyPress("space", async () => {
    play("click");
    currentDialog = (currentDialog + 1) % dialogs.length;
    updateDialog();
   if (currentDialog == dialogs.length - 1) {
      bgMusic.pause();
      go("startButton");
    }

   
  });
   
  updateDialog = () => {
    const [char, dialog] = dialogs[currentDialog];
    avatar.use(sprite(char));
    txt.text = dialog;
  };
  updateDialog();
};

module.exports = startConver;
