// Declare a variable to hold the background image
let bg;
// This function initializes the game
function init() {
	// Create a new stage for the game on the canvas
	const stage = new createjs.Stage(canvas);
	// Set the framerate for the game to 60 frames per second
	createjs.Ticker.framerate = 60;
	// Enable touch interactions if they are supported by the current device
	if (createjs.Touch.isSupported())
		createjs.Touch.enable(stage);
	// Enable mouse over interactions with a frequency of 10 updates per second
	stage.enableMouseOver(10);
	// Create a new text object to display the framerate
	const fpsText = new createjs.Text("", "15px Helvetica", "black");
	fpsText.x = 10;
	fpsText.y = 10;
	// Load the background image
	bg = new createjs.Bitmap(spriteLoader.getSprite("bg_game"));
	// Resize the background image
	resizeBg();
	// Add the background image and the framerate text to the stage
	stage.addChild(bg);
	stage.addChild(fpsText);
	// Add a tick event listener to the Ticker
	createjs.Ticker.addEventListener("tick", () => {
		try {
			// Update the framerate text and redraw the stage
			fpsText.text = createjs.Ticker.getMeasuredFPS();
			stage.update();
		} catch (e) {
			// Log any errors to the console
			console.log(e);
		}
	});
	// Create a new Menu object
	const menu = new Menu(stage);
	// Create the menu
	menu.createMenu();
}