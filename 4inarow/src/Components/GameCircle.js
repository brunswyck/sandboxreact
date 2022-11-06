import React from "react";
import "./GameCircle.css";

const GameCircle = ({ id, children, className, onCircleClicked}) => {
  return (
    <div className={`gameCircle ${className}`}
      id={id} onClick={() => onCircleClicked(id)} >
      {children}
    </div>
  );
};

export default GameCircle;
