//Player Object
let playerObj = {
  "destroy": 0,
  "boost":false,
}

//Game Object
const allLevels = [
  {
      "level":
  [
       "LT                                            R",
       "                                               ",
       "                                               ",
       "                                     ^         ",
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
      "music":"level1",
      "time": 12,
      "buildings": 2,  
      "police_time":5,
      "police": 2,
      "police_speed":120,
  },
  {
      "level":
  [
       "LT                                            R",
       "                                               ",
       "                                               ",
       "                 ^                   %         ",
       "                                               ",
       "    %                                          ",
       "                                               ",
       "                                               ",
       "                                               ",
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
       "B                                              ",
  ],
      "music": "level2",
      "time": 15,
      "buildings": 4,  
      "police_time":5,
      "police": 3,
      "police_speed":125,
  },
   {
      "level":
  [
       "LT                                            R",
       "                                               ",
       "                                               ",
       "                 ^                   ^         ",
       "                                               ",
       "    %                                          ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                                               ",
       "                          %                    ",
       "                                               ",
       "                                               ",
       "                                               ",
       "    %                                          ",
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
      "music":"level3",
      "time": 20,
      "buildings": 5,  
      "police_time":4,
      "police": 4,
      "police_speed":130,
  },
    {
      "level":
  [
       "LT                                            R",
       "                                               ",
       "                                               ",
       "                 ^                   ^         ",
       "                                               ",
       "    %                                          ",
       "                                               ",
       "               %                               ",
       "                                               ",
       "                                               ",
       "                          %                    ",
       "                                               ",
       "                                               ",
       "                                    ^          ",
       "    %                                          ",
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
      "music":"level4",
      "time": 30,
      "buildings": 7,  
      "police_time":4,
      "police": 6,
      "police_speed":145,
  },

]; 


const gamePlay = (levelIdx) => {
 
  let collide = false;
  let currentLevel = allLevels[levelIdx];
  let police = 0;
  let buildings = currentLevel.buildings;
  const PLAYERSPEED = 300;
  const TIME_LEFT = currentLevel.time;
  const ENEMYSPEED = currentLevel.police_speed;
  
  const gameMusic = play(currentLevel.music,{
    loop:true,
    volume:0.5
  })
  
  gameMusic.play();
  
     addLevel(currentLevel.level, {
      width:32,
      height:32,
      "^": () => [
        sprite("grocery"),
        scale(2.7),
        area({height:54,width:56,offset:vec2(9,2)}),
        solid(),
        "store",
      ],
      "%": () => [
        sprite("grocery2"),
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
    
    const noteTxt = add([
      text("Note: HOLD arrow key + SPACE to destroy",{size:32}),
      pos(10,height()-50),
    ])

    const timer = add([
       text('0'),
       pos((width()/2)-50,10),
       layer('ui'),
      {
        time: TIME_LEFT     
      },
                    ])
    timer.action(()=>{
      timer.time -= dt();
      timer.text = timer.time.toFixed(2);
      if (timer.time <= 0) {
           go('lose', playerObj.destroy);
           playerObj.destroy = 0;
           gameMusic.pause();
                            }
                    })  
    const buildingArt = add([
      sprite("buildinglabel"),
      pos(24,24),
      solid(),
      area({width:74}),
      scale(2),
    ])
    const buildingsLabel = add([
      text("x"+ playerObj.destroy),
      pos(96,24),
      fixed(),
    ])

    const player = add([
    area({width:14, height:25,offset:vec2(3,9)}),
    solid(),
    scale(3.5),
    pos(width() * 0.5, height() * 0.5),
    sprite("fixguy", {anims: "down"}),
    ]);
    playerMovement(player, PLAYERSPEED);

  //Spawn police 
    wait(currentLevel.police_time, () => {
      for(; police < currentLevel.police; police++) {
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
     
    

    

    onKeyPress("space",()=>{
         collide = true;
     })
    onKeyRelease("space",()=>{
          collide = false;
     })

    //Destroy buildings 
    player.onCollide("store",(store)=>{
      if(collide && buildings > 1) {
        play("kaboom", {volume: 0.5});
        destroy(store);
        playerObj.destroy += 1;
        buildings--;
        buildingsLabel.text ="x"+playerObj.destroy;
        addKaboom(player.pos);
      }
      else if (collide && buildings == 1) {
        play("kaboom", {volume:0.5});
        destroy(store);
        playerObj.destroy += 1;
        buildingsLabel.text ="x"+playerObj.destroy;
        addKaboom(player.pos);
        wait(1, ()=> {
          if(levelIdx < allLevels.length-1) {
             gameMusic.pause();
             go("gameplay",levelIdx+1);
          }
          else{
             gameMusic.pause();
             go("startButton",playerObj.destroy);
          }
        })
      }
    })

    //Lose when collide with enemy
    player.onCollide("enemy",(enemy)=> {
      play("hit");
      addKaboom(player.pos);
      gameMusic.pause();
      go("lose",playerObj.destroy);
      playerObj.destroy = 0;
    })

    //enemy movement 
    action("enemy", (s)=>{
       const direction = player.pos.sub(s.pos).unit();
       s.move(direction.scale(ENEMYSPEED));
     })
        
    //Checking for winning condition 
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