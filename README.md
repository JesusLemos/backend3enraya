# Backend del Juego Tres en Raya

Este documento describe el backend del juego Tres en Raya, construido con Node.js, Express y MySQL.

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Testing](#testing)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/): Entorno de ejecución para JavaScript en el servidor.
- [Express](https://expressjs.com/): Framework web minimalista y flexible para Node.js.
- [MySQL](https://www.mysql.com/): Sistema de gestión de bases de datos relacional.
- [mysql2](https://github.com/sidorares/node-mysql2): Driver de MySQL para Node.js.
- [nodemon](https://nodemon.io/): Herramienta para reiniciar automáticamente la aplicación Node.js durante el desarrollo.
- [mocha](https://mochajs.org/): Framework de testing para JavaScript.
- [supertest](https://github.com/visionmedia/supertest): Librería para probar APIs HTTP.

## Instalación

1. **Requisitos:** Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) (o [yarn](https://yarnpkg.com/)) instalados en tu sistema. También necesitas tener un servidor MySQL en funcionamiento.
2. **Clonar el repositorio:** `git clone <URL_DEL_REPOSITORIO_BACKEND>`
3. **Navegar al directorio del backend:** `cd backend3enraya`
4. **Instalar las dependencias:** `npm install` (o `yarn install`)

## Ejecución

1. **Navegar al directorio del backend:** `cd backend3enraya`
2. **Iniciar el servidor en modo desarrollo (con reinicio automático):** `npm run dev`
   - Esto iniciará tu servidor Express (probablemente en `http://localhost:3001`).

## Estructura del Proyecto

backend3enraya/
├── controllers/
│ └── gameController.js # Lógica del juego y manejo de la API
├── database.js # Configuración y conexión a la base de datos
├── index.js # Punto de entrada del servidor Express
├── utils/
│ └── gameLogic.js # Funciones puras de la lógica del juego
├── test/
│ └── game.utils.test.js # Pruebas unitarias para la lógica del juego
├── package.json
├── package-lock.json
└── README.md

## Endpoints de la API

- `POST /api/move`: Recibe el tablero actual y el tablero anterior del jugador. Devuelve el nuevo estado del tablero (con el movimiento de la IA si corresponde), el movimiento de la IA (índice), el ganador (si hay), y si el juego ha terminado.
- `POST /api/gameover`: Recibe el ganador del juego ('X', 'O' o `null` para empate) y actualiza el ranking en la base de datos.
- `GET /api/ranking`: Devuelve el ranking actual (victorias del jugador, victorias de la IA, empates) desde la base de datos.

## Testing

- Se utiliza `mocha` como framework de testing.
- Las pruebas unitarias para la lógica del juego (funciones en `utils/gameLogic.js`) se encuentran en `test/game.utils.test.js`.
- Para ejecutar las pruebas, usa el comando: `npm test`

## Configuración de la Base de Datos

1. **Crear la base de datos:** Asegúrate de tener un servidor MySQL en funcionamiento y crea una base de datos llamada `tres_en_raya` (o el nombre que hayas configurado).
2. **Configurar las credenciales:** Edita el archivo de configuración de la base de datos (`database.js` o similar) con las credenciales correctas para tu servidor MySQL (host, usuario, contraseña).
3. **Crear la tabla `ranking`:** Ejecuta el siguiente script SQL en tu base de datos para crear la tabla `ranking`:

```sql
CREATE TABLE IF NOT EXISTS ranking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_wins INT DEFAULT 0,
    ia_wins INT DEFAULT 0,
    draws INT DEFAULT 0
);

INSERT INTO ranking (id, player_wins, ia_wins, draws) VALUES (1, 0, 0, 0) ON DUPLICATE KEY UPDATE id=id;
```
