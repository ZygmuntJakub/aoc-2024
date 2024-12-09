import { read } from "./commons";

const file = read(__filename);

let answer1 = new Set<string>();

const locations = new Map<string, [number, number][]>();
const grid = file.map((line) => line.split(""));

function findNewPoints(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return [
    [x2 - 2 * dx, y2 - 2 * dy],
    [x1 + 2 * dx, y1 + 2 * dy],
  ];
}

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const location = grid[i][j];
    if (location === ".") {
      continue;
    }

    if (!locations.has(location)) {
      locations.set(location, []);
    }

    locations.get(location)?.push([i, j]);
  }
}

const queue: string[] = [...locations.keys()];

while (queue.length > 0) {
  const location = queue.shift();
  const points = locations.get(location!);
  if (!points) {
    continue;
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      const [[x3, y3], [x4, y4]] = findNewPoints(x1, y1, x2, y2);

      answer1.add(`${x1},${y1}`);
      answer1.add(`${x2},${y2}`);

      if (grid?.[x3]?.[y3]) {
        answer1.add(`${x3},${y3}`);

        let prev = [x3, y3];
        let next = findNewPoints(x3, y3, x1, y1);

        while (grid?.[next[0][0]]?.[next[0][1]]) {
          answer1.add(`${next[0][0]},${next[0][1]}`);
          const tmp = [...next[0]];
          next = findNewPoints(next[0][0], next[0][1], prev[0], prev[1]);
          prev = tmp;
        }
      }

      if (grid?.[x4]?.[y4]) {
        answer1.add(`${x4},${y4}`);

        let prev = [x4, y4];
        let next = findNewPoints(x2, y2, x4, y4);

        while (grid?.[next[1][0]]?.[next[1][1]]) {
          answer1.add(`${next[1][0]},${next[1][1]}`);
          const tmp = [...next[1]];
          next = findNewPoints(prev[0], prev[1], next[1][0], next[1][1]);
          prev = tmp;
        }
      }
    }
  }
}

const printGrid = () => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
};

console.log(answer1.size);
