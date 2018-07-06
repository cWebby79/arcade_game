//****************************** ENEMY ******************************//

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// Multiply any movement by the dt parameter
	// ensures the game runs at the same speed for
	// all computers

	this.x += this.speed * dt;

	// Reset enemy position when off screen
	if (this.x > 550) {
		this.x = -80;
		// Randomise enemy speed
		this.speed = Math.floor((Math.random() * 300) + 100);
	}
	// Reset if player and enemy meet
	if (player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 50 && player.y + 50 > this.y) {
		player.x = 200;
		player.y = 400;
	}
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//****************************** PLAYER *****************************//

// Player class
const Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
	// Stop player going off canvas
	if (this.x > 400) {
		this.x = 400;
	}
	if (this.x < 100) {
		this.x = 0;
	}
	if (this.y > 400) {
		this.y = 400;
	}
	// Resets player position, with slight delay, if reaches top row
	if (this.y < 0) {
		this.y = -20;
		setTimeout(function() {
			player.x = 200;
			player.y = 400;
		}, 300);
	}
};

// Draw Player on screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move player around the screen
Player.prototype.handleInput = function(move) {
	if (move === 'up') {
		this.y -= 85;
	} else if (move === 'down') {
		this.y += 85;
	} else if (move === 'left') {
		this.x -= 100;
	} else if (move === 'right') {
		this.x += 100;
	}
};


//********************** INSTANTIATE OBJECTS ************************//

//empty array
const allEnemies = [];

// Starting y position for enemy
const enemyStart = [60, 145, 227];

// Create new enemy at starting position
enemyStart.forEach(function(startY) {
	let enemy = new Enemy(0, startY, 200);
	allEnemies.push(enemy);
});

// Player starting position
let player = new Player(200, 400);


//**************************** LISTENERS ****************************//

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