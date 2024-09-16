import React from "react";

type Coordinate = [number, number];

export function TicTacToeFirst(nGrid: Coordinate[], size: number) {
  const minLength = size > 4 ? 4 : size;

  const sortCoordinates = (coordinates: Coordinate[]): Coordinate[] => {
    return coordinates.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  };

  const hasSequence = (coordinates: Coordinate[], minLength: number): boolean => {
    const sortedCoordinates = sortCoordinates(coordinates);
    const xSequence = sortedCoordinates.map(coord => coord[0]);
    const ySequence = sortedCoordinates.map(coord => coord[1]);

    // Check if both x and y sequences meet the minimum length condition
    return (
      (hasMinSequenceLength(xSequence, minLength) || hasConstantValueLength(xSequence, minLength)) &&
      (hasMinSequenceLength(ySequence, minLength) || hasConstantValueLength(ySequence, minLength))
    );
  };

  const hasMinSequenceLength = (sequence: number[], minLength: number): boolean => {
    if (sequence.length < minLength) return false;

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

  const hasConstantValueLength = (sequence: number[], minLength: number): boolean => {
    if (sequence.length < minLength) return false;

    let count = 1;
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === sequence[i - 1]) {
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

  const hasXSequence = hasSequence(nGrid, minLength);

  return { hasXSequence };
}
