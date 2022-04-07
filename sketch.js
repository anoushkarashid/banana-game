
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage ; 
var FoodGroup, obstacleGroup ; 
var survivalTime , BananaCollected , invisibleBananaCollected;
var invisibleGround,background1, b_image , gameover , g_image;

var PLAY = 1;
var END = 0;
var game = PLAY;

var size = 0.09   ;
var hiTime, hiBanana;
var z = 0;
function preload(){
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",
"sprite_3.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

bananaImage = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");
ground_image = loadImage("jungle.jpg");
g_image = loadImage("gameover.png");
b_image = loadImage("jungle.jpg");
 
}
function setup() {
  createCanvas(displayWidth, displayHeight - 150);


  monkey  = createSprite(30,550);
  monkey.addAnimation("running" , monkey_running);
  monkey.scale = 0.02;
  // monkey.debug = true;
  
  banana = createSprite(0,0,1,1);
  obstacle = createSprite(0,0,1,1);
  invisibleGround = createSprite(width/2,605,width,5);
  
  
  background1 = createSprite(width/2,height/2,0,0)
  background1.addImage(b_image);


  gameover = createSprite(width/2,height/2);
  survivalTime = 0;
  BananaCollected = 0; 

  hiBanana = 0;
  hiTime = 0;


  FoodGroup = new Group();
  obstacleGroup = new Group();
}
function draw() {
  background(b_image)
  
  
  move();
  if(game == PLAY){
    gameover.visible = false;
  monkey.visible = true;
  monkey.changeAnimation("running" , monkey_running);
  monkey.scale = size;
  monkey.debug = true;
  // monkey.setCollider("rectangle",0,0,50,50)
  grow();
  touch();
  jump();
  Obstacles();
  food();
  drawSprites();

  
  if(hiTime <= survivalTime){ 
    if(frameCount % 10 == 0){
      hiTime++;
    }
  }
  if(frameCount % 10 == 0){
    survivalTime++;
  }  
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.remove(obstacle);
    obstacle.lifetime = 0;
    game = END;
    
  }
    

}
fill(220);
stroke(0)
textSize(25);
text("HiScore: Survival Time = " + hiTime, 25,50)
text("HiScore: Bananas Collected = " + hiBanana, 25,100)
  fill("blue");
  stroke(47,242,64);
  strokeWeight(5)
  textSize(50);
  text("Survival Time = "+ survivalTime , 545,50);
  
  fill("yellow");
  stroke('red');
  strokeWeight(5)
  text("Bananas Collected = "+ BananaCollected , 500,125);

  if(game === END){

    invisibleGround.visible = false;
    monkey.collide(invisibleGround);

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible = true ; 
    gameover.addImage(g_image);
    gameover.scale = 5;

    monkey.visible = false;

    drawSprites();
    textSize(45);
    fill("red");
    stroke(0);
    text("PRESS 'R' to restart !!" , width/2 - 175, height/2 + 100);
    if(keyDown("r")){
      reset();
    }
    // hiTime = survivalTime;
    // hiBanana = BananaCollected;
  
  }
  
}
function food(){
  var x = Math.round(random(200,350));
  var y = 175;
  if(frameCount % 100 == 0){
  banana = createSprite(x,y);
  banana.addImage(bananaImage);
  banana.scale = 0.25;
  banana.velocityX = -4;
  banana.lifetime = 200;
  // banana.debug = true;
  FoodGroup.add(banana);
  }
   
}
function Obstacles(){
  var x = Math.round(random(200,350));
  var y = 485;
  console.log(camera.position.x)
  a = camera.position.x;
  //frameCount % 300 == 0
  b = Math.round(random(0,50 ))
  // switch(b){
  if(b == 17){
    obstacle = createSprite(x +  50,y);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -2;
    obstacle.lifetime = 200;
  }
  obstacleGroup.add(obstacle);
  // break; 
  // default: break;
  // }
  // 
}
function jump(){
  if(keyDown("space") && monkey.y >= 250){
    monkey.velocityY = -15;
    // monkey.velocityX += 0.1
  }
  if(keyDown(RIGHT_ARROW)){
    monkey.x += 2
  }
  monkey.velocityY += 0.5; 
  invisibleGround.visible = false;
  monkey.collide(invisibleGround);

  banana.depth = monkey.depth;
  monkey.depth += 1;
}
function touch(){
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.remove(banana);
    banana.lifetime = 0;
    // FoodGroup.setLifetimeEach(0);
    BananaCollected += 1;
    if(z == 0){hiBanana++;}
    if(z == 1){if(hiBanana < BananaCollected){hiBanana++}}
    invisibleBananaCollected = BananaCollected;
  }
}
function reset(){
  z = 1
  game = PLAY;
  size = 0.1 ; 
  monkey.visible = true
  survivalTime = 0;
  BananaCollected = 0;
  hiTime = hiTime;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
}
function grow(){
  if(invisibleBananaCollected % 3 == 0 && BananaCollected > 0){
    invisibleBananaCollected += 1 ;
    size = size + 0.05;
  }
}
function move(){
  background1.velocityX = -5;
  if(background1.x <= width/2){
    background1.x = background1.width/2 + 10
  }
  camera.position.x = monkey.x + displayWidth/2.5;
}