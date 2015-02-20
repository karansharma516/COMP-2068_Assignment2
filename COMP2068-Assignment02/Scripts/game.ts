﻿/**
Name - Karan Sharma
Date- February 19, 2015
Description - this class runs the functionality of slot machine
*/

// GAME OBJECTS
var canvas; // Reference to the HTML 5 Canvas element
var stage: createjs.Stage; // Reference to the Stage
var game: createjs.Container; // Main Game Container Object
var tiles: createjs.Bitmap[] = [];
var tileContainers: createjs.Container[] = [];

var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var spinButton_hover: createjs.Bitmap;
var betMaxButton: createjs.Bitmap;
var betOneButton: createjs.Bitmap;
var betTenButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var powerButton: createjs.Bitmap;

var jackpotText: createjs.Text;
var winningsText: createjs.Text;
var betText: createjs.Text;
var playerCreditsText: createjs.Text;

// Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bar = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function init() {

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}


// GAMELOOP
function gameLoop() {
    stage.update();
}

// stop hovering over the buttons
function spinButtonOut() {
    spinButton.alpha = 1; // 100% Alpha 
}

function resetButtonOut() {
    resetButton.alpha = 1; // 100% Alpha 
}

function powerButtonOut() {
    powerButton.alpha = 1; // 100% Alpha 
}

function betOneButtonOut() {
    betOneButton.alpha = 1; // 100% Alpha 
}

function betMaxButtonOut() {
    betMaxButton.alpha = 1; // 100% Alpha 
}

function betTenButtonOut() {
    betTenButton.alpha = 1; // 100% Alpha 
}

function resetButtonOver() {
    resetButton.alpha = 0.7;

}

// hovering over the buttons

function spinButtonOver() {
    spinButton.alpha = 0.7;
}

function powerButtonOver() {
    powerButton.alpha = 0.7;
}

function betOneButtonOver() {
    betOneButton.alpha = 0.7;
}

function betMaxButtonOver() {
    betMaxButton.alpha = 0.7;
}

function betTenButtonOver() {
    betTenButton.alpha = 0.7;
}

// START THE GAME
 function main() {
        game = new createjs.Container(); // Instantiates the Game Container
        game.x = 23;
        game.y = 6;

        createUI();
        stage.addChild(game); // Adds the Game Container to the Stage

        for (var i = 0; i < 3; i++) {
            tileContainers[i] = new createjs.Container();
            game.addChild(tileContainers[i]);
        }  
     }


function createUI() {

    // Add the background to the game container
    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background); 

    // Spin Button
    spinButton = new createjs.Bitmap("assets/images/spin.png");
    game.addChild(spinButton);
    spinButton.x = 374;
    spinButton.y = 423;

    // Spin Button Event Listeners
    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);


    // Reset Button
    resetButton = new createjs.Bitmap("assets/images/reset.png");
    game.addChild(resetButton);
    resetButton.x = 102;
    resetButton.y = 427;

    // reset Button Event Listeners
    resetButton.addEventListener("click", resetAll);
    resetButton.addEventListener("mouseover", resetButtonOver);
    resetButton.addEventListener("mouseout", resetButtonOut);

    // Power Button
    powerButton = new createjs.Bitmap("assets/images/exitbutton.png");
    game.addChild(powerButton);
    powerButton.x = 401;
    powerButton.y = 122;

    // power Button Event Listeners
    powerButton.addEventListener("click", );
    powerButton.addEventListener("mouseover", powerButtonOver);
    powerButton.addEventListener("mouseout", powerButtonOut);

    // betMin Button
    betOneButton = new createjs.Bitmap("assets/images/betMinButton1.png");
    game.addChild(betOneButton);
    betOneButton.x = 170;
    betOneButton.y = 430;


    // betOne Button Event Listeners
    betOneButton.addEventListener("click", betOne);
    betOneButton.addEventListener("mouseover", betOneButtonOver);
    betOneButton.addEventListener("mouseout", betOneButtonOut);

    // betMax Button
    betMaxButton = new createjs.Bitmap("assets/images/betMaxButton1.png");
    game.addChild(betMaxButton);
    betMaxButton.x = 314;
    betMaxButton.y = 430;

    // betOne Button Event Listeners
    betMaxButton.addEventListener("click", betMax);
    betMaxButton.addEventListener("mouseover", betMaxButtonOver);
    betMaxButton.addEventListener("mouseout", betMaxButtonOut);

    // bet10 Button
    betTenButton = new createjs.Bitmap("assets/images/bet10.png");
    game.addChild(betTenButton);
    betTenButton.x = 241;
    betTenButton.y = 430;

    // bet10 Button Event Listeners
    betTenButton.addEventListener("click", betTen);
    betTenButton.addEventListener("mouseover", betTenButtonOver);
    betTenButton.addEventListener("mouseout", betTenButtonOut);
}