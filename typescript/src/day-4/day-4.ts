import fs from "node:fs";
import path from "node:path";


const parseInput = (filename: string): string[][] => {
  const file_path = path.join(__dirname, filename)
  return fs.readFileSync(file_path, 'utf-8').split('\n').map(line => line.split(""))
}

const DIRECTIONS = [
  [0, 1],   // right
  [0, -1],  // left
  [1, 0],   // down
  [-1, 0],  // up
  [1, 1],   // down-right diagonal
  [-1, -1], // up-left diagonal
  [-1, 1],  // up-right diagonal
  [1, -1],  // down-left diagonal
];


const findWordOptimized = (
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: [number, number]
): boolean => {
  const [dx, dy] = direction;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 1; i < word.length; i++) {
    const newRow = startRow + dx * i;
    const newCol = startCol + dy * i;

    if (
      newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols ||
      grid[newRow][newCol] !== word[i]
    ) {
      return false;
    }
  }

  return true;
};

export const part1 = (filename: string): number => {
  const grid = parseInput(filename);
  const word = "XMAS";
  let result = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === word[0]) {
        for (const direction of DIRECTIONS as [number, number][]) {
          if (findWordOptimized(grid, word, i, j, direction)) {
            result++;
          }
        }
      }
    }
  }

  return result;
};

export const part2 = (filename: string): number => {
  const grid = parseInput(filename);
  const rows = grid.length;
  const cols = grid[0].length;
  let result = 0;

  const isValidPair = (el: string, opposite: string): boolean => {
    const validLetters = new Set(["M", "S"]);
    return el !== opposite && validLetters.has(el) && validLetters.has(opposite);
  };

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      if (grid[i][j] === "A") {
        const topLeft = grid[i - 1][j - 1];
        const topRight = grid[i - 1][j + 1];
        const bottomLeft = grid[i + 1][j - 1];
        const bottomRight = grid[i + 1][j + 1];

        if (
          isValidPair(topLeft, bottomRight) &&
          isValidPair(topRight, bottomLeft)
        ) {
          result++;
        }
      }
    }
  }

  return result;
};

