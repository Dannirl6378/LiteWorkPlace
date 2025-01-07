type Coordinate = [number, number, string];

export function TicTacToeFirst(nGrid: Coordinate[], size: number) {
  // Statické definice výherních kombinací pro řady, sloupce a diagonály
  const winningCombinations: Array<[number, number][]> = [
    // Řady
    [[0, 0], [0, 1], [0, 2]],  // První řada
    [[1, 0], [1, 1], [1, 2]],  // Druhá řada
    [[2, 0], [2, 1], [2, 2]],  // Třetí řada
    
    // Sloupce
    [[0, 0], [1, 0], [2, 0]],  // První sloupec
    [[0, 1], [1, 1], [2, 1]],  // Druhý sloupec
    [[0, 2], [1, 2], [2, 2]],  // Třetí sloupec
    
    // Diagonály
    [[0, 0], [1, 1], [2, 2]],  // Diagonála zleva doprava
    [[0, 2], [1, 1], [2, 0]],  // Diagonála zprava doleva
  ];

  // Pomocná funkce pro kontrolu, zda jsou všechny pozice v kombinaci obsazeny jedním hráčem
  const checkCombination = (combination: [number, number][], player: string): boolean => {
    return combination.every(([row, col]) => 
      nGrid.some(([r, c, symbol]) => r === row && c === col && symbol === player)
    );
  };

  // Kontrola výhry pro "X" a "O"
  const hasXSequence = winningCombinations.some(combination => checkCombination(combination, 'X'));
  const hasOSequence = winningCombinations.some(combination => checkCombination(combination, 'O'));

  return { hasXSequence, hasOSequence };
}
