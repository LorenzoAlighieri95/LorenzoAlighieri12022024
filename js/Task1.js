// Define constants for the number of cards, positions of the decks, card offset, and animation duration
const N_CARDS = 144;
const DECK1_POS = { x: 144, y: 400 };
const DECK2_POS = { x: 600, y: DECK1_POS.y };
const CARD_OFFSET = 1.2;
const ANIM_DURATION = 2000;
const SOUND_PATH = "sounds/cardplace.mp3";
const WAITING_TIME = 1000;
class Task1 {

	constructor() {
		this.parentContainer;
		this.cards;
	}

	// Method to initialize the cards
	init(parentContainer) {
		this.parentContainer = parentContainer; // Store the parent container
		this.cards = [];
		for (let i = 1; i <= N_CARDS; i++) {
			this.createCard(i); // Create each card
		}
		for (let i = this.cards.length - 1; i >= 0; i--) {
			this.animateCard(N_CARDS - i, this.cards[i]); // Animate each card
		}
	}

	// Method to create a card
	createCard(i) {
		const index = i % N_CARDS_SPRITE
		const cardOffset = i * CARD_OFFSET; // Calculate the offset for the card
		// Create a new sprite for the card and add it to the parent container
		const card = createSprite(`card_${index}`, DECK1_POS.x + cardOffset, DECK2_POS.y, this.parentContainer, 0.5, true, 0.5, 0.5);
		this.cards.push(card); // Add the card to the cards array
	}

	// Method to animate a card
	animateCard(i, card) {
		const cardOffset = i * CARD_OFFSET; // Calculate the offset for the card
		// Create a tween for the card
		createjs.Tween.get(card)
			.wait(WAITING_TIME * i) // Wait for a certain amount of time based on the card's index
			.call(() => {
				// Once the wait is over, bring the card to the front of the display list
				this.parentContainer.setChildIndex(card, this.parentContainer.children.length - 1);
				// Card movement sound
				let sound = new Howl({
					src: [SOUND_PATH]
				});
				sound.play();		
			})
			.to({ x: DECK2_POS.x + cardOffset }, ANIM_DURATION / 2, createjs.Ease.backOut) // Animate the card to the second deck with a back out ease
	}

	destroy() {
		if (this.parentContainer) {
			this.parentContainer.removeAllChildren();
			this.cards.forEach(el => createjs.Tween.removeTweens(el));
		}
	}
}

//TO DO: CARD TOO BIG ON PORTRAIT FULLSCREEN