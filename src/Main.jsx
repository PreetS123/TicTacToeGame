import React, { useEffect, useState } from "react";
import { DrawText } from "./Components/DrawText";
import { Square } from "./Components/Square";

const initialState = ["", "", "", "", "", "", "", "", ""];
export const Main = () => {
  const [gameState, setGameState] = useState(initialState);
  const [steps, setSteps] = useState(0);
  const [winner, setWinner] = useState(null);

  const onClickHandler = (e) => {
    console.log(e.target.id);
    const copyOfState = [...gameState];
    if (!e.target.innerText) {
      copyOfState[e.target.id] = steps % 2 === 0 ? "X" : "0";
      setSteps(steps + 1);
      setGameState(copyOfState);
    }
  };
  const restartGame = () => {
    setGameState(initialState);
    setSteps(0);
    setWinner(null);
  };
  useEffect(() => {
    checkForConditions(gameState);
  }, [gameState]);
  const checkForConditions = (gameState) => {
    const winningCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winningCondition.forEach((condition) => {
      const [a, b, c] = condition;
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setWinner(gameState[a]);
        console.log("winner", winner);
      }
    });
  };
  return (
    <>
      <div className="container">
        <div className="left-wrapper">
          <div className="left-text">Let's Play the Tic-tac-toe Game!</div>
          <div className="button" onClick={restartGame}>
            Start a New Game
          </div>
        </div>

        <div className="right-wrapper">
          <div className="players">
            <div className={`player ${steps % 2 === 0 && "player-x"}`}>
              Player X
            </div>
            <div className={`player ${steps % 2 === 1 && "player-0"}`}>
              Player 0
            </div>
          </div>
          {!winner && steps < 9 && (
            <div className="game-wrapper" onClick={onClickHandler}>
              <Square
                id={0}
                state={gameState[0]}
                className="border-right-bottom"
              />
              <Square
                id={1}
                state={gameState[1]}
                className="border-right-bottom"
              />
              <Square id={2} state={gameState[2]} className="border-bottom" />
              <Square
                id={3}
                state={gameState[3]}
                className="border-right-bottom"
              />
              <Square
                id={4}
                state={gameState[4]}
                className="border-right-bottom"
              />
              <Square id={5} state={gameState[5]} className="border-bottom" />
              <Square id={6} state={gameState[6]} className="border-right" />
              <Square id={7} state={gameState[7]} className="border-right" />
              <Square id={8} state={gameState[8]} />
            </div>
          )}
          {(winner || steps === 9) && (
            <div>
              {steps === 9 && !winner ? (
                <div style={{ marginBottom: '20px'}} >
                    <DrawText/>
                 </div>
              ) : (
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.KrFo_sZM44LV8d8LmFKwYAHaDu&pid=Api&P=0"
                  alt="Tic Tac Toe"
                  style={{ width: "200px", height: "250px" }}
                />
              )}
              <div style={{marginTop:'20px'}} >
                <h1>
                  {steps === 9 && !winner ? "" : `${winner} Win!`}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
