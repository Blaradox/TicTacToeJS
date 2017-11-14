const prompt = require('prompt');

prompt.start();

// HELPER FUNCTIONS
const allThreeEqual = (a, b, c) => a === b && b === c;

class TicTacToe {
  constructor() {
    this.player = 'x';
    this.count = 0;
    this.board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
  }

  printBoard() {
    this.board.forEach((r, ind) => {
      console.log(` ${r[0]} | ${r[1]} | ${r[2]} `);
      if (ind !== 2) {
        console.log('-----------');
      }
    });
  }

  getMove() {
    console.log(`Where do you want to move player ${this.player}?`);
    return new Promise((resolve, reject) => {
      prompt.get(['move'], (err, result) => {
        if (err) { reject(err); }
        const { move } = result;
        resolve(move);
      });
    });
  }

  getValidMove() {
    return this.getMove()
      .then(num => parseInt(num, 10))
      .then((num) => {
        if (this.isInvalidMove(num)) { return this.getValidMove(); }
        return num;
      })
      .catch(err => console.error(err));
  }

  getPlaceOnBoard(num) {
    const row = Math.floor((num - 1) / 3) % 3;
    const col = ((num % 3) - 1 === -1) ? 2 : ((num % 3) - 1);
    const val = this.board[row][col];
    return { row, col, val };
  }

  isInvalidMove(num) {
    if (typeof num !== 'number') {
      console.log('You did not enter a number');
      return true;
    } else if (num < 1 || num > 9) {
      console.log('The number you entered is out of bounds');
      return true;
    } else if (num !== Math.floor(num)) {
      console.log('You must enter an integer');
      return true;
    } else if (typeof this.getPlaceOnBoard(num).val === 'string') {
      console.log('That place is already occupied');
      return true;
    }
    return false;
  }

  gameIsWon(row, col) {
    return allThreeEqual(this.board[0][col], this.board[1][col], this.board[2][col]) ||
      allThreeEqual(this.board[row][0], this.board[row][1], this.board[row][2]) ||
      allThreeEqual(this.board[0][0], this.board[1][1], this.board[2][2]) ||
      allThreeEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
  }

  switchPlayers() {
    this.player = this.player === 'x' ? 'o' : 'x';
  }

  placeMove(row, col) {
    this.count += 1;
    this.board[row][col] = this.player;
  }

  playGame() {
    this.printBoard();
    this.getValidMove()
      .then((move) => {
        const { row, col } = this.getPlaceOnBoard(move);
        this.placeMove(row, col);
        if (this.gameIsWon(row, col)) {
          console.log(`You won player ${this.player}!!`);
          return;
        } else if (this.count >= 9) {
          console.log('You tied!!');
          return;
        }
        this.switchPlayers();
        this.playGame();
      })
      .catch(err => console.error(err));
  }
}

const game = new TicTacToe();
game.playGame();

module.exports = {
  TicTacToe,
};
