var panda,pandaImg,bgImg,bambo,bamboimg,ground,rocks,rocks2,rock3,rocksImg,rocks2Img,rock3Img,rockgroup,bamboGroup,score
var PLAY=1
var END=0
var gameState=PLAY
var gameOver,Restart,gameOverImg,RestartImg
function preload(){
    pandaImg=loadImage("fox (2).png")
    bgImg=loadImage("bgImg.jpg")
    bamboimg=loadImage("bamboo.png")
    rocksImg=loadImage("rocks.png")
    rocks2Img=loadImage("rocks2.png")
    rocks3Img=loadImage("rocks3.png")
    gameOverImg=loadImage("gameOver.png")
    RestartImg=loadImage("Restart (2).png")
}   
function setup(){
   createCanvas(displayWidth,displayHeight)
    panda=createSprite(50,250,20,30)
    panda.addImage(pandaImg)
    ground=createSprite(displayWidth,displayHeight-50,displayWidth,10)
    ground.velocityX=-3
    ground.x=ground.width/2
    ground.shapeColor="light green"
     rockgroup=createGroup()
     bamboGroup=createGroup()
     score=0
     
     panda.setCollider("circle",0,0,40)  
     gameOver=createSprite(displayWidth/2,displayHeight/2)
     Restart=createSprite(displayWidth/2,displayHeight/2+70) 
     gameOver.addImage(gameOverImg)
     Restart.addImage(RestartImg)
     gameOver.scale=0.1
     Restart.scale=0.1
} 
function draw(){
    background(bgImg)
    textSize(20)
    fill("Black")
    text("score:"+score,1100,50)
    if(gameState===PLAY){
     gameOver.visible=false
     Restart.visible=false   
     ground.velocityX=-(6+3*score/100)
    
    if(ground.x<0){
      ground.x=ground.width/2

    }
    if(keyDown("space")&&panda.y>=displayHeight/2){ 
        panda.velocityY=-10 
    }
        panda.velocityY=panda.velocityY+1   
    if(rockgroup.isTouching(panda)){
        gameState=END
    }
    if(bamboGroup.isTouching(panda)){
        score=score+10
        bamboGroup.destroyEach() 
    }

    spawnBambo()
    bamboo()
}
else if(gameState===END){
    ground.velocityX=0
    panda.velocityY=0
    rockgroup.setVelocityXEach(0)
    bamboGroup.setVelocityXEach(0)
    rockgroup.setLifetimeEach(-1)
    bamboGroup.setLifetimeEach(-1)
    gameOver.visible=true
    Restart.visible=true
    if(mousePressedOver(Restart)){
        reset()
    }
} 
panda.collide(ground) 
    drawSprites()
} 
function bamboo(){
   if(frameCount%300===0){
       var rocks=createSprite(displayWidth,displayHeight-90,10,20)
       rocks.velocityX=-(6+3*score/100)
       var s=Math.round(random(1,3))
       switch(s){
           
           case 1:rocks.addImage(rocksImg)
           break;
           case 2:rocks.addImage(rocks2Img)
           break;
           case 3:rocks.addImage(rocks3Img)
       }
      rocks.scale=0.3
      rockgroup.add(rocks)
      rocks.lifetime=400

   }
}
function spawnBambo(){
    if(frameCount%550===0){
        var bambo=createSprite(displayWidth,displayHeight-60,10,20) 
        bambo.y=Math.round(random(displayHeight-500,displayHeight-80))
        bambo.velocityX=-(6+3*score/100)
        bambo.addImage(bamboimg)
        bambo.scale=0.5
        bambo.lifetime=400
        bamboGroup.add(bambo)


    }
}  
function reset(){
    gameState=PLAY
    gameOver.visible=false
    Restart.visible=false
    bamboGroup.destroyEach()
    rockgroup.destroyEach()
    score=0
}