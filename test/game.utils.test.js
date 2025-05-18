// test/game.utils.test.js
const assert = require("assert");
const { checkWinner, isGameOver, isBoardFull } = require("../utils/gameLogic");

describe("Utilidades del Juego", () => {
  describe("Función checkWinner", () => {
    it('debería devolver "X" cuando X gana horizontalmente', () => {
      const board = ["X", "X", "X", null, "O", null, null, "O", null];
      assert.strictEqual(checkWinner(board), "X");
    });

    it('debería devolver "O" cuando O gana verticalmente', () => {
      const board = [null, "O", null, null, "O", null, null, "O", "X"];
      assert.strictEqual(checkWinner(board), "O");
    });

    it('debería devolver "X" cuando X gana diagonalmente', () => {
      const board = ["X", null, null, null, "X", null, null, null, "X"];
      assert.strictEqual(checkWinner(board), "X");
    });

    it("debería devolver null cuando no hay ganador", () => {
      const board = ["X", "O", null, null, "X", null, null, "O", null];
      assert.strictEqual(checkWinner(board), null);
    });
  });

  describe("Función isGameOver", () => {
    it("debería devolver true cuando hay un ganador", () => {
      const board = ["X", "X", "X", null, "O", null, null, "O", null];
      assert.strictEqual(isGameOver(board), true);
    });

    it("debería devolver true cuando el tablero está lleno y no hay ganador (empate)", () => {
      const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      assert.strictEqual(isGameOver(board), true);
    });

    it("debería devolver false cuando el juego no ha terminado", () => {
      const board = ["X", "O", null, null, "X", null, null, "O", null];
      assert.strictEqual(isGameOver(board), false);
    });
  });

  describe("Función isBoardFull", () => {
    it("debería devolver true cuando el tablero está lleno", () => {
      const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      assert.strictEqual(isBoardFull(board), true);
    });

    it("debería devolver false cuando el tablero no está lleno", () => {
      const board = ["X", "O", null, "O", "X", "O", "O", "X", "O"];
      assert.strictEqual(isBoardFull(board), false);
    });
  });
});
