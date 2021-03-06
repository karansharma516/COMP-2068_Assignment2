﻿﻿/**
* Name - Karan Sharma
* Last Modified Date- February 19, 2015
* Description - this class runs the functionality of slot machine. In this player
* has to select how much they want to bet. Once player select the bet amount and 
* click the spin button then it shows the result of that spin by showing the images 
* in the reels and displaying the win or loss amount. There is a reset button which 
* reset the slot mchine to the default stage and a close button ends the game by
* closing the tab.
* 
* Revisiion History:
* 
* Version #1.0 – February 18, 2015
* Feature: Start working on the game designing and initialise with the given template.
* 
* Version #1.1 – February 19, 2015
* Feature: Created and added the background image of the project which is the image of slot machine.
*	       Get the coordinates of all the elements to be placed in slot machine.  
*
* Version #1.2 – February 19, 2015
* Feature: Updated image folder by adding all the other images that requires for the slot machine.
*
*  Version #1.3 – February 19, 2015
* Feature:
* Updated game file by adding event listeners. 
* Added button to the canvas and set the background of slot machine according to them.
* Added hover effects of the buttons.
* 
* Version #1.4 – February 20, 2015
* Feature: 
* Added all the other functions in the game which displays the images in the slot machine reels.
* Added the text labels to the background image.
* Displays the text in the labels of player outputs.
* 
* Version #1.5 – February 20, 2015
* Feature: 
* Added sound effects to the slot machine for every buttons and spin and winning.
* Did some changes in the CSS file.
* 
* Version #1.6 – February 20, 2015
* Feature: 
* Added exit button functionality and made it working. 
* When the player click the exit button and it will asks for the game to exit and close the tab.
* Almost finish the internal documentation. 
* 
* Version #1.7 – February 20, 2015
* Feature: 
* Added jackpot win sound effect to the slot machine.
* Did some changes in the CSS file.
* 
* Version #1.8 – February 20, 2015
* Feature: 
* Updated the background image with the text labels.
* finish the project with the complete in internal documentation.
*/

// Stage Objects
var canvas; // Reference to the HTML 5 Canvas element
var stage: createjs.Stage; // Reference to the Stage

// GAME OBJECTS
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
var soundID = "CashOut";
var buttonClick = "click";
var error = "Error";
var buttonHover = "Hover";
var jackpotSound = "jackPot";

createjs.Sound.registerSound("assets/audio/cashout.mp3", soundID);
createjs.Sound.registerSound("assets/audio/buttonClick.mp3", buttonClick);
createjs.Sound.registerSound("assets/audio/error.wav", error);
createjs.Sound.registerSound("assets/audio/hover.ogg", buttonHover);
createjs.Sound.registerSound("assets/audio/jackpot.mp3", jackpotSound);

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
/*
 * This function initiates the game by setting the stage and call the main() method
 */
function init() {
    
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
}//function init ends

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

// hovering over the buttons
function spinButtonOver() {
    createjs.Sound.play(buttonHover);
    spinButton.alpha = 0.7;
}

function powerButtonOver() {
    createjs.Sound.play(buttonHover);
    powerButton.alpha = 0.7;
}

function betOneButtonOver() {
    createjs.Sound.play(buttonHover);
    betOneButton.alpha = 0.7;
}

function betMaxButtonOver() {
    createjs.Sound.play(buttonHover);
    betMaxButton.alpha = 0.7;
}

function betTenButtonOver() {
    createjs.Sound.play(buttonHover);
    betTenButton.alpha = 0.7;
}

function resetButtonOver() {
    createjs.Sound.play(buttonHover);
    resetButton.alpha = 0.7;
}


/*
 * This function iniatiates the game container and call th createUI() method 
 */
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
     } // main function ends 

