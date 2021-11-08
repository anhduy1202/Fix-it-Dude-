//Player Object
let playerObj = {
  "destroy": 0,
  "boost":false,
}

//Game Object
let allLevels = [
  {
      "level":
  [
       "LT                                             R",
       "                                                ",
       "                ^                    ^         ",
       "                                               ",
       "                                               ",
       "    ^                                          ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "B                                              ",
  ],
      "buildings": 3,  
      "police": 3,
      "police_speed":100,
  },

]

const gamePlay = (levelIdx) => {
  let collide = false;
  let police = 0;
  const PLAYERSPEED = 300;
  const ENEMYSPEED = allLevels[levelIdx].police_speed;
  

     addLevel(allLevels[levelIdx].level, {
      width:32,
      height:32,
      "^": () => [
        sprite("grocery"),
        scale(2.7),
        area({height:54,width:56,offset:vec2(9,2)}),
        solid(),
        "store",
      ],
      "T": () => [
        sprite("street"),
        area({width:width(),offset:vec2(0,-35)}),
        solid(),
      ],
      "B": () => [
        sprite("street"),
        area({width:width(),offset:vec2(0,-10)}),
        solid(),
      ],
       "L": () => [
        sprite("street"),
        area({height:height(),offset:vec2(-20,0)}),
        solid(),
      ],
       "R": () => [
        sprite("street"),
        area({height:height(),offset:vec2(20,0)}),
        solid(),
      ],

    })
    const buildingArt = add([
      sprite("buildinglabel"),
      pos(24,24),
      solid(),
      area({width:74}),
      scale(2),
    ])
    const buildingsLabel = add([
      text("x"+playerObj.destroy),
      pos(96,24),
      fixed(),
    ])

    const player = add([
    area({width:16, height:8,offset:vec2(0,9)}),
    solid(),
    scale(3.5),
    pos(width() * 0.5, height() * 0.5),
    sprite("fixguy", {anims: "down"}),
    ]);
    
    //Spawn police after every 5 secs
    wait(5, () => {
      for(; police < allLevels[levelIdx].police; police++) {
       const policeCar = add([
        area({width:28, height:24,offset:vec2(3,0)}),
        solid(),
        scale(2),
        pos(rand(vec2(width()/2), vec2(height()/4))),
        sprite("police"),
        "enemy",
      ]);
      }
     });
     
    

    playerMovement(player, PLAYERSPEED);

    onKeyPress("space",()=>{
         collide = true;
     })
    onKeyRelease("space",()=>{
          collide = false;
     })

    player.onCollide("store",(store)=>{
      if(collide) {
        destroy(store);
        playerObj.destroy += 1;
        buildingsLabel.text ="x"+playerObj.destroy;
        addKaboom(player.pos);
      }
    })

    //enemy movement 
    action("enemy", (s)=>{
       const direction = player.pos.sub(s.pos).unit();
       s.move(direction.scale(ENEMYSPEED));
     })
        
    //Checking for winning condition
    onUpdate(()=> {
       if(playerObj.destroy == allLevels[levelIdx].buildings) {
        playerObj.destroy = 0;
        debug.log("You win!");
        go("startButton"); //Change later
      }
    })
debug.inspect = true
   
    
}

const playerMovement = (player,PLAYERSPEED) => {
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
        player.move(-PLAYERSPEED,0);
      }

      else if(right){
        if (curAnim !== "right") {
           player.play("right");
        }
        player.move(PLAYERSPEED,0);
      }

       else if(up){
        if (curAnim !== "up") {
           player.play("up");
        }
        player.move(0,-PLAYERSPEED);
      }

       else if(down){
        if (curAnim !== "down") {
           player.play("down");
        }
        player.move(0,PLAYERSPEED);
      }
      
      
     
    });
}



/*const checkDirection = (enemy,player,speed) => {
    let dx = enemy.pos.x - player.pos.x;
    let dy = enemy.pos.y - player.pos.y;
    let distance = Math.hypot(dx,dy);
    let rot = rad2deg(Math.atan(dy/dx));
    return rot;
}*/

module.exports = gamePlay;