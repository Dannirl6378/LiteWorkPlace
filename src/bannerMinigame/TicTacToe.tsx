import * as React from "react";
import { useState, useEffect } from "react";
import "./TicTacToe.css";
import { generateXGrid } from "./utils";
import { TicTacToeFirst } from "./TicTacToeFirst";

export default function TicTacToe() {
  const size = 3;

  const [gameState, setGameState] = useState({
    circleGrid: [] as [number, number, string][],
    xGrid: [] as [number, number, string][],
    isNextCircle: true, // "O" goes first
    winner: null as "X" | "O" | null,
    isDraw: false,
    moveCount: size * size, 
  });

  const gridMap = Array(size)
    .fill("")
    .map(() => Array(size).fill(""));

    const handleClick = (rowIndex: number, cellIndex: number) => {
      const { circleGrid, xGrid, isNextCircle, winner, isDraw } = gameState;
    
      if (
        circleGrid.some(([row, col]) => row === rowIndex && col === cellIndex) ||
        xGrid.some(([row, col]) => row === rowIndex && col === cellIndex) ||
        winner ||
        isDraw
      ) {
        return;
      }
    
      // Update state
      setGameState((prevState) => ({
        ...prevState,
        circleGrid: isNextCircle
          ? [...prevState.circleGrid, [rowIndex, cellIndex, "O"]]
          : prevState.circleGrid,
        xGrid: !isNextCircle
          ? [...prevState.xGrid, [rowIndex, cellIndex, "X"]]
          : prevState.xGrid,
        isNextCircle: !isNextCircle,
        moveCount: prevState.moveCount - 1, // Always decrement moves
      }));
    };

  const checkWinCondition = (grid: [number, number, string][]) => {
    const result = TicTacToeFirst(grid, size);
    return result.hasXSequence || result.hasOSequence;
  };

  const checkDrawCondition = () => {
    const { moveCount, winner } = gameState;
    return moveCount === 0 && !winner; // Check draw condition
  };

  useEffect(() => {
    const { circleGrid, xGrid, moveCount, winner } = gameState;

    if (!winner) {
      // Check winner or draw after a move
      if (checkWinCondition(circleGrid)) {
        setGameState((prevState) => ({ ...prevState, winner: "O" }));
      } else if (checkWinCondition(xGrid)) {
        setGameState((prevState) => ({ ...prevState, winner: "X" }));
      } else if (checkDrawCondition()) {
        setGameState((prevState) => ({ ...prevState, isDraw: true }));
      }
    }
  }, [gameState.circleGrid, gameState.xGrid, gameState.moveCount]);

  const generateNewValues = (): [number, number, string] | null => {
    const { circleGrid, xGrid } = gameState;
    const emptyCells: [number, number][] = [];

    // Collect all empty cells
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (
          !circleGrid.some(([r, c]) => r === row && c === col) &&
          !xGrid.some(([r, c]) => r === row && c === col)
        ) {
          emptyCells.push([row, col]);
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const [row, col] = emptyCells[randomIndex];
      return [row, col, "X"];
    }
    return null;
  };

  useEffect(() => {
    const { isNextCircle, winner, isDraw } = gameState;

    // Generate new values for "X" if no winner and it's AI's turn
    if (!isNextCircle && !winner && !isDraw) {
      const newValues = generateNewValues();
      if (newValues) {
        setGameState((prevState) => ({
          ...prevState,
          xGrid: [...prevState.xGrid, newValues],
          isNextCircle: true,
          moveCount: prevState.moveCount - 1,
        }));
      }
    }
  }, [gameState.circleGrid, gameState.isNextCircle, gameState.winner, gameState.isDraw]);

  const renderGridMap = () => {
    return gridMap.map((rowData, rowIndex) => (
      <tr key={rowIndex}>
        {rowData.map((_, cellIndex) => {
          const { circleGrid, xGrid } = gameState;
          const isCircle = circleGrid.some(
            ([row, col]) => row === rowIndex && col === cellIndex,
          );
          const isCross = xGrid.some(
            ([row, col]) => row === rowIndex && col === cellIndex,
          );

          return (
            <td
              className="border"
              key={cellIndex}
              onClick={() => handleClick(rowIndex, cellIndex)}
            >
              {isCross ? <div className="cross">X</div> : ""}
              {isCircle ? <div className="circle">O</div> : ""}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      <button
        onClick={() => {
          setGameState({
            circleGrid: [],
            xGrid: [],
            isNextCircle: true,
            winner: null,
            isDraw: false,
            moveCount: size * size,
          });
        }}
      >
        Nová Hra
      </button>
      <div className="TicTacToePosition">
        <div>
          <p>Vyhrává</p>
          {gameState.winner ? <h4>Hráč {gameState.winner}</h4> : null}
          {gameState.isDraw ? <h4>Remíza</h4> : null}
        </div>
        <div>
          <table className="table">
            <tbody>{renderGridMap()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
