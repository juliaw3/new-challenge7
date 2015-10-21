var canvas; //linkd to canvas in application.html.erb page
var stage; 

var bg; //background graphic

var main; //The main background
var startB; //the start button
var creditsB; //the credits button in the main menue

var credits; //The Credits screen

var player; //the player paddle 
var ball; // the ball
var cpu; //the cpu paddle
var win; // the winning screen
var lose; //the losing screen

var playerScore;
var cpuScore
var cpuSpeed=6; //the speed of the spu paddle, the faster it is the harder the game is

//vector of the ball
var xSpeed = 10; //ball speed
var ySpeed = 10; //ball speed

//runs code every fraction of a second
var tkr = new Object // ticker

//use PreloadJS method
var preloader; //contains preloader object
var manifest; //hold al ist of files that need to be loaded
var totalLoaded = 0; //hold number of files already loaded


var TitleView = new Container(); //hold several graphics within in order ot display them together

//Main function
function Main()
{
	canvas = document.getElementById('PongStage');
	stage = new Stage(canvas);

	stage.mouseEventsEnabled = true;


	//place an array of files we want to load
	manifest = [
			{src:"bg.png", id:"bg"},
			{src:"main.png", id:"main"},
			{src:"startB.png", id:"startB"},
			{src:"creditsB.png", id:"creditsB"},
			{src:"credits.png", id:"credits"},
			{src:"paddle.png", id:"cpu"},
			{src:"paddle.png", id:"player"},
			{src:"ball.png", id:"ball"},
			{src:"win.png", id:"win"},
			{src:"lose.png", id:"lose"},

	];
		//configure the preloader object
	preloader = new PreloadJS();
	preloader.onProgress = handleProgress;
	preloader.onComplete = handleComplete;
	preloader.onFileLoad = handleFileLoad;
	preloader.loadManifest(manifest);

	//use ticker to set the frame rate
	Ticker.setFPS(30);
	Ticker.addListener(stage);

}
//create the preloader function
function handleProgress(event)
{
	//use event.loaded to get the percentage of the loading
}
function handleComplete(event)
{
	//triggered when all loading is complete

}

function handleFileLoad(event) 
{

             var img = new Image();
              img.src = event.src;
              img.onload = handleLoadCompelete;
              window[event.id] = new Bitmap(img);

}

function handleLoadCompelete(event)
{
	totalLoaded++;
	if(manifest.length == totalLoaded)
	{
		addTitleView();
	}
}

function addTitleView()
{
	startB.x = 110;
	startB.y = 160;
	startB.name = 'startB';

	creditsB.x = 100;
	creditsB.y = 230;

	TitleView.addChild(main, startB, creditsB);
	stage.addChild(bg, TitleView);
	stage.update();

	//button listeners
	startB.onPress = tweenTitleView;
	creditsB.onPress = showCredits;
}

function showCredits()
{
	credits.x = 480;
	stage.addChild(credits);
	stage.update();
	Tween.get(credits).to({x:0}, 300);
	credits.onPress = hideCredits;
}

function hideCredits()
{
		Tween.get(credits).to({x:480}, 300).call(rmvCredits);
}

function rmvCredits()
{
	stage.removeChild(credits);
}

function tweenTitleView()
{
	//starts the game
	Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}

//the game code
function addGameView()
{
	//git rid of menu&&credits
	stage.removeChild(TitleView);
	TitleView = null;
	credits = null;

	//add game view
	player.x = 2;
	player.y = 160 - 37.5;
	cpu.x = 480 - 25;
	cpu.y = 160 - 37.5;
	ball.x = 240 - 15;
	ball.y = 160 - 15;

	//score
	playerScore = new Text('0', 'bold 20px Arial', '#A3FF24');
	playerScore.x = 211;
	playerScore.y = 20;

	cpuScore = new Text('0', 'bold 20px Arial', '#A3FF24');
	cpuScore.x = 262;
	cpuScore.y = 20;

	stage.addChild(playerScore, cpuScore, player, cpu, ball);
	stage.update();

	//start listener
	bg.onPress = startGame; //when the player clicks the screen it starts
}

function startGame(e)
{
	bg.onPress = null;
	stage.onMouseMove = movePaddle; //connects the mouse to the paddle
	Ticker.addListener(tkr, false);
	tkr.tick = update;
}

function movePaddle(e)
{
	player.y = e.stageY; //put paddle on mouseY cordinate
}

function reset()
{
	ball.x = 240 - 15;
	ball.y = 160 - 15;
	player.y = 160 - 37.5;
	cpu.y = 160 - 37.5;

	stage.onMouseMove = null;
	Ticker.removeListener(tkr);
	bg.onPress = startGame;
}

function alert(e)
{
	Ticker.removeListener(tkr);
	stage.onMouseMove = null;
	bg.onPress = null;

	if(e == 'win')
	{
		win.x = 0;
		win.y = -200;

		stage.addChild(win);
		Tween.get(win).to({y: 115}, 300);
	}
	else
	{
		lose.x = 0;
		lose.y = -200;

		stage.addChild(lose);
		Tween.get(lose).to({y: 115}, 300);
	}
}

//the game loop
function update()
{
	//ball movement
	ball.x += xSpeed;
	ball.y += ySpeed;

	//cpu movement
	if(cpu.y < ball.y)
	{
		cpu.y = cpu.y + 4;
	}
	else if(cpu.y > ball.y)
	{
		cpu.y = cpu.y - 4;
	}

	//wall collision
	if((ball.y) < 0){ySpeed =- ySpeed }; //up
    if((ball.y + (30)) > 320) { ySpeed = -ySpeed };//down

    //cpu score
    if((ball.x) < 0)
    {
    	xSpeed = -xSpeed;
    	cpuScore.text = parseInt(cpuScore.text + 1);
    	reset();
    }

    //player score
    if((ball.x + (30)) > 480)
    {
    	xSpeed =-xSpeed;
    	playerScore.text = parseInt(playerScore.text+1);
    	reset();
    }

    //cpu collision
    if(ball.x + 30 > cpu.x && ball.x + 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75)
    {
        xSpeed *= -1;
    }

    //player collision
    if(ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75)
    {
        xSpeed *= -1;
    }

    //paramaters for paddle
    if(player.y >= 249)
    {
    	player.y = 249;
    }

    //win
    if(playerScore.text == '10')
    {
    	alert('win');
    }

    //lose
    if(cpuScore.text == '10')
    {
    	alert('lose');
    }
}