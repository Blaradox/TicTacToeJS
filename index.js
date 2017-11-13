const prompt = require('prompt');

const board = [
  ['_', '_', '_'],
  ['_', '_', '_'],
  ['_', '_', '_'],
];

prompt.start();

prompt.get(['row', 'column'], (err, result) => {
  const { row, column } = result;
  board[row][column] = 'O';
  board.forEach((row) => {
    console.log(row);
  });
});

module.exports = {
  board,
};
