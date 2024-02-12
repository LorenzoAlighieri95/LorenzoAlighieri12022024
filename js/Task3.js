class Task3 {
  // Constructor initializes the properties of the class
	constructor() {
		this.parentContainer; // Container for the fire and particles
    this.fire; // Fire sprite
    this.particles; // Array to hold the particles
	}

  // Initializes the fire and particles
  init(parentContainer) {
    this.particles = []; // Resetting the particles array
		this.parentContainer = parentContainer; // Setting the parent container
    const data = {
      "images": [
        spriteLoader.getSprite("fire")
      ],
      "frames": [
        [1, 1, 140, 254, 0, 78, 126],
        [143, 1, 129, 256, 0, 66, 128],
        [274, 1, 133, 256, 0, 69, 128],
        [409, 1, 134, 256, 0, 70, 128],
        [545, 1, 135, 256, 0, 71, 128],
        [682, 1, 135, 256, 0, 72, 128],
        [819, 1, 140, 256, 0, 75, 128],
        [961, 1, 142, 256, 0, 76, 128],
        [1105, 1, 148, 256, 0, 78, 128],
        [1255, 1, 150, 256, 0, 79, 128],
        [1407, 1, 153, 256, 0, 80, 128],
        [1562, 1, 153, 246, 0, 80, 118],
        [1717, 1, 154, 255, 0, 80, 128],
        [1, 259, 154, 253, 0, 80, 128],
        [157, 259, 149, 247, 0, 76, 125],
        [308, 259, 152, 249, 0, 77, 128],
        [462, 259, 155, 250, 0, 79, 123],
        [619, 259, 156, 256, 0, 79, 128],
        [777, 259, 150, 256, 0, 80, 128],
        [929, 259, 149, 256, 0, 80, 128],
        [1080, 259, 144, 255, 0, 74, 128],
        [1226, 259, 145, 254, 0, 75, 128],
        [1373, 259, 148, 237, 0, 76, 112],
        [1523, 259, 149, 216, 0, 76, 91],
        [1674, 259, 150, 230, 0, 76, 102],
        [1, 517, 150, 236, 0, 76, 108],
        [153, 517, 140, 247, 0, 67, 120],
        [295, 517, 139, 254, 0, 68, 126],
        [436, 517, 136, 256, 0, 69, 128],
        [574, 517, 139, 255, 0, 70, 128],
        [715, 517, 143, 240, 0, 71, 116],
        [860, 517, 143, 243, 0, 71, 122],
        [1005, 517, 142, 248, 0, 71, 128],
        [1149, 517, 138, 249, 0, 71, 128],
        [1289, 517, 136, 244, 0, 72, 125],
        [1427, 517, 139, 248, 0, 74, 128],
        [1568, 517, 142, 245, 0, 78, 126],
        [1712, 517, 143, 244, 0, 79, 125],
        [1, 775, 147, 250, 0, 82, 127],
        [150, 775, 149, 255, 0, 83, 128],
        [301, 775, 151, 256, 0, 84, 128],
        [454, 775, 151, 256, 0, 84, 128],
        [607, 775, 151, 254, 0, 84, 126],
        [760, 775, 143, 235, 0, 76, 107],
        [905, 775, 144, 233, 0, 76, 105],
        [1051, 775, 146, 238, 0, 76, 110],
        [1199, 775, 152, 245, 0, 77, 117],
        [1353, 775, 154, 244, 0, 77, 116],
        [1509, 775, 150, 254, 0, 72, 127],
        [1661, 775, 144, 256, 0, 67, 128]
      ],
      "animations": {
        "anim": [0, 49]
      }
    };
		const spriteSheet = new createjs.SpriteSheet(data); // Creating a spritesheet for the fire
		this.fire = new createjs.Sprite(spriteSheet); // Creating a sprite for the fire
		this.fire.x = canvas.width / 2; // Positioning the fire in the middle of the canvas
    this.fire.y = canvas.height / 2;
    this.fire.scale = 2; // Scaling the fire sprite
    this.getExplosion(this.fire.x, this.fire.y + this.fire.getBounds().height / 4, 300); // Creating an explosion of particles
    this.getSmoke(this.fire.x, this.fire.y + this.fire.getBounds().height / 4, 300); // Creating smoke particles
    this.fire.play("anim"); // Playing the fire animation
		this.parentContainer.addChild(this.fire); // Adding the fire to the parent container
	}

  // Creates a particle at the given position with the given color
	createParticle(x, y, color) {
		const particle = new createjs.Shape(); // Creating a new shape for the particle
		particle.graphics.beginFill(color).drawCircle(0, 0, 8); // Drawing a circle for the particle
		particle.x = x; // Positioning the particle
		particle.y = y;
		return particle; // Returning the particle
	}

  // Creates a number of particles at the given position with the given color function and target function
  createParticles(x, y, numParticles, colorFunc, targetFunc) {
    for (let i = 0; i < numParticles; i++) {
      const color = colorFunc(i); // Getting the color for the particle
      const particle = this.createParticle(x, y, color); // Creating the particle
      this.particles.push(particle); // Adding the particle to the particles array
      this.parentContainer.addChild(particle); // Adding the particle to the parent container
      particle.scale = getRandomInRange(0.4, 1); // Scaling the particle
      const [targetX, targetY] = targetFunc(x, y); // Getting the target position for the particle
      createjs.Tween.get(particle, { loop: -1 }) // Creating a tween for the particle
        .to({ x: targetX, y: targetY, alpha: 0 }, 700 + Math.random() * 700) // Moving the particle to the target position and fading it out
    }
  }

  // Creates smoke particles at the given position
  getSmoke(x, y, numParticles) {
    const colorFunc = () => "grey"; // Color function for the smoke particles
    const targetFunc = (x, y) => [x + getRandomInRange(-100, 100), y - Math.random() * 400]; // Target function for the smoke particles
    this.createParticles(x, y, numParticles, colorFunc, targetFunc); // Creating the smoke particles
  }

  // Creates explosion particles at the given position
  getExplosion(x, y, numParticles) {
    const colorFunc = () => Math.random() < 0.5 ? "red" : "orange"; // Color function for the explosion particles
    const targetFunc = (x, y) => [x + Math.random() * 200 - 100, y - Math.random() * 200]; // Target function for the explosion particles
    this.createParticles(x, y, numParticles, colorFunc, targetFunc); // Creating the explosion particles
  }

  // Destroys the fire and particles
	destroy() {
		if (this.parentContainer) {
			this.parentContainer.removeAllChildren(); // Removing all children from the parent container
      this.particles.forEach(el => createjs.Tween.removeTweens(el)); // Removing all tweens from the particles
      this.fire.stop(); // Stopping the fire animation
		}
	}
}