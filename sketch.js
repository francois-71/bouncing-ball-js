let loadingScene;
let mainMenuScene;
let gameLevel1Scene;
let gameLevel2Scene;
let leaderboardScene;
var score = 0
var blocks = [];
var spikes = [];
var ball;
var nextValue = 300;
var arr = [350,450,550,650,750]
let blockData;
count = 0
let bounceSound;
let gameOverSound;
let backgroundVideo;


// Declare a global variable to keep track of the current scene
let currentScene;
function preload(){
  blockData = loadJSON('2milestone.json');
  img = loadImage("images/background.jpg");
  bounceSound = loadSound('sound/bounceSound.mp3');
  gameOverSound = loadSound("sound/gameOverSound.mp3")
  //backgroundVideo = createVideo("video/videoBackground.mp4");
}

function setup() {
  
  createCanvas(700, 600);
  background(img);
  setCookie("score", 0)
  

  // Initialize each scene
  loadingScene = new LoadingScene();
  mainMenuScene = new MainMenuScene();
  gameLevel1Scene = new GameLevel1Scene();
  gameLevel2Scene = new GameLevel2Scene();
  leaderboardScene = new LeaderboardScene();
  
  // Set the initial scene to the loading scene
  currentScene = "mainMenu";
  // Create the ball
  
}

function draw() {
  background(255);
  switch (currentScene) {
    case 'loading':
      loadingScene.display()
      break;

    case 'mainMenu':
      mainMenuScene.display();
      if (mainMenuScene.gamelevel1button.isClicked()) {
        currentScene = 'gameLevel1';
      } else if (mainMenuScene.gamelevel2button.isClicked()){
        currentScene = 'gameLevel2';
      } else if (mainMenuScene.leaderboardButton.isClicked()){
        currentScene = 'leaderboard'
      }
      break;

    case 'gameLevel1':
      background(img);
      // We want the code below to start when the start button is clicked. That's why we don't write it in the setup function. 
      // And we also want it to run only once.
      if (count == 0){
        count = count + 1
        ball = new Ball(100, window.height - 114);
        for (let i = 0; i < blockData.blocks_length - 1; i++) {
          let x = blockData.block[i].coordinates.x
          let y = blockData.block[i].coordinates.y
          let color = blockData.block[i].color.toString();
          blocks.push(new Block(x, y, color));
        }
        
        // initiate first spike to generate the others
          spikes.push(new Spike(800, 450));
        
      }
      
      gameLevel1Scene.display()
      if (gameLevel1Scene.backToMenuButton.isClicked()){
        resetPlayground();
        currentScene = "mainMenu";
        
      }
      break;

    case 'gameLevel2':
      background(img);
      // We want the code below to start when the start button is clicked. That's why we don't write it in the setup function. 
      // And we also want it to run only once.
      if (count == 0){
        count = count + 1
        ball = new Ball(100, window.height - 114);
        for (let i = 0; i < blockData.blocks_length - 1; i++) {
          let x = blockData.block[i].coordinates.x
          let y = blockData.block[i].coordinates.y
          let color = blockData.block[i].color.toString();
          blocks.push(new Block(x, y, color));
        }
        // initiate first spike to generate the others
          spikes.push(new Spike(800, 450));
      }
      gameLevel2Scene.display()
      if (gameLevel2Scene.backToMenuButton.isClicked()){
        resetPlayground();
        currentScene = "mainMenu";
        
      }
      break;

    case 'leaderboard':

      leaderboardScene.display();
      if (keyIsDown(ENTER)) {
        currentScene = "mainMenu";
      }
      break;
  }
}

// Example of a function to navigate to a different scene
function goToMainMenu() {
  currentScene = mainMenuScene;
}

// Example of a scene class
class LoadingScene {
  constructor() {
    // Initialize any properties for the scene
  }

  display() {
    // Draw the loading scene
    background(230)
    text("Loading...", width/2, height/2);
  }
}

class MainMenuScene {
  constructor() {
    // Initialize any properties for the scene
    this.startButton = new StartButton();
    this.gamelevel1button = new GameLevel1Button();
    this.gamelevel2button= new GameLevel2Button();
    this.leaderboardButton = new LeaderBoardButton();
  }

  display() {
    // Draw the main menu elements
    background(img)
    textAlign(CENTER);
    fill(255)
    text("Welcome to the Bouncing Ball Game", width/2, height/6);
    
    this.startButton.display();
    this.gamelevel1button.display();
    this.gamelevel2button.display();
    this.leaderboardButton.display();
  }
}


