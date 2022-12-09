import React from 'react'
import './SquareStyle.css';
export const Square = ({id,state,className}) => {
  return (
    <div className={`square-container ${className} ${state==='X'?'x-color':'y-color'}`} id={id}> {state}</div>
  )
}