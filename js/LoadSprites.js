const N_CARDS_SPRITE = 48;
const N_EMOTICON = 50;
function loadSprites() {
	spriteLoader = new SpriteLoader();
	spriteLoader.addSprite("bg_game", "sprites/bg_game.jpg");
	spriteLoader.addSprite("menu_btn", "sprites/menu.png");
	spriteLoader.addSprite("fullscreen_btn", "sprites/fullscreen.png");
	for (let i = 0; i < N_CARDS_SPRITE ; i++) {
		spriteLoader.addSprite("card_"+i, "sprites/deck/sprite("+i+").png");
	}
	for (let i = 1; i <= N_EMOTICON; i++) {
		spriteLoader.addSprite("emoticon_" + i, "sprites/emoticons/sprite(" + i + ").png");
	}
	spriteLoader.addSprite("fire", "sprites/fire.png");
}