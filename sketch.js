const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var world,engine;

var ground1,ground2,ground3,ground4;

var particle;
var plinkos = [];
var divisions = []; 

var score = 0;
var gameState = "play";
var chance = 5;

var divisionHeight = 300;

function setup() {
  createCanvas(480,720);
  drawSprites();

  engine = Engine.create();
  world = engine.world;

  ground1 = new Ground(240,720,width,10)
  ground3 = new Ground(0,360,10,height)
  ground4 = new Ground(480,360,10,height)

  for (var k = 0; k <= width ; k = k+80) {
    divisions.push(new Divisions(k , height - divisionHeight/2 , 10 , divisionHeight))
    
  }

  for(var j = 35 ; j <= width - 10 ; j = j + 50){
    plinkos.push(new Plinko(j , 75))
  }

  for(var j = 15 ; j <= width - 10 ; j = j + 50){
    plinkos.push(new Plinko(j , 135))
  }

  for(var j = 35 ; j <= width - 10 ; j = j + 50){
    plinkos.push(new Plinko(j , 195))
  }

  for(var j = 15 ; j <= width - 10 ; j = j + 50){
    plinkos.push(new Plinko(j , 255))
  }



  
}

function draw() {
  background(0);

  Engine.update(engine);

  ground1.display();
  ground3.display();
  ground4.display();
 
  push();
  fill("red")
  strokeWeight(3)
  stroke("cyan")
  textSize(25)
  text("SCORE = "+score , 180,50)
  pop();

  fill("white")
  textSize(20)
  text("Balls left = "+chance,20,20)

  for(var k = 0 ; k < divisions.length ; k++){
    divisions[k].display();
    
  }

  for(var j = 0 ; j < plinkos.length ; j++){
    plinkos[j].display();
  }
  
  push();
  fill(245, 245, 66)
  textSize(25)
  text("500",20,450)
  text("200",100,450)
  text("100",180,450)
  text("100",260,450)
  text("200",340,450)
  text("500",420,450)
  pop();

 

  if(particle != null){
    particle.display();
  
    if(particle.body.position.y > 420){
      chance = chance - 1;

      if(particle.body.position.x < 80){
        score = score + 500;
        particle = null;

      }

      if(particle.body.position.x < 160 && particle.body.position.x > 80){
        score = score + 200;
        particle = null;

      }

      if(particle.body.position.x < 240 && particle.body.position.x > 160){
        score = score + 100;
        particle = null;

      }

      if(particle.body.position.x < 400 && particle.body.position.x > 240){
        score = score + 100;
        particle = null;
        
      }

      if(particle.body.position.x < 480 && particle.body.position.x > 400){
        score = score + 500;
        particle = null;
        
      } 
  }
}

  
  if(chance <= 0){
    gameState = "end";
  }


  if(gameState === "end"){
    fill(2, 250, 7)
    textSize(40)
    strokeWeight(3)
    stroke("red")
    text("GAME OVER",120,350)
  }



  drawSprites();

}

function mousePressed(){
  if(gameState != "end"){
    
    particle = new Ball(mouseX,10);
  }
}