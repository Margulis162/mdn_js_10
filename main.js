// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
// original code 
// function randomRGB() {
//   return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
// }
const nonRandColors =[255, 127, 85, 51, 32, 20 ];
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape{
  constructor(x, y, velX, velY){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY; 
  }
}



class Ball extends  Shape{
  constructor(x, y, velX, velY, color, size){
    super( x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
  }
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(){
    for (const ball of balls){
      // makes sure we are checking for a different ball 
      if(!(this === ball) && ball.exists) {
        // standart collision detection method for two circles 
        const dx = this.x -ball.x;
        const dy = this.y -ball.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < this.size + ball.size){
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
  
}

class EvilCircle extends Shape {
  constructor(x,y){
    super(x, y, 20, 20);
    this.color = `rgb(${255},${255},${255})`;
    this.size = 10;
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }});
  }

    draw(){
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
      ctx.stroke();
    }

    checkBounds() {
      if ((this.x + this.size) >= width) {
        this.x =+ 3;
      }
    
      if ((this.x - this.size) <= 0) {
        this.x =+ 3;
      }
    
      if ((this.y + this.size) >= height) {
        this.y =+ 3;
      }
    
      if ((this.y - this.size) <= 0) {
        this.y =+ 3;
      }
    
      // this.x += this.velX;
      // this.y += this.velY;
    }
  }







const balls =[];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width -size),
    random(0 + size, height -size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
    );
    
    balls.push(ball);

}

function loop() {
  ctx.fillStyle = "rgba(0,0,0, .1)";
  ctx.fillRect(0,0, width, height);

  for (const ball of balls){
    ball.draw();
    ball.update();
    ball.collisionDetect();
    }
  requestAnimationFrame(loop);
}

loop();

