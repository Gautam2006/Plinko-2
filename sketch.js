const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
var engine, world
var score = 0;
var particle;
var turn = 0;
var gameState = "start";
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var title, play, info, end;
var titleImg, playImg, infoImg, endImg;
var x = "menu";

function preload() {
  titleImg = loadImage("Images/Title.jpg");
  playImg = loadImage("Images/playButton.jpg");
  infoImg = loadImage("Images/Instruction.jpg");
  endImg = loadImage("Images/End.jpg");
}

function setup() {
  createCanvas(1600, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(400, height, 800, 20);
  play = createSprite(750, 500, 20, 20);
  play.addImage(playImg);
  play.scale = 0.55;
  title = createSprite(750, 200, 20, 20);
  title.addImage(titleImg);
  title.scale = 1.2;
  info = createSprite(1150, 350, 20, 20);
  info.addImage(infoImg);
  info.scale = 0.3;
  end = createSprite(750, 350, 20, 20);
  end.addImage(endImg);
  end.scale = 0.5;

  for (var k = 0; k <= 800; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (var j = 75; j <= 800; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= 800 - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= 800; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= 800 - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }

}



function draw() {

  if (x == "menu") {
    background("lightgreen");
    play.display();
    title.display();
    if (mousePressedOver(play)) {
      x = "game";
    }
    if (mouseIsOver(play)) {
      play.scale = 0.65;
      cursor(HAND);
    } else {
      play.scale = 0.55;
      cursor(ARROW);
    }
  }

  if (x == "game") {
    background("black");
    textSize(20);
    textStyle("bold");
    noStroke();
    fill("YELLOW")
    text("Score : " + score, 20, 30);
    fill("cyan");
    text("Turns Left :  " + (5 - turn), 630, 30);
    fill(255);
    text("500", 25, 600);
    text("500", 100, 600);
    text("500", 185, 600);
    text("500", 265, 600);
    text("100", 345, 600);
    text("100", 425, 600);
    text("100", 505, 600);
    text("200", 585, 600);
    text("200", 665, 600);
    text("200", 745, 600);
    Engine.update(engine);
    ground.display();
    info.display();

    if (particle != null) {
      particle.display();
      if (turn >= 6) {
        gameState = "end";
      }
      if (particle.body.position.y > 774 && particle.body.position.y < 776) {

        if (particle.body.position.x < 300) {
          score = score + 500;
        }
        if (particle.body.position.x > 301 && particle.body.position.x < 600) {
          score = score + 100;
        }
        if (particle.body.position.x > 601 && particle.body.position.x < 900) {
          score = score + 200;
        }
      }
    }

    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].display();
    }

    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();
    }

    if (gameState == "end") {
      background("yellow");
      end.display();
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (gameState !== "end") {
      particle = new Particle(mouseX, 10, 10, 10);
      turn++
    }

  }
}