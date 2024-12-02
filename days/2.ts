import fs from "fs";
import path from "path";

let answer1 = 0;
let answer2 = 0;

const file = fs.readFileSync(path.join(__dirname, "../inputs/2"), "utf8");

const lines = file.split("\n").filter((line) => line.trim() !== "");
const linesAfterCorrect: string[] = [];

function isSafeReport(levels: number[]) {
  let dir = levels[1] - levels[0];
  let safe = true;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3 || dir * diff <= 0) {
      safe = false;
      break;
    }
  }

  return safe;
}

while (lines.length > 0 || linesAfterCorrect.length > 0) {
  const line = lines.length > 0 ? lines.shift() : linesAfterCorrect.shift();
  const levels = line!.split(" ").map(Number);

  const safe = isSafeReport(levels);

  if (safe) {
    answer1++;
    answer2++;
  } else {
    for (let i = 0; i < levels.length, 10; i++) {
      const newLevels = [...levels];
      newLevels.splice(i, 1);
      if (isSafeReport(newLevels)) {
        answer2++;
        break;
      }
    }
  }
}

console.log(answer1);
console.log(answer2);
