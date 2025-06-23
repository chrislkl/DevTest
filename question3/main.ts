export class Connect4 {
  board: (number | null)[][]; // 6x7
  currentPlayer: number; // 1 or 2
  gameOver: boolean;

  constructor() {
    this.board = [];
    for (let i = 0; i < 6; i++) {
      const row: (number | null)[] = [];
      for (let j = 0; j < 7; j++) {
        row.push(null);
      }
      this.board.push(row);
    }
    this.currentPlayer = 1;
    this.gameOver = false;
  }

  play(col: number): string{
    if (this.gameOver) return "Game has finished!";

    let rowPlaced: number;
    try {
      rowPlaced = this.place(col);
      if (this.checkWinFrom(rowPlaced, col)) {
        this.gameOver = true;
        return `Player ${this.currentPlayer} wins!`;
      }
    } catch {
      return "Column full!";
    }

    const player = this.currentPlayer;
    this.switchPlayer();
    return `Player ${player} has a turn`;
  }

  place(col: number) {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][col] === null) {
        this.board[row][col] = this.currentPlayer;
        return row;
      }
    }
    throw new Error("Column is full");
  }

  checkWinFrom(row: number, col: number): boolean {
    const directions = [
      [0, 1],  // horizontal
      [1, 0],  // vertical
      [1, 1],  // diagonal down right
      [1, -1], // diagonal down left
    ];
    const player = this.board[row][col];

    for (const [dr, dc] of directions) {
      let count = 1;
      // check in the positive direction
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r < 0 || r >= 6 || c < 0 || c >= 7 || this.board[r][c] !== player) break;
        count++;
      }
      // check in the negative direction
      for (let i = 1; i < 4; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (r < 0 || r >= 6 || c < 0 || c >= 7 || this.board[r][c] !== player) break;
        count++;
      }
      if (count >= 4) return true;
    }
    return false;
  }

  switchPlayer() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }
}