import fs from "fs";
import path from "path";
import { MinHeap } from "./commons";

let answer1 = 0;
let answer2 = 0;

const file = fs.readFileSync(path.join(__dirname, "../inputs/1"), "utf8");

const leftValues = new MinHeap();
const rightValues = new MinHeap();
const rightOccurances = new Map();

const lines = file.split("\n").filter((line) => line.trim() !== "");

for (const line of lines) {
  const [a, b] = line.split("  ").map(Number);
  leftValues.insert(a);
  rightValues.insert(b);

  if (!rightOccurances.has(b)) {
    rightOccurances.set(b, 0);
  }

  rightOccurances.set(b, rightOccurances.get(b) + 1);
}

while (leftValues.size() > 0 && rightValues.size() > 0) {
  const leftMin = leftValues.extractMin();
  const rightMin = rightValues.extractMin();

  answer1 += Math.abs(leftMin - rightMin);
  answer2 +=
    leftMin * (rightOccurances.has(leftMin) ? rightOccurances.get(leftMin) : 0);
}

console.log(answer1);
console.log(answer2);
