var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1200,600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.6;
  var balloonPosition=database.ref("ball/position");
  balloonPosition.on("value",readPosition,tellError);
  textSize(10); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    writePosition (-1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.01;


    
    //write code to move air balloon in left direction


  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition (1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
  }

  drawSprites();
  fill("orange");
  stroke("white");
  textSize(20);
  text("**Use arrow keys to move Hot Air Balloon",50,50);
}

function writePosition(x,y) {
  database.ref('balloon/position').set({
    'x':position.x + x,
    'y':position.y + y
  })
}

function readPosition(data){
  position=data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function tellError() {
  console.log("Error in the writing to the database");
}