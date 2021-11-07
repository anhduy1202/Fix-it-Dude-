const levels = [
  [
       "                                            ",
       "                                            ",
       "                ^                    ^      ",
       "                                            ",
       "                                            ",
       "                                            ",
       "                                            ",
       "                                            ",
       "                                            ",
       "                                            ",
       "                                            ",
  ],  

]
const gamePlay = () => {

     addLevel(levels[0], {
      width:32,
      height:32,
      "^": () => [
        sprite("grocery"),
        scale(3),
        area({height:32,offset:vec2(0,-15)}),
        solid(),
        "store",
      ],

    })
  const SPEED = 300;
    const player = add([
    area({width:16, height:16}),
    solid(),
    scale(3.5),
    pos(width() * 0.5, height() * 0.5),
    sprite("fixguy", {anims: "down"}),
    ]);
    playerMovement(player, SPEED);

    player.onCollide("store",(store)=>{
     onKeyPress("space",()=>{
        destroy(store);
        addKaboom(player.pos);
     })
    })
 
    
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