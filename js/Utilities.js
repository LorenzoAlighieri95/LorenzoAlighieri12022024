// This function creates a sprite with the given parameters
function createSprite(spriteName, x, y, container = false, scale = 1, visible = true, anchorX = 0.5, anchorY = 0.5) {
	// Create a new bitmap with the given sprite name
	const sprite = new createjs.Bitmap(spriteLoader.getSprite(spriteName));
	// Set the scale of the sprite
	sprite.scale = scale;
	// Set the registration point of the sprite
	sprite.regX = spriteLoader.getSprite(spriteName).width * anchorX;
	sprite.regY = spriteLoader.getSprite(spriteName).height * anchorY;
	// If x and y coordinates are provided, set the position of the sprite
	if (x, y) {
		sprite.x = x;
		sprite.y = y;
	}
	// Set the visibility of the sprite
	sprite.visible = visible;
	// If a container is provided, add the sprite to the container
	if (container)
		container.addChild(sprite);
	// Set the width and height of the sprite
	sprite.width = sprite.getBounds().width * scale;
	sprite.height = sprite.getBounds().height * scale;

	// Return the created sprite
	return sprite;
}

// This function returns a random number in the given range
function getRandomInRange(min, max, int = false) {
	// If int is false, return a floating-point number
	if (!int) {
		return Math.random() * (max - min) + min;
	} else {
		// If int is true, return an integer
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

// This function resizes the background image to fit the canvas
function resizeBg() {
	// Set the scale of the background image
	bg.scaleX = canvas.width / bg.image.width;
	bg.scaleY = canvas.height / bg.image.height;
	// Center the background image on the canvas
	bg.x = (canvas.width - bg.image.width * bg.scaleX) / 2;
	bg.y = (canvas.height - bg.image.height * bg.scaleY) / 2;
}

// This function requests the browser to go into full screen mode
function requestFullScreen() {
	// Try to request full screen mode using the standard method
	try {
		if (!document.fullscreenElement) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) { // Firefox
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
				document.documentElement.webkitRequestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
				document.documentElement.msRequestFullscreen();
			}
		} else {
			document.exitFullscreen();
		}
	} catch (e) {
		// Log any errors to the console
		console.log(e);
	}
}