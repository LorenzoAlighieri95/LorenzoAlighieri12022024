let spriteLoader;
class SpriteLoader {
  constructor() {
    this.spriteLib = {};
  }

  addSprite(name, path) {
    let sprite = new Image();
    sprite.src = path;
    this.spriteLib[name] = sprite;
  }

  getSprite(name) {
    return this.spriteLib[name];
  }

  imgsLoaded() {
    this.spriteLib.forEach()
  }
}