//****************************** ENEMY ******************************//

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += this.speed * dt;
    
    // Reset enemy position when off screen
    if (this.x >= 550) {
        this.x = -50;
    // Randomise enemy speed
        this.speed = 80 + Math.floor((Math.random() * 200) + 1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//****************************** PLAYER *****************************//

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player
const Player = function(x,y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 300;
};

Player.prototype.update = function() {
    // Resets player position, with slight delay, if reaches water
    if (this.y <= 0) {
        setTimeout (function() {
            player.x = 200;
            player.y = 300;
        } 1000);
    }
};

// Draw Player on screen
Player.prototype.render = function() {
    ctx.drawing(Resources.get(this.sprite), this.x, this.y);
};

// Move player around the screen
Player.prototype.handleInput = function(move) {
    if (move === 'up') {
        this.y -= 50;
    }
    if (move === 'down') {
        this.y += 50;
    }
    if (move === 'left') {
        this.x -= 50;
    }
    if (move === 'right') {
        this.x += 50;
    }
};

//********************** INSTANTIATE OBJECTS ************************//

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
