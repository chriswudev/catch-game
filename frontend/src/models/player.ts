class Player {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  gameOver: boolean;
  score: number;
  itemsCollected: number;
  itemsMissed: number;
  playerWidth: number;
  playerHeight: number;
  playerSpeed: number;
  x: number;
  y: number;
  playerImage: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.gameOver = false;
    this.score = 0;
    this.itemsCollected = 0;
    this.itemsMissed = 0;
    this.playerWidth = 120;
    this.playerHeight = 200;
    this.playerSpeed = 20;
    this.x = (canvas.width - this.playerWidth) / 2;
    this.y = canvas.height - this.playerHeight - 80;
    this.playerImage = new Image();
    this.playerImage.src = "assets/imgs/boat.png";
  }

  render = () => {
    this.context?.drawImage(
      this.playerImage,
      this.x,
      this.y,
      this.playerWidth,
      this.playerHeight
    );
  };

  moveLeft = () => {
    if (this.x > 0) {
      this.x -= this.playerSpeed;
    }
  };

  moveRight = () => {
    if (this.x < this.canvas.width - this.playerWidth) {
      this.x += this.playerSpeed;
    }
  };
}

export default Player;
