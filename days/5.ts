import { read } from "./commons";

const file = read(__filename);

const highPrio = new Map();
const lowPrio = new Map();

const wrongOrder = [];

let answer1 = 0;
let answer2 = 0;

for (const line of file) {
  if (line.includes("|")) {
    const [a, b] = line.split("|").map(Number);

    if (!highPrio.has(a)) {
      highPrio.set(a, []);
    }

    if (!lowPrio.has(b)) {
      lowPrio.set(b, []);
    }

    highPrio.get(a).push(b);
    lowPrio.get(b).push(a);
  }

  if (line.includes(",")) {
    const numbers = line.split(",").map(Number);

    let isValid = true;

    for (let k = 0; k < numbers.length; k++) {
      for (let left = k - 1; left >= 0; left--) {
        if (lowPrio.get(numbers[left])?.includes(numbers[k])) {
          isValid = false;
          break;
        }
      }

      for (let right = k + 1; right < numbers.length; right++) {
        if (highPrio.get(numbers[right])?.includes(numbers[k])) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      answer1 += numbers[Math.floor(numbers.length / 2)];
    } else {
      wrongOrder.push(numbers);
    }
  }
}

for (const numbers of wrongOrder) {
  numbers.sort((a, b) =>
    highPrio.get(a)?.includes(b) ? -1 : highPrio.get(b)?.includes(a) ? 1 : 0
  );

  answer2 += numbers[Math.floor(numbers.length / 2)];
}

console.log(answer1);
console.log(answer2);
