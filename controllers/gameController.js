// controllers/gameController.js
const { getNextMove, checkWinner, isGameOver } = require("../gameLogic");
const db = require("../database"); // Importa la conexión a la DB

exports.handlePlayerMove = async (req, res) => {
  try {
    const { board } = req.body;

    let winner = checkWinner(board);
    let gameOver = isGameOver(board);

    let iaMove = null;
    let newBoard = [...board];

    if (!gameOver && !winner) {
      iaMove = getNextMove(newBoard, "O");
      if (iaMove !== null) {
        newBoard[iaMove] = "O";
        winner = checkWinner(newBoard);
        gameOver = isGameOver(newBoard);
      }
      board[iaMove] = "O"; // Actualizamos el tablero para la respuesta
    }

    res.json({
      board: newBoard,
      nextMove: iaMove,
      winner: winner,
      gameOver: gameOver,
    });
  } catch (error) {
    console.error("Error en handlePlayerMove:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.handleGameOver = async (req, res) => {
  try {
    const { winner } = req.body;
    if (winner === "X") {
      const [rows] = await db.query(
        "UPDATE ranking SET player_wins = player_wins + 1 WHERE id = 1"
      );
      res.json({ message: "Ranking actualizado (victoria del jugador)" });
    } else if (winner === "O") {
      const [rows] = await db.query(
        "UPDATE ranking SET ia_wins = ia_wins + 1 WHERE id = 1"
      );
      res.json({ message: "Ranking actualizado (victoria de la IA)" });
    } else {
      const [rows] = await db.query(
        "UPDATE ranking SET draws = draws + 1 WHERE id = 1"
      );
      res.json({ message: "Ranking actualizado (empate)" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRanking = async (req, res) => {
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
    res.status(500).json({ error: "Server error" });
  }
};
