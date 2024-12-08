import { read } from "./commons";

const file = read(__filename);
let answer2 = 0;

const grid = file.map((line) => line.split(""));

const [OBSTACLE, EMPTY, LEFT, DOWN, RIGHT, UP, VISITED] = [
  "#",
  ".",
  "<",
  "v",
  ">",
  "^",
  "X",
];

const MOVE_MAP = {
  [LEFT]: UP,
  [UP]: RIGHT,
  [RIGHT]: DOWN,
  [DOWN]: LEFT,
};

let initStart: [number, number] = [-1, -1];
let position: [number, number] = [-1, -1];

const printGrid = (grid: string[][]) => {
  console.log(grid.map((line) => line.join("")).join("\n"));
};

for (const [index, line] of grid.entries()) {
  const res = line.findIndex((cell) => [UP, DOWN, LEFT, RIGHT].includes(cell));

  if (res !== -1) {
    initStart = [index, res];
    position = [...initStart];
    break;
  }
}

const getVisitedKey = (
  position: [number, number],
  direction: string = "none"
) => `${position[0]}-${position[1]}-${direction}`;

const visited = new Set<string>();
const visitedWithDirection = new Set<string>();
visited.add(getVisitedKey(position));
visitedWithDirection.add(
  getVisitedKey(position, grid[position[0]][position[1]])
);

const find = (grid: string[][], second = false) => {
  while (true) {
    const direction = grid[position[0]][position[1]];

    const nextPosition: [number, number] = [...position];

    if (direction === LEFT) {
      nextPosition[1]--;
    }

    if (direction === RIGHT) {
      nextPosition[1]++;
    }

    if (direction === UP) {
      nextPosition[0]--;
    }

    if (direction === DOWN) {
      nextPosition[0]++;
    }

    if (
      nextPosition[0] < 0 ||
      nextPosition[0] >= grid.length ||
      nextPosition[1] < 0 ||
      nextPosition[1] >= grid[0].length
    ) {
      position = [...initStart];
      break;
    }

    if (grid[nextPosition[0]][nextPosition[1]] === OBSTACLE) {
      grid[position[0]][position[1]] = MOVE_MAP[direction];
      continue;
    }

    grid[position[0]][position[1]] = EMPTY;
    grid[nextPosition[0]][nextPosition[1]] = direction;
    position = nextPosition;
    if (visitedWithDirection.has(getVisitedKey(position, direction))) {
      answer2++;
      position = [...initStart];

      break;
    }

    if (!second) {
      visited.add(getVisitedKey(position));
    }

    visitedWithDirection.add(getVisitedKey(position, direction));
  }
};

const gridCopy = JSON.parse(JSON.stringify(grid));

find(gridCopy);

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === EMPTY) {
      const copy = JSON.parse(JSON.stringify(grid));
      visitedWithDirection.clear();
      copy[i][j] = OBSTACLE;
      find(copy, true);
    }
  }
}

console.log(visited.size);
console.log(answer2);
