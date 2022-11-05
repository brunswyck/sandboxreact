import React, {useState} from "react";
import "./GameCircle.css";

const onCircleClicked= (id) => {
};

// only interested in id (Destructing props) w ({wantedProp})
const GameCircle = ({ id, children, className, onCircleClicked}) => {
  return (
    <div className={`gameCircle ${className}`}
      id={id} onClick={() => onCircleClicked(id)} >
      {children}
    </div>
  );
};

export default GameCircle;
