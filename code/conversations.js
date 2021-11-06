const startConver = () => {
  const dialogs = [
    ["avatar", "Hi! I'm the Fix It Dude"],
    [
      "mayor",
      "Oh hi! I'm Mayonnaise the Mayor, our city is falling apart -panik- ",
    ],
    [
      "worker",
      "Don't worry Mr.Mayonnaise, I'm here to FIX IT! with money obviously",
    ],
    ["mayor", "... okay, let's play !!"],
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
  onKeyPress("space", () => {
    currentDialog = (currentDialog + 1) % dialogs.length;
    if (currentDialog == dialogs.length - 1) {
      go("startButton");
    }
    updateDialog();
  });

  updateDialog = () => {
    const [char, dialog] = dialogs[currentDialog];
    avatar.use(sprite(char));
    txt.text = dialog;
  };
  updateDialog();
};

module.exports = startConver;