/**
 * This function set the layout of the images and text objects in their respective positions
 */
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
    powerButton.addEventListener("click", closeWindow );
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

    // instantiate the player credits
    playerCreditsText = new createjs.Text("" + playerMoney, "20px Arial", "#ff7700");
    playerCreditsText.x = 102;
    playerCreditsText.y = 352;
    game.addChild(playerCreditsText);

    // instantiate the bet amount
    betText = new createjs.Text(playerBet.toString() , "20px Arial", "#ff7700");
    betText.x = 223;
    betText.y = 352;
    game.addChild(betText);

    // instantiate the winning amount
    winningsText = new createjs.Text(winnings.toString() , "20px Arial", "#ff7700");
    winningsText.x = 308;
    winningsText.y = 352;
    game.addChild(winningsText);

    // instantiate the jackpot
    jackpotText = new createjs.Text( jackpot.toString() , "20px Arial", "#ff7700");
    jackpotText.x = 235;
    jackpotText.y = 133;
    game.addChild(jackpotText);
} // function createUI ends

/*
 * This function spins the slot machine
 */
function spinReels() {
    createjs.Sound.play(buttonClick); // calls buttonClick soun here
    // This if statement checks that if playerBet is not equal to 0 then check other conditions
    if (playerBet != 0) {
    // it shows the message to the user to play again when user ran out of money
        if (playerMoney == 0) {
            createjs.Sound.play(error);
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        }
        // if player bet is greater than player credits then show the error message
        else if (playerBet > playerMoney) {
            createjs.Sound.play(error);
            alert("You don't have enough Money to place that bet.");
        }
     // if player bet is less than player money then game starts 
        else if (playerBet <= playerMoney) {
            // Add Spin Reels code here
            spinResult = Reels();
            fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
            console.log(fruits);
        // get the images of what was spin
            for (var tile = 0; tile < 3; tile++) {
                tileContainers[tile].removeAllChildren(); // clear the tile containers
                tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".png");
                tiles[tile].x = 110 + (113 * tile);
                tiles[tile].y = 239;
                tileContainers[tile].addChild(tiles[tile]);
            } // for ends
            determineWinnings(); // check if player lost or won
            showPlayerStats();   // dispaly the result of the spin
        }
    }
    else {
        createjs.Sound.play(error);
        alert("Please enter a bet amount first");
    }
}

// this method displays the bet amount of $1 when user clicks the betMin button
function betOne() {
    createjs.Sound.play(buttonClick);
    playerBet = 1;
    betText.text = playerBet.toString();
} //function bet1 ends 

// this method displays the bet amount of $100 when user clicks the betMax button
function betMax() {
    createjs.Sound.play(buttonClick);
    playerBet = 100;
    betText.text = playerBet.toString();

} //function bet100 ends 

/*
 * this function displays the bet amount of $10 when user clicks the bet10 button
 */
function betTen() {
    createjs.Sound.play(buttonClick);
    playerBet = 10;
    betText.text = playerBet.toString();

} //function bet1 ends 

/*
 * This function ends the by closing it
 */
function closeWindow() {
    createjs.Sound.play(buttonClick);
    createjs.Sound.play(error);
    var x = confirm('Are You sure want to exit:');
    if (x) window.close();
}

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
  //  jackpotText.text = "Jackpot: " + jackpot; 
    playerCreditsText.text = playerMoney.toString();
} 

/* Check to see if the player won the jackpot */
function checkJackPot() {
    createjs.Sound.play(jackpotSound);
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
        jackpotText.text = jackpot.toString();
        
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    winningsText.text = winnings.toString();
    resetFruitTally();
    checkJackPot();
    createjs.Sound.play(soundID);
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    winningsText.text = "0";
    resetFruitTally();
    // playerCreditsText.text = "" + playerMoney;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}


/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bar = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    createjs.Sound.play(buttonClick);
    for (var i = 0; i < 3; i++) {
        tileContainers[i].removeAllChildren();
    }
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    betText.text = playerBet.toString();
    playerCreditsText.text = playerMoney.toString();
    winningsText.text = winnings.toString();

} 

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bar";
                bar++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}


/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bar == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bar == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else {
            winnings = playerBet * 1;
        }

        if (sevens == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}