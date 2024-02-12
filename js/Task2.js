// Define constants for maximum text length, number of emoticons, font style, characters to use for random text, interval time, and offset
const MAX_TEXT_LENGTH = 5;
const FONT_STYLE = "Helvetica";
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const INTERVAL_TIME = 2000;
const OFFSET = 30;

class Task2 {
	// Constructor takes a parent container as an argument
	constructor() {
		// Generate an array of emoticons
		this.emoticons = Array.from({ length: N_EMOTICON }, (_, i) => createSprite(`emoticon_${i + 1}`, 0, 0, false, 1, true, 0.5, 1));
		// Initialize fontSize and emoticonInText
		this.fontSize;
		this.emoticonInText = [];
		this.interval;
		this.parentContainer;
		this.container;
	}

	init(parentContainer) {
		// Store the parent container
		this.parentContainer = parentContainer;
		// Create a new container and set its position
		this.container = new createjs.Container();
		this.container.x = canvas.width / 2;
		this.container.y = canvas.height / 2;
		// Add the new container to the parent container
		this.parentContainer.addChild(this.container);
		this.generateTextAndImages();
	}

	// Function to select either text or image
	selectTextOrImage() {
		// If random number is 1, generate text
		if (getRandomInRange(0, 1, true) === 1) {
			const text = this.getRandomText();
			const textObject = this.generateText(text);
			textObject.width = textObject.getBounds().width;
			return textObject;
		} else {
			// Else, generate emoticon
			const emoticon = this.getRandomEmoticon()
			emoticon.width = emoticon.image.width;
			return emoticon;
		}
	}

	// Function to generate text and images at regular intervals
	generateTextAndImages() {
		// Definisci una funzione per il codice che vuoi eseguire
		const generate = () => {
			// Remove all children from the container
			this.container.removeAllChildren();
			this.container.alpha = 0;
			// Get a random font size
			this.fontSize = this.getRandomFontSize();
			// Initialize current position and clear the array at the start of each new text block
			let currentPosition = 0;
			this.emoticonInText = [];
			// Loop to generate elements
			for (let i = 0; i < MAX_TEXT_LENGTH; i++) {
				const element = this.selectTextOrImage();
				element.x = currentPosition + element.width / 2;
				this.container.addChild(element);
				currentPosition += element.width + OFFSET;
			}
			// Set the registration point of the container
			this.container.regX = currentPosition / 2;
			createjs.Tween.get(this.container)
				.to({ alpha: 1 }, 500);
		};
		generate();
		this.interval = setInterval(generate, INTERVAL_TIME);
	}

	// Function to generate text
	generateText(text) {
		const font = this.fontSize.toString() + "px " + FONT_STYLE;
		const textObject = new createjs.Text(text, font, "white");
		textObject.regX = textObject.getBounds().width / 2;
		textObject.regY = textObject.getBounds().height;
		return textObject;
	}

	// Function to generate random text
	getRandomText() {
		let result = '';
		const charactersLength = CHARACTERS.length;
		for (let i = 0; i < MAX_TEXT_LENGTH; i++)
			result += CHARACTERS.charAt(getRandomInRange(0, charactersLength, true));
		return result;
	}

	// Function to get a random emoticon
	getRandomEmoticon() {
		let randomIndex;
		do {
			randomIndex = getRandomInRange(0, this.emoticons.length - 1, true);
		} while (this.emoticonInText.includes(randomIndex));
		this.emoticonInText.push(randomIndex);
		return this.emoticons[randomIndex];
	}

	// Function to get a random font size
	getRandomFontSize() {
		return getRandomInRange(30, 60);
	}

	destroy() {
		if (this.parentContainer) {
			this.parentContainer.removeAllChildren();
			clearInterval(this.interval);
			createjs.Tween.removeTweens(this.container);
		}
	}
}