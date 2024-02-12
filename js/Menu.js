class Menu {
  constructor(parentContainer) {
    this.parentContainer = parentContainer;
    this.buttonLabels = ["Task 1", "Task 2", "Task 3"];
    this.tasks = [new Task1(), new Task2(), new Task3()];
    this.open = false;
    this.initMenu();
  }

  // Toggle the menu open or closed
  onBurgerMouseDown() {
    //requestFullScreen();
    this.moveButtons();
    this.open = !this.open;
    createjs.Tween.get(this.menuBtn).to({ scale: 0.3 }, 100).to({ scale: 0.2 }, 100);
  }

  // Move the buttons depending on whether the menu is open or closed
  moveButtons() {
    this.buttons.forEach((button, i) => {
      const props = this.open ? { x: - button.getBounds().width * 2 } : { x: canvas.width / 4 * (i + 1) };
      createjs.Tween.get(button).wait(i * 50).to(props, 100, createjs.Ease.backOut);
    });
  }

  // Create a button using bitmap
  createBitmapButton(bitmapName, x, y) {
    const btn = createSprite(bitmapName, x, y, this.parentContainer, 0.2, true, 0.5, 0.5);
    btn.hitArea = new createjs.Shape();
    btn.hitArea.graphics.beginFill("#000").drawRect(0, 0, btn.getBounds().width, btn.getBounds().height);
    return btn;
  }

  // Initialize the menu
  initMenu() {
    this.menuBtn = this.createBitmapButton("menu_btn", 70, 70);
    this.fullScreenBtn = this.createBitmapButton("fullscreen_btn", 70, 140);
    this.menuBtn.on("mousedown", this.onBurgerMouseDown.bind(this));
    this.fullScreenBtn.on("mousedown", () => {
      requestFullScreen();
      //to fix
      setTimeout(() => {
        resizeBg();
      }, 100);
    });
    //this.fullScreenBtn.on("mouseup", resizeBg);
    this.createMenu();
  }

  // Create the buttons for the menu
  createButtons() {
    this.buttons = this.buttonLabels.map((label, i) => {
      const btnContainer = new createjs.Container();
      const button = new createjs.Shape();
      button.graphics.beginFill("rgba(255,0,0,.01)").beginStroke("black").drawRoundRect(0, 0, 100, 50, 10);
      btnContainer.addChild(button);
      const buttonText = new createjs.Text(label, "20px Helvetica", "black");
      buttonText.textAlign = "center";
      buttonText.textBaseline = "middle";
      buttonText.x = button.graphics.command.w / 2;
      buttonText.y = button.graphics.command.h / 2;
      btnContainer.addChild(buttonText);
      btnContainer.x = -110;
      btnContainer.y = 45;
      this.parentContainer.addChild(btnContainer);
      return btnContainer;
    });
  }

  // Handle the mousedown event
  handleMouseDown(index) {
    if (this.activeContainer) this.parentContainer.removeChild(this.activeContainer);
    this.tasks.forEach(task => task.destroy());
    this.activeContainer = new createjs.Container();
    this.parentContainer.addChild(this.activeContainer);
    this.tasks[index].init(this.activeContainer);
  }

  // Add events to the buttons
  addEvents() {
    this.buttons.forEach((button, index) => {
      button.on("mousedown", () => this.handleMouseDown(index));
      button.on("mouseover", () => {
        button.scaleX = 1.1;
        button.scaleY = 1.1;
      });
      button.on("mouseout", () => {
        button.scaleX = 1;
        button.scaleY = 1;
      });
    });
  }

  // Create the menu
  createMenu() {
    this.createButtons();
    this.addEvents();
  }
}