// THis class is for the MainMenuScene
class StartButton {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.width = 100;
    this.height = 50;
    this.color = color(0, 0, 0);
    this.text = "Good luck ! ";
  }

  display() {
    fill(this.color);
    rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    fill(255);
    text(this.text, this.x, this.y + this.height/4);
  }

  // Function to check if the button is clicked
  isClicked() {
    if (mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 &&
        mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      return true;
    } else {
      return false;
    }
  }
}
class GameLevel1Button {
  constructor() {
    this.x = width/4;
    this.y = height/4;
    this.width = 100;
    this.height = 50;
    this.color = color(255, 0, 0);
    this.text = "Level 1";
  }

  display() {
    // Draw the button
    fill(this.color);
    rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    fill(255);
    text(this.text, this.x, this.y + this.height/4);
  }

  // Function to check if the button is clicked
  isClicked() {
    if (mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 &&
        mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      return true;
    } else {
      return false;
    }
  }
}
class GameLevel2Button {
  constructor() {
    this.x = width/2;
    this.y = height/4;
    this.width = 100;
    this.height = 50;
    this.color = color(255, 0, 0);
    this.text = "Level 2";
  }

  display() {
    // Draw the button
    fill(this.color);
    rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    fill(255);
    text(this.text, this.x, this.y + this.height/4);
  }

  // Function to check if the button is clicked
  isClicked() {
    if (mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 &&
        mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      return true;
    } else {
      return false;
    }
  }
}
class LeaderBoardButton {
  constructor() {
    this.x = width/2 + width /4;
    this.y = height/4;
    this.width = 100;
    this.height = 50;
    this.color = color(255, 0, 0);
    this.text = "Leaderboard";
  }

  display() {
    // Draw the button
    fill(this.color);
    rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    fill(255);
    text(this.text, this.x, this.y + this.height/4);
  }

  // Function to check if the button is clicked
  isClicked() {
    if (mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 &&
        mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      return true;
    } else {
      return false;
    }
  }
}
class BackToMenuButton{
  constructor() {
    this.x = 650, 
    this.y = window.height - 400;
    this.width = 100;
    this.height = 50;
    this.color = color(255, 0, 0);
    this.text = "Menu";
  }

  display() {
    // Draw the button
    fill(this.color);
    rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    fill(255);
    text(this.text, this.x, this.y + this.height/4);
  }

  // Function to check if the button is clicked
  isClicked() {
    if (mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 &&
        mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      return true;
    } else {
      return false;
    }
  }
}
class LeaderboardScene {
  display() {
    background(img)
    /*
    backgroundVideo.loop();
    backgroundVideo.hide();
    backgroundVideo.size(700, 600);
    backgroundVideo.position(0,0);
    */
    textAlign(CENTER);
    fill(255)
    text("Best Score : " + getCookie("score") , width/2, height/6);
    text("Press Enter to go back to the main menu",width/2, height/5)
  }
}
class GameLevel1Scene {
  constructor(){
    this.backToMenuButton = new BackToMenuButton();
  }
  init(){
    this.backToMenuButton.display();
    ball.display();
    ball.checkCollision();
    score = score +1;
    
  }
  getRandomX(){
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item

  }
  
  score(){
    textSize(20);
    fill(255);
    textAlign(RIGHT);
    text("Score: " + score, 650, window.height - 120);
  }
  backToMenu(){
    textSize()
  }
  display(){
    
    this.init();
    this.score()
    for (let i = 0; i < blocks.length; i++){
      blocks[i].display();
      if ((blocks[blocks.length - 1].block.position.x < 700)) {
        blocks.push(new Block(800, 0, "red"));
        blocks.push(new Block(800,500, "grey"))
      } 
      // deletes blocks when they are not visible anymore for less ressources consumption 
      if ((blocks[i].block.position.x < -800)){
        blocks.shift();
        
      }    
    }
    for (let i = 0; i < spikes.length; i++) {  

      if (spikes[spikes.length-1].spike.position.x < nextValue){
        
        spikes.push(new Spike(800, 150));
        spikes.push(new Spike(1000,450))
        nextValue = this.getRandomX(arr);
        
      }
      if (spikes[i].spike.position.y > 250){
        spikes[i].displaydown();
      }else{
        spikes[i].displayup();
      }
      // deletes spikes when they are not visible anymore for less ressources consumption
      if ((spikes[i].spike.position.x < -800)){
        spikes.shift();
        
      }   
      
    }

  }
}
class GameLevel2Scene {
  constructor(){
    this.backToMenuButton = new BackToMenuButton();
  }
  init(){
    this.backToMenuButton.display();
    ball.display();
    ball.checkCollision();
    score = score +1;
  }
  getRandomX(){
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item

  }
  
