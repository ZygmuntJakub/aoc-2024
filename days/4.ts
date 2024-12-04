import R from "rambda";
import { read } from "./commons";

const getGridAllDiagonals = (grid: string[][]) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const primaryDiagonals = [];
  const secondaryDiagonals = [];

  for (let r = 0; r < rows; r++) {
    let diagonal = [];
    let i = r,
      j = 0;
    while (i < rows && j < cols) {
      diagonal.push(grid[i][j]);
      i++;
      j++;
    }
    primaryDiagonals.push(diagonal);
  }

  for (let c = 1; c < cols; c++) {
    let diagonal = [];
    let i = 0,
      j = c;
    while (i < rows && j < cols) {
      diagonal.push(grid[i][j]);
      i++;
      j++;
    }
    primaryDiagonals.push(diagonal);
  }

  for (let r = 0; r < rows; r++) {
    let diagonal = [];
    let i = r,
      j = cols - 1;
    while (i < rows && j >= 0) {
      diagonal.push(grid[i][j]);
      i++;
      j--;
    }
    secondaryDiagonals.push(diagonal);
  }

  for (let c = cols - 2; c >= 0; c--) {
    let diagonal = [];
    let i = 0,
      j = c;
    while (i < rows && j >= 0) {
      diagonal.push(grid[i][j]);
      i++;
      j--;
    }
    secondaryDiagonals.push(diagonal);
  }

  return [...primaryDiagonals, ...secondaryDiagonals];
};

const getXs = (grid: string[][], length = 3) => {
  const Xs: [string[], string[]][] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i + length - 1 >= grid.length || j + length - 1 >= grid[0].length)
        continue;
      const X1 = [];
      const X2 = [];
      for (let k = 0; k < length; k++) {
        X1.push(grid[i + k][j + length - 1 - k]);
        X2.push(grid[i + k][j + k]);
      }

      Xs.push([X1, X2]);
    }
  }
  return Xs;
};

const grid = R.map(R.split(""), read(__filename));

const countWords = (word: string, line: string[]) => {
  const lineString = line.join("");
  const reversedWord = [...word].reverse().join("");

  let count = 0;
  for (let i = 0; i <= lineString.length - word.length; i++) {
    const slice = lineString.slice(i, i + word.length);
    if (slice === word || slice === reversedWord) {
      count++;
    }
  }
  return count;
};

const countX = (word: string, line1: string[], line2: string[]) => {
  if (
    (line1.join("") === word || line1.toReversed().join("") === word) &&
    (line2.join("") === word || line2.toReversed().join("") === word)
  ) {
    return 1;
  }

  return 0;
};

const answer1 = R.pipe(
  R.map((line: string[]) => countWords("XMAS", line)),
  R.sum
)([...grid, ...R.transpose(grid), ...getGridAllDiagonals(grid)]);

const answer2 = R.pipe(
  R.map((lines: [string[], string[]]) => countX("MAS", lines[0], lines[1])),
  R.sum
)(getXs(grid));

console.log(answer1);
console.log(answer2);
