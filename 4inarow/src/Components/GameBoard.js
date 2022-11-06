import React, { useEffect, useState } from "react";
import "./GameBoard.css";
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from './Footer';
import { isWinner, isDraw, getComputerMove } from "../helper";
import { GAME_PLAYING, NO_PLAYER, PLAYER1, NO_CIRCLES, GAME_WIN, GAME_DRAW, PLAYER2 } from "../Constants";


//all between Component tags = children property!
const GameBoard = () => {
  const [gameboard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
  const [gameState, setGameState] = useState(GAME_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER)

  const initGame = () => {
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER1);
    setGameState(GAME_PLAYING);
  }

  useEffect(() => {
    initGame();
  }, []) // empty [] = runs only once

  const circleClicked = (id) => {
    // check if circle already clicked
    if (gameboard[id] !== NO_PLAYER) return; // exit function
    // check if we're still playing
    if (gameState !== GAME_PLAYING) return;
    if (isWinner(gameboard, id, currentPlayer)) { // also pass in id
      setGameState(GAME_WIN);
      setWinPlayer(currentPlayer)
    }
    if (isDraw(gameboard, id, currentPlayer)) {
      setGameState(GAME_DRAW);
      setWinPlayer(NO_PLAYER)
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
    const clonedBoard = global.structuredClone(gameboard);
    // const board = [...gameboard] // doesn't copy deeparrays
    clonedBoard[id] = currentPlayer;
    setGameBoard(clonedBoard); // set state with the copy
    // toggle player with ternary
    // you can update primitives directly
    setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
  };

  const renderCircle = (id) => {
    // react needs key property to distinguish between components!
    return (
      <GameCircle key={id} id={id} className={`player${gameboard[id]}`} onCircleClicked={circleClicked} />
    );
  };

  const initBoard = () => {
    const circles = [];

    for (let index = 0; index < NO_CIRCLES; index++) {
      circles.push(renderCircle(index)); // push jsx output from renderCircle into array
    }

    return circles;
  };

  

  const suggestMove = () => {
    circleClicked(getComputerMove(gameboard));
  }


  return (
    <div>
      <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
        <div className="gameboard">{initBoard()}</div>
      <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} />
    </div>
  )
}

export default GameBoard
