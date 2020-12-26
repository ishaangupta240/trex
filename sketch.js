var trex,run,texcollide,ground,ground_img,invisible_ground,cloud_img,cloud_group,obs1,obs2,obs3,obs4,obs5,obs6,obstacle_group,restart,gameover,gameover_img,restart_img;
var gameState = 1;

function preload () {
  run = loadAnimation ("trex1.png","trex3.png","trex4.png");
  trexcollide = loadAnimation("trex_collided.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  restart_img=loadImage("restart.png");
  gameover_img=loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,5,5);
  trex.addAnimation("run",run);
  trex.addAnimation("collided",trexcollide);
  trex.scale=0.5;
  
  ground = createSprite(300,180,600,10);
  ground.addImage("ground_img",ground_img);
  ground.velocityX = -10;
  trex.depth = ground.depth+1;
  
  invisible_ground = createSprite(300,185,600,5);
  invisible_ground.visible = false;
  
  restart = createSprite(300,120,20,20);
  restart.addImage("restart",restart_img);
  restart.visible = false;
  restart.scale = 0.5;
  
  gameover = createSprite(300,90,20,20);
  gameover.addImage("gameover",gameover_img);
  gameover.visible = false;
  gameover.scale = 0.5;
  
  cloud_group = new Group()
  obstacle_group = new Group()
}
function draw() {
  background("white");
  if (gameState === 1) {
  ground.velocityX = -10;
  if (ground.x<0) {
    ground.x = ground.width/2;
  }
  if(keyDown("space")&& trex.y>=159) {
    trex.velocityY = -15;
  }
  trex.velocityY = trex.velocityY + 1;
  spawnobstacle();
  spawnCloud();
    if (obstacle_group.isTouching(trex)) {
        gameState = 0;
        }
  }
  else if (gameState === 0) {
    trex.changeAnimation("collided",trexcollide);
    trex.velocityX = 0;
    ground.velocityX = 0;
    cloud_group.setVelocityXEach(0);
    obstacle_group.setVelocityXEach(0);
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    restart.visible = true;
    gameover.visible = true;
    
    if (mousePressedOver(restart)) {
      reset();
    }
    
  }
  trex.collide(invisible_ground);
  drawSprites();

}
function reset() {
  gameState = 1;
  restart.visible = false;
  gameover.visible = false;
  cloud_group.destroyEach();
  obstacle_group.destroyEach();
  trex.changeAnimation("run",run);
}
function spawnCloud() {
  if (frameCount%60===0) {
    var cloud;
    cloud = createSprite(600,120,20,20)
    cloud.addImage("cloud_img",cloud_img);
    cloud.y = random(80,120);
    
    cloud.scale = 0.5;
    cloud.velocityX = -10;
    cloud.depth = trex.depth-1;
    cloud.lifetime = 80;
    cloud_group.add(cloud)
  }
}

function spawnobstacle(){
  if(frameCount%60===0){
    var obstacle=createSprite(600,175,20,20);
    var r=Math.round(random(1,6));
    switch(r){
      case 1:obstacle.addImage(obs1);
      break;
      case 2:obstacle.addImage(obs2);
       break;
       case 3:obstacle.addImage(obs3);
       break;
       case 4:obstacle.addImage(obs4);
       break;
       case 5:obstacle.addImage(obs5);
       break;
       case 6:obstacle.addImage(obs6);
       break;
       default: break;
        
          
    }
    obstacle.scale=0.5;
    obstacle.velocityX=-10;
    obstacle.lifetime=60;
    obstacle_group.add(obstacle);
  }
}