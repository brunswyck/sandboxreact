import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {

  const [calc, setCalc] = useState({
    current: "0",
    total: "0",
    clearDisplay: true,
    pressedOperator: "",
    radix: 10
  });

  const CalcButton = (props) => {
    /* props down - events up, comm to parent through event callback function
     {() => props.onClick(param)} callback function syntax */
    return <button className={props.className} onClick={() => props.onClick(props.value)}>{props.value}</button>  
  }

  const handleNumber = (value) => {
    let newTotal = value;
    if (!calc.clearDisplay) {
      newTotal = calc.current + value;
    }  // set pressedOperator to itself otherwise state is lost
    setCalc({current: newTotal, total: calc.total, clearDisplay: false, pressedOperator: calc.pressedOperator});
  }

  const doCalculation = () => {
    let total = parseInt(calc.total, calc.radix)
    // debugger;
    // console.log(calc)

    switch (calc.pressedOperator) {
        case "+":
            total += parseInt(calc.current, calc.radix)
            break;
        case "-":
            total -= parseInt(calc.current, calc.radix)
            break;
        case "*":
            total *= parseInt(calc.current, calc.radix)
            break;
        case "/":
            total /= parseInt(calc.current, calc.radix)
            break;
        default: // eg when = is pressed
            total = parseInt(calc.current, calc.radix)
            break;
    }
    return total;
  }

  const handleOperator = (value) => {
    const total = doCalculation();
    setCalc({current: total.toString(), total: total.toString(), clearDisplay: true, pressedOperator: value});
  }


  const handleClear = () => {
    setCalc({
        current: "0",
        total: "0",
        clearDisplay: true,
        pressedOperator: "",
      });
  }

  const renderDisplay = () => {
    return calc.current;
  }

  return (
    <div className="calculator">
      <div className='display'>{renderDisplay()}</div>
      <CalcButton value="1" onClick={handleNumber}/> 
      <CalcButton value="2" onClick={handleNumber}/>
      <CalcButton value="3" onClick={handleNumber}/>
      <CalcButton className="operator" value="/" onClick={handleOperator}/>
      
      <CalcButton value="4" onClick={handleNumber}/>
      <CalcButton value="5" onClick={handleNumber}/>
      <CalcButton value="6" onClick={handleNumber}/>
      <CalcButton className="operator" value="*" onClick={handleOperator}/>
      
      <CalcButton value="7" onClick={handleNumber}/>
      <CalcButton value="8" onClick={handleNumber}/>
      <CalcButton value="9" onClick={handleNumber}/>
      <CalcButton className="operator" value="+" onClick={handleOperator}/>
      
      <CalcButton value="c" onClick={handleClear}/>
      <CalcButton value="0" onClick={handleNumber}/>
      <CalcButton value="=" onClick={handleOperator}/>
      <CalcButton className="operator" value="-" onClick={handleOperator}/>
    </div>
  ); // end return
  
}; // end Calculator component/function

export default Calculator;