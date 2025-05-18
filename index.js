const express = require("express");
const gameController = require("./controllers/gameController");
const app = express();
const port = 3001;

app.use(express.json());

app.post("/api/move", gameController.handlePlayerMove);
app.post("/api/gameover", gameController.handleGameOver);
app.get("/api/ranking", gameController.getRanking);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
