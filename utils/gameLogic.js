function chooseFirstMove(board) {
  const corners = [0, 2, 6, 8]; // Índices de las esquinas del tablero
  const center = 4; // Índice del centro del tablero

  if (isBoardEmpty(board)) {
    // Verifica si el tablero está completamente vacío
    return center; // Si lo está, elige el centro (la mejor primera jugada)
  }

  if (!board[center]) {
    // Verifica si el centro está libre
    return center; // Si el centro está libre, lo elige
  }

  // Si el centro está ocupado, elige una esquina aleatoria
  const availableCorners = corners.filter((corner) => !board[corner]); // Obtiene las esquinas libres
  if (availableCorners.length > 0) {
    // Si hay esquinas libres
    const randomCornerIndex = Math.floor(
      Math.random() * availableCorners.length
    ); // Elige un índice aleatorio de las esquinas libres
    return availableCorners[randomCornerIndex]; // Devuelve el índice de la esquina aleatoria
  }

  // Si no hay esquinas libres, elige la primera celda libre
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      // Si la celda está libre
      return i; // Devuelve su índice
    }
  }

  return 0; // No debería llegar aquí, pero es una seguridad
}

function isBoardEmpty(board) {
  return board.every((cell) => cell === null); // Verifica si todas las celdas del tablero son nulas (vacías)
}

function getNextMove(board, player) {
  if (isGameOver(board)) {
    return null;
  }

  if (isBoardFull(board)) {
    return null;
  }

  const bestMove = findBestMove(board, player);
  return bestMove;
}

function findBestMove(board, player) {
  // 1. Verificar si la IA puede ganar
  const winningMove = findWinningMove(board, player);
  if (winningMove !== null) {
    return winningMove;
  }

  // 2. Si es el primer movimiento de la IA, aplicar estrategia inicial
  const iaMoves = board.filter((cell) => cell === player).length;
  const playerMoves = board.filter(
    (cell) => cell === (player === "O" ? "X" : "O")
  ).length;

  if (iaMoves === 0) {
    return chooseFirstMove(board);
  }

  // 3. Si no hay jugada ganadora, elegir un espacio vacío al azar
  return chooseRandomMove(board);
}

function findWinningMove(board, player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      (!board[a] && board[b] === player && board[c] === player) ||
      (!board[b] && board[a] === player && board[c] === player) ||
      (!board[c] && board[a] === player && board[b] === player)
    ) {
      if (!board[a]) return a;
      if (!board[b]) return b;
      return c;
    }
  }

  return null;
}

function chooseRandomMove(board) {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === null) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyCells.length === 0) {
    return null; // Tablero lleno (esto no debería ocurrir si se llama antes de isBoardFull)
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columnas
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Devuelve el símbolo del ganador ('X' u 'O')
    }
  }
  return null; // No hay ganador
}

function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

function isGameOver(board) {
  return checkWinner(board) !== null || isBoardFull(board);
}

module.exports = { checkWinner, isGameOver, getNextMove };
