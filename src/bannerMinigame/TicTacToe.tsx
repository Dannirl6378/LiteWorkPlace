import * as React from "react";
import { useEffect, useState } from "react";
import "./TicTacToe.css"; // Přidání CSS souboru

import { generateXGrid } from "./utils";
import { TicTacToeFirst } from "./TicTacToeFirst";

export default function TicTacToe() {
  const size = 3;
  const [newValues, setNewValues] = useState<[number, number] | null>(null);
  const [circleGrid, setCircleGrid] = useState<[number, number][]>([]);
  const [xGrid, setXGrid] = useState<[number, number][]>([]);
  const [isNextCircle, setIsNextCircle] = useState<boolean>(true);
  const [isWinnerO, setIsWinnerO] = useState<boolean>(false);
  const [isWinnerX, setIsWinnerX] = useState<boolean>(false);

  const gridMap = Array(size)
    .fill("")
    .map(() => Array(size).fill(""));

  const handleClick = (rowIndex: number, cellIndex: number) => {
    const coord: [number, number] = [rowIndex, cellIndex];
    if (
      circleGrid.some(([row, col]) => row === rowIndex && col === cellIndex) ||
      xGrid.some(([row, col]) => row === rowIndex && col === cellIndex) ||
      isWinnerO ||
      isWinnerX
    ) {
      return; // Pokud je pole obsazeno nebo je hra již vyhraná, nic nedělej
    }

    if (isNextCircle) {
      setCircleGrid([...circleGrid, coord]);
    } else {
      setXGrid([...xGrid, coord]);
    }
    setIsNextCircle(false);
  };
  console.log("xGrid",xGrid);

  const generateNewValues = () => {
    let newCoord: [number, number] | null = null;
    while (!newCoord) {
      const potentialCoord = generateXGrid(size);
      if (
        potentialCoord &&
        !circleGrid.some(
          ([row, col]) => row === potentialCoord[0] && col === potentialCoord[1]
        ) &&
        !xGrid.some(
          ([row, col]) => row === potentialCoord[0] && col === potentialCoord[1]
        )
      ) {
        newCoord = potentialCoord;
        console.log("potentialcoord",potentialCoord);
      }
    }
    
    setNewValues(newCoord);
  };

  useEffect(() => {
    if (circleGrid.length > 0 && !isNextCircle && !isWinnerO && !isWinnerX) {
      generateNewValues(); // Spustí generování nových souřadnic pro `X`
    }
  }, [circleGrid, isNextCircle, isWinnerO, isWinnerX]);

  useEffect(() => {
    if (newValues && !isNextCircle) {
      setXGrid([...xGrid, newValues]);
      setIsNextCircle(true);
    }
  }, [newValues]);

  const checkWinCondition = (grid: [number, number][]) => {
    const result = TicTacToeFirst(grid, size);
    return result.hasXSequence;
  };
console.log("circleGrid",circleGrid);
  useEffect(() => {
    if (checkWinCondition(circleGrid)) {
      setIsWinnerO(true);
    }
  }, [circleGrid]);

  useEffect(() => {
    if (checkWinCondition(xGrid)) {
      setIsWinnerX(true);
    }
  }, [xGrid]);

  const renderGridMap = () => {
    return gridMap.map((rowData, rowIndex) => (
      <tr key={rowIndex}>
        {rowData.map((_, cellIndex) => {
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
          setCircleGrid([]);
          setXGrid([]);
          setIsWinnerO(false);
          setIsWinnerX(false);
          setIsNextCircle(true);
        }}
      >
        Nová Hra
      </button>
      <div className="TicTacToePosition">
        <div>
          <p>Vyhrává</p>
          {isWinnerX ? <h4>Hráč X</h4> : isWinnerO ? <h4> Hráč O</h4> : null}
        </div>
        <div>
          <table className="table">
            <tbody>{renderGridMap()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
