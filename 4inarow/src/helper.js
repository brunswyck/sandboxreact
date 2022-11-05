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
  
}