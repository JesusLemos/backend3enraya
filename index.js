const express = require("express");
const app = express();
const port = 3001;

const { getNextMove, checkWinner, isGameOver } = require("./gameLogic");

app.use(express.json());

app.post("/next-move", async (req, res) => {
  try {
    const board = req.body.board;
    if (!board || board.length !== 9) {
      return res.status(400).json({ error: "Invalid board" });
    }

    //Para que no se resuelva al instante
    await new Promise((resolve) => setTimeout(resolve, 750));

    const iaMove = getNextMove(board, "O");
    const winner = checkWinner(board);
    const gameOver = isGameOver(board);

    res.json({ nextMove: iaMove, winner: winner, gameOver: gameOver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
