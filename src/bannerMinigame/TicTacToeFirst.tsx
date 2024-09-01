import React from "react";

export function TicTacToeFirst(nGrid: [number, number][], size: number) {
  const minLength = size > 4 ? 4 : size;

  type Coordinate = [number, number];

  const Player: Coordinate[] = nGrid;
  const sortCoordinates = (coordinates: Coordinate[]): Coordinate[] => {
    return coordinates.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  };

  const hasSequence = (
    coordinates: Coordinate[],
    minLength: number
  ): boolean => {
    const sortedCoordinates = sortCoordinates(coordinates);
    const xSequence = sortedCoordinates.map((coord) => coord[0]);
    const ySequence = sortedCoordinates.map((coord) => coord[1]);
    return (
      hasMinSequenceLength(xSequence, minLength) ||
      hasMinSequenceLength(ySequence, minLength)
    );
  };

  const hasMinSequenceLength = (
    sequence: number[],
    minLength: number
  ): boolean => {
    let count = 1;
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === sequence[i - 1] + 1) {
        count++;
        if (count >= minLength) {
          return true;
        }
      } else {
        count = 1;
      }
    }
    return false;
  };

  const hasXSequence: boolean = hasSequence(Player, minLength);

  return { hasXSequence };
}