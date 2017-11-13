/* eslint-env mocha */
const { expect } = require('chai');
const { board } = require('../index');

describe('board', () => {
  describe('display', () => {
    it('should be an array of length 3', () => {
      expect(board.length).to.equal(3);
    });
  });
});
