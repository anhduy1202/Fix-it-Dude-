
const gamePlay = () => {
  
  const SPEED = 300;
    const player = add([
    scale(3.5),
    pos(width() * 0.5, height() * 0.5),
    sprite("fixguy", {anims: "down"}),
    ]);
    playerMovement(player, SPEED);

    
}

const playerMovement = (player,SPEED) => {
  player.action(() => {
      //check for input
      const left = keyIsDown("left");
      const right = keyIsDown("right");
      const up = keyIsDown("up");
      const down = keyIsDown("down");
      const curAnim = player.curAnim();

      if(left){
        if (curAnim !== "left") {
           player.play("left");
        }
        player.move(-SPEED,0);
      }

      else if(right){
        if (curAnim !== "right") {
           player.play("right");
        }
        player.move(SPEED,0);
      }

       else if(up){
        if (curAnim !== "up") {
           player.play("up");
        }
        player.move(0,-SPEED);
      }

       else if(down){
        if (curAnim !== "down") {
           player.play("down");
        }
        player.move(0,SPEED);
      }
      
      
     
    });
}

module.exports = gamePlay;