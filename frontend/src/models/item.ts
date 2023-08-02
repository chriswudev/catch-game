import Player from "./player";

class Item {
  player: Player;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  itemNumber: number;
  itemScore: number;
  itemWidth: number;
  itemHeight: number;
  itemImage: HTMLImageElement;
  itemSpeed: number;
  x: number;
  y: number;

  constructor(canvas: HTMLCanvasElement, player: Player) {
    this.player = player;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.itemNumber = Math.floor(Math.random() * 6);
    this.itemScore = 0;
    this.itemWidth = 100;
    this.itemHeight = 100;
    this.itemImage = new Image(this.itemWidth, this.itemHeight);
    this.itemSpeed = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (canvas.width - this.itemWidth);
    this.y = Math.random() * -canvas.height - this.itemHeight;
  }

  chooseItem = () => {
    if (this.itemNumber === 0) {
      this.itemScore = 50;
      this.itemImage.src = "assets/imgs/p1.png";
    } else if (this.itemNumber === 1) {
      this.itemScore = 50;
      this.itemImage.src = "assets/imgs/p2.png";
    } else if (this.itemNumber === 2) {
      this.itemScore = 50;
      this.itemImage.src = "assets/imgs/p3.png";
    } else if (this.itemNumber === 3) {
      this.itemScore = 50;
      this.itemImage.src = "assets/imgs/p4.png";
    } else if (this.itemNumber === 4) {
      this.itemScore = -100;
      this.itemImage.src = "assets/imgs/e1.png";
    } else if (this.itemNumber === 5) {
      this.itemScore = -100;
      this.itemImage.src = "assets/imgs/e2.png";
    }
  };

  fall = () => {
    if (this.y < this.canvas.height - this.itemHeight) {
      this.y += this.itemSpeed;
    } else {
      this.player.itemsMissed += 1;
      this.changeState();
      this.chooseItem();
    }
    this.checkIfCaught();
  };

  checkIfCaught = () => {
    if (this.y >= this.player.y) {
      if (
        (this.x > this.player.x &&
          this.x < this.player.x + this.player.playerWidth) ||
        (this.x + this.itemWidth > this.player.x &&
          this.x + this.itemWidth < this.player.x + this.player.playerWidth)
      ) {
        this.player.score += this.itemScore;
        this.player.itemsCollected += 1;

        this.changeState();
        this.chooseItem();
      }
    }
  };

  changeState = () => {
    this.itemNumber = Math.floor(Math.random() * 5);
    this.itemSpeed = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (this.canvas.width - this.itemWidth);
    this.y = Math.random() * -this.canvas.height - this.itemHeight;
  };

  render = () => {
    this.context?.drawImage(
      this.itemImage,
      this.x,
      this.y,
      this.itemWidth,
      this.itemHeight
    );
  };
}

export default Item;
