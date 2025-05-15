const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Usa el puerto 3000 por defecto o el puerto definido en el entorno

app.get("/", (req, res) => {
  res.send("¡Hola desde el servidor de 3 en Raya!");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
