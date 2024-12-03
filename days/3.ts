import fs from "fs";
import path from "path";

let answer1 = 0;
let answer2 = 0;

const file = fs.readFileSync(path.join(__dirname, "../inputs/3"), "utf8");

const mulRegex = /mul\((\d{1,3}),\s*(\d{1,3})\)/g;
const mulMatches = file.match(mulRegex);

const allRegex = /mul\((\d{1,3}),\s*(\d{1,3})\)|do\(\)|don't\(\)/g;
const allMatches = file.match(allRegex);

for (const match of mulMatches || []) {
  const [_, x, y] = match.match(/mul\((\d{1,3}),\s*(\d{1,3})\)/)!;
  answer1 += parseInt(x) * parseInt(y);
}

let lastEnabled = true;

for (const match of allMatches || []) {
  if (match.includes("do()")) {
    lastEnabled = true;
    continue;
  } else if (match.includes("don't()")) {
    lastEnabled = false;
    continue;
  }
  if (lastEnabled) {
    const [_, x, y] = match.match(/mul\((\d{1,3}),\s*(\d{1,3})\)/)!;
    answer2 += parseInt(x) * parseInt(y);
  }
}

console.log(answer1);
console.log(answer2);
