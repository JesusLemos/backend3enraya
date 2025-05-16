const express = require("express");
const app = express();
const port = 3001;

const { getNextMove } = require("./gameLogic");

app.use(express.json());

app.post("/next-move", (req, res) => {
  try {
    const board = req.body.board;
    if (!board || board.length !== 9) {
      return res.status(400).json({ error: "Invalid board" });
    }

    const iaMove = getNextMove(board, "O"); // Llamamos a nuestra función principal de lógica

    if (iaMove !== null) {
      res.json({ nextMove: iaMove }); // Si la IA encontró una jugada ganadora, la enviamos
    } else {
      // Si la IA no encontró una jugada ganadora, puedes decidir qué hacer:
      // 1. Devolver null o un valor especial indicando que no hay movimiento estratégico.
      // 2. Implementar una lógica de "segundo mejor movimiento" aquí (bloquear, aleatorio, etc.).
      // Para esta prueba simplificada, simplemente indicaremos que no hay movimiento ganador.
      res.json({ nextMove: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
