
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
//var ground1, ground2, ground3;
var hero, bg
var heroImage
var ground
var platform
var gameState = "start"
var button
var coin
var score = 0

function preload()
{
	bgImage = loadImage("images/sunnyforest.jpg");
	heroImage = loadImage("images/stickman.png")
	heroJumpingImage = loadImage("images/stickmanjumping-removebg-preview.png")
	heroRunningImage = loadImage("images/stickmanrunning-removebg-preview.png")
	brickImage = loadImage("images/brownbrickwall.jpg")
	redBrickImage = loadImage("images/redbrickwall.jpg")
	colorBrickImage = loadImage("images/multicolorbrickwall.jpg")
	heroRunningLeftImage = loadImage("images/leftrunningstickman-removebg-preview.png")
	finishLineImage = loadImage("images/finishline.jpg")
	coinImage = loadImage("images/goldCoin.png")
}

function setup() {
	createCanvas(800, 600);
	
	bg = createSprite(0,300,1000,600)
	bg.addImage("forest",bgImage)
	bg.velocityX = -4
	bg.scale = 2

	bricksGroup = new Group()
	
	hero = createSprite(50,520,20,20)
	hero.addImage("hero",heroImage)
	hero.addImage("heroJumping",heroJumpingImage)
	hero.addImage("heroRunning",heroRunningImage)
	hero.addImage("heroRunningLeft",heroRunningLeftImage)
	hero.scale = 0.35
	hero.debug = true;
	hero.setCollider("rectangle", 0, 0 , 60, 460)
	
	ground = createSprite(20,590,300,20)
	ground.visible = false


	// coin = createSprite(platform.position.x,platform.position.y-10,90,20)
	// coin.velocityX = -5
	// coin.debug = true
	// coin.addImage(coinImage)
	// coin.scale = 0.09

	tutorialTitle = new Tutorial(400,300)
	
}


function draw() {
  background(bgImage);
  
  fill ("red")
  text("Score: " + score,740,20)
 // background(0);
 
 if(gameState === "start"){
  tutorialTitle.display();
 }
 else if(gameState === "play"){
	fill ("red")
	text("Score: " + score,740,20)
	if(keyDown('space')){
	  hero.velocityY = -10
	  hero.changeImage("heroJumping")
	}
	else{
	  hero.velocityY = hero.velocityY + 1
	  hero.changeImage("hero")
	}
	hero.collide(ground) 
	if(bg.x<200){
	  bg.x = bg.width/2
	}
	if(keyDown(RIGHT_ARROW)){
		hero.velocityX = 10
		hero.changeImage("heroRunning")
	}
	else if(keyDown(LEFT_ARROW)){
		hero.velocityX = -10
		hero.changeImage("heroRunningLeft")
	}
	else{
		hero.velocityX = 0
		hero.changeImage(heroImage)
	}
	fill ("red")
  	text("Score: " + score,740,20)
	spawnPlatform();
	hero.collide(bricksGroup)
	drawSprites();
	
	if(hero.position.y>600 || hero.position.y<0 || hero.position.x<0){
		gameState = "end"
	}
 }
 else if (gameState == "end"){
	bg.destroy()
	swal ({
		title:"GAME OVER",
		imageUrl:"https://i.pinimg.com/originals/f9/59/5c/f9595cfe41f1b81ef95376ddbbd2c35e.gif",
		imageSize: "200x200",
		text:"You Died. Would you like to play again?", 
		confirmButtonText:"PLAY"
		
	},
	function (isConfirm){
      if(isConfirm){
		window.location.reload()
	  }
	}
	)

 }
 
}

function spawnPlatform(){
	if(frameCount % 60 === 0){
		var platform = createSprite(800,random(300,600),random(100,200),random(20,40))
		platform.velocityX = -5
		//hero.collide(platform)
		coin = createSprite(platform.position.x,platform.position.y-90,90,20)
		coin.velocityX = -5
		coin.debug = true
		coin.addImage(coinImage)
		coin.scale = 0.09
		platform.debug = true;
		var randomImages = Math.round(random(1,3))

		switch(randomImages){
         case 1:platform.addImage(brickImage);
		 platform.scale = 0.5
		 break
		 case 2:
			platform.addImage(redBrickImage)
			platform.scale = 0.45 
			break
		 case 3:platform.addImage(colorBrickImage)
			platform.scale = 0.55
		 	break
		}
		bricksGroup.add(platform);
		//bricksGroup.add(coin)
		// if(coin.isTouching(hero)){
		// 	score += 5
		// 	coin.destroy()
		// }
		
	}
}

