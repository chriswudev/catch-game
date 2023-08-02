import Item from "./item";
import Player from "./player";

class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasBack: HTMLCanvasElement;
  contextBack: CanvasRenderingContext2D;
  player: Player;
  items: Item[];
  timer: number | null;
  numberOfItems: number;
  background: HTMLImageElement;
  highscore: number;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvasBack = document.getElementById(
      "backgroundCanvas"
    ) as HTMLCanvasElement;
    this.contextBack = this.canvasBack.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.player = new Player(this.canvas);
    this.items = [];
    this.timer = null;
    this.numberOfItems = 5;
    this.background = new Image();
    this.background.src = "assets/imgs/bg2.png";
    this.highscore = 0;
  }

  main = () => {
    this.contextBack.font = "23px 'Rubber Duck'";
    this.contextBack.fillStyle = "WHITE";
    this.player = new Player(this.canvas);
    this.items = [];

    for (var i = 0; i < this.numberOfItems; i++) {
      const item = new Item(this.canvas, this.player);
      item.chooseItem();
      this.items.push(item);
    }

    this.startGame();
  };

  startGame = () => {
    this.updateGame();
    window.requestAnimationFrame(this.drawGame);
  };

  updateGame = () => {
    for (var j = 0; j < this.items.length; j++) {
      this.items[j].fall();
    }
    this.timer = window.setTimeout(this.updateGame, 30);
  };

  drawGame = () => {
    if (this.player.gameOver === false) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.contextBack.clearRect(
        0,
        0,
        this.canvasBack.width,
        this.canvasBack.height
      );

      this.contextBack.drawImage(this.background, 0, 0);
      this.player.render();

      for (var j = 0; j < this.items.length; j++) {
        this.items[j].render();
      }
      this.contextBack.fillText("SCORE: " + this.player.score, 50, 50);
      this.contextBack.fillText("HI SCORE: " + this.highscore, 250, 50);
      this.contextBack.fillText(
        "ITEM CAUGHT: " + this.player.itemsCollected,
        500,
        50
      );
      this.contextBack.fillText(
        "ITEM MISSED: " + this.player.itemsMissed,
        780,
        50
      );
    } else {
      for (var i = 0; i < this.numberOfItems; i++) {
        this.items.pop();
      }

      if (this.highscore < this.player.score) {
        this.highscore = this.player.score;
        this.contextBack.fillText(
          "NEW HI SCORE: " + this.highscore,
          this.canvas.width / 2 - 100,
          this.canvas.height / 2
        );
      }
      this.contextBack.fillText(
        "PRESS ENTER TO RESTART",
        this.canvas.width / 2 - 140,
        this.canvas.height / 2 + 50
      );
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    window.requestAnimationFrame(this.drawGame);
  };
}

export default Game;