  score(){
    textSize(20);
    fill(255);
    textAlign(RIGHT);
    text("Score: " + score, 650, window.height - 120);

  }
  display(){
    this.init();
    this.score()
    for (let i = 0; i < blocks.length; i++){
      blocks[i].display();
      if ((blocks[blocks.length - 1].block.position.x < 700)) {
        blocks.push(new Block(800, 0, "red"));
        blocks.push(new Block(800,500, "grey"))
      } 
      // deletes blocks when they are not visible anymore for less ressources consumption 
      if ((blocks[i].block.position.x < -800)){
        blocks.shift();
        
      }    
    }
    for (let i = 0; i < spikes.length; i++) {  

      if (spikes[spikes.length-1].spike.position.x < nextValue){
        
        spikes.push(new Spike(800, 150));
        spikes.push(new Spike(1000,450));
        spikes.push(new Spike(900, 450));
        spikes.push(new Spike(900, 350));
        nextValue = this.getRandomX(arr);
       
      }
      if (spikes[i].spike.position.y > 250){
        spikes[i].displaydown();
      }else{
        spikes[i].displayup();
      }
      // deletes spikes when they are not visible anymore for less ressources consumption
      if ((spikes[i].spike.position.x < -800)){
        spikes.shift();
        
      }   
      
    }

  }
}

class Ball{
  constructor(x,y){
    this.ball = createSprite(x,y,30,30)
    this.ball.shapeColor = "red"
    this.jumpSpeed = -2;
    this.isJumping = false;
    this.initialY = y;

    //this.ball.setVelocity(0.2,0)
  }
  display(){
    fill(255,0,0)
    ellipse(this.ball.position.x, this.ball.position.y, 
      this.ball.width, this.ball.height);
    
  }

  bounce() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.ball.velocity.y = this.jumpSpeed;
      setTimeout(() => {
        this.resetJump();
      }, 500);
    }
  }
  resetJump() {
    this.isJumping = false;
    this.ball.velocity.y = 2;
  
  }




  moveRight() {
    this.ball.velocity.x += 2;
    setTimeout(() => {
      this.ball.velocity.x = 0;
    }, 500);
  }
  moveLeft(){
    this.ball.velocity.x -= 2;
    setTimeout(() => {
      this.ball.velocity.x = 0;
    }, 500);
  }
 
  checkCollision(){
    for (let i = 0; i < blocks.length; i++){
      if (ball.ball.overlap(blocks[i].block)){
        // j = 100 + 14 to take into account the height of the block and the radius of the ball -1 so the ball is initially not on the same pixel as the cube.
        for (let j = 114; j < window.height; j += 100){
          if (ball.ball.position.y == window.height - j) {
              
              this.bounce();
          } else if (ball.ball.position.y < window.height -j + 5){
            // if the ball touches a block on it's side, it takes the block speed, which means the ball no longer go forward
            ball.ball.position.x += blocks[i].block.velocity.x*2;
          }             
        }
      }
    }
    if (ball.ball.position.x < - 15){
      resetPlayground();
    }
    for (let i = 0; i < spikes.length; i++){
      if (ball.ball.overlap(spikes[i].spike)){
        resetPlayground();
      }
    }
  }
  
}

class Block{
  constructor(x,y, color){
    this.block = createSprite(x,y+50,100,100)
    this.block.velocity= createVector(-1,0);
    this.color = color;
    
  }
  display(){
    
    this.block.position.x += this.block.velocity.x;
    drawSprite(this.block)
    fill(this.color)
    rect(this.block.position.x - this.block.width/2, this.block.position.y - this.block.height/2,
     this.block.width, this.block.height);
    
    
  }
}
class Spike {
  constructor(x, y) {
    this.r = 50;
    this.spike = createSprite(x,y,100,100)
    this.spike.shapeColor = "grey";
    this.spike.velocity = createVector(-1,0);
  }
  // Function to display the spike
  displaydown() {
    this.spike.position.x += this.spike.velocity.x;

    //triangle(this.spike.position.x, this.spike.position.y, this.spike.position.x - this.r, this.spike.position.y  + this.r, this.spike.position.x + this.r, this.spike.position.y + this.r);
    triangle(this.spike.position.x, this.spike.position.y - 50, this.spike.position.x - this.r, this.spike.position.y  + this.r, this.spike.position.x + this.r, this.spike.position.y + this.r);
  }
  
  displayup(){
    this.spike.position.x += this.spike.velocity.x;
    triangle(this.spike.position.x, this.spike.position.y + 50, this.spike.position.x + this.r, this.spike.position.y - this.r, this.spike.position.x - this.r, this.spike.position.y - this.r);
  }
}
function keyPressed() {
  if (keyIsDown(UP_ARROW)) {
    ball.bounce();
    bounceSound.play();
  }
  if (keyIsDown(RIGHT_ARROW)){
    ball.moveRight();
  }
  if (keyIsDown(LEFT_ARROW)){
    ball.moveLeft();
  }
}

function resetPlayground(){
  gameOverSound.play();
  if (score >= getCookie("score")){
    setCookie("score", score);
  }
  
  count = 0;
  blocks = [];
  spikes = [];
  score = 0;
}

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}


