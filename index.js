const express = require("express");
const db = require("./database");
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

    if (winner) {
      try {
        const [rows] = await db.query(
          "UPDATE ranking SET player_wins = player_wins + ?, ia_wins = ia_wins + ? WHERE id = 1",
          [winner === "X" ? 1 : 0, winner === "O" ? 1 : 0]
        );
        console.log("Ranking actualizado:", rows);
      } catch (error) {
        console.error("Error al actualizar el ranking:", error);
      }
    }

    res.json({ nextMove: iaMove, winner: winner, gameOver: gameOver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/ranking", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT player_wins, ia_wins, draws FROM ranking WHERE id = 1"
    );
    if (rows.length > 0) {
      res.json({
        playerWins: rows[0].player_wins,
        iaWins: rows[0].ia_wins,
        draws: rows[0].draws,
      });
    } else {
      res.status(404).json({ error: "Ranking not found" });
    }
  } catch (error) {
    console.error("Error al obtener el ranking:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
