export const isWinner = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;

  const winLines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 16],
    [3, 6, 9, 12],
  ];

  for (let index = 0; index < winLines.length; index++) {
    const [c1, c2, c3, c4] = winLines[index];

    if (
      board[c1] > 0 &&
      board[c1] === board[c2] &&
      board[c2] === board[c3] &&
      board[c3] === board[c4]
    ) {
      return true;
    }
  }
  return false;
};

// when there are no 0's in array and no winner
export const isDraw = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;

  let count = board.reduce((prevVal, curVal) => prevVal + (curVal === 0), 0);
  return count === 0;
};

export const getRandomComputerMove = (gameBoard) => {
  let validMoves = [];
  for (let index = 0; index < gameBoard.length; index++) {
    if (gameBoard[index] === 0) {
      validMoves.push(index);
    }
  }
  let randomMove = Math.floor(Math.random() * validMoves.length);
  return validMoves[randomMove];
};

const getPosition = (gameBoard, moveChecks) => {
  for (let check = 0; check < moveChecks.length; check++) {
    for (
      let index = 0;
      index < moveChecks[check].max;
      index += moveChecks[check].step
    ) {
        let series = 
        gameBoard[index + moveChecks[check].indexes[0]].toString() +
        gameBoard[index + moveChecks[check].indexes[1]].toString() +
        gameBoard[index + moveChecks[check].indexes[2]].toString() +
        gameBoard[index + moveChecks[check].indexes[3]].toString(); 

        switch (series) {
          case "1110":
          case "2220":
            return index + moveChecks[check].indexes[3];
          case "1101":
          case "2202":
            return index + moveChecks[check].indexes[2];
          case "1011":
          case "2022":
            return index + moveChecks[check].indexes[1];
          case "0111":
          case "0222":
            return index + moveChecks[check].indexes[0];
          default:
            break;
        }
    }
  }
  return -1;
};

export const getComputerMove = (gameBoard) => {
  let moveChecks = [
    // vertical checks
    {
      indexes: [0, 4, 8, 12],
      max: 4,
      step: 1,
    },
    // horizontal checks
    {
      indexes: [0, 1, 2, 3],
      max: 16,
      step: 4,
    },
    // diagonal1 check
    {
      indexes: [0, 5, 10, 15],
      max: 16,
      step: 16,
    },
    // diagonal2 check
    {
      indexes: [3, 8, 9, 12],
      max: 16,
      step: 16,
    },
  ];

  let position = getPosition(gameBoard, moveChecks);
  if (position >  -1) return position;

  return getRandomComputerMove(gameBoard);
};
