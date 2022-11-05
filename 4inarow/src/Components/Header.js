import React from 'react'
import { GAME_PLAYING, GAME_WIN, GAME_DRAW } from "../Constants";

const Header = ({gameState, currentPlayer, winPlayer}) => {
  const renderLabel = () => {
    switch (gameState) {
      case GAME_PLAYING:
        return <div>Player { currentPlayer } Turn</div>
      case GAME_WIN:
        return <div>Player { winPlayer } Wins</div>
      case GAME_DRAW:
        return <div>Game Draw</div>
      default:
        break;
    }
  }
  return (
    <div className='panel header'>
        <div className='header-text'>{renderLabel()}</div>
    </div>
  );
};

export default Header