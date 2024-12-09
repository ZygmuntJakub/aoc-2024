import { read } from "./commons";

const input = read(__filename);

let answer1 = BigInt(0);
let answer2 = BigInt(0);

const generate = (line: number[]): string[] => {
  const generated: string[] = [];
  let index = 0;
  for (let i = 0; i < line.length; i++) {
    generated.push(
      ...(Array.from({ length: line[i] }).fill(
        i % 2 === 0 ? index : "."
      ) as string[])
    );
    if (i % 2 === 0) {
      index++;
    }
  }
  return generated;
};

const getFreeSpaces = (generated: string[]): [number, number][] => {
  const freeSpaces: [number, number][] = [];
  for (let i = 0; i < generated.length; i++) {
    if (generated[i] === ".") {
      let curr = i;
      while (generated[curr] === ".") {
        curr++;
      }
      freeSpaces.push([i, curr]);
      i = curr;
    }
  }
  return freeSpaces;
};

const getReservedSpaces = (generated: string[]): [number, number, string][] => {
  const reservedSpaces: [number, number, string][] = [];

  for (let i = 0; i < generated.length; i++) {
    if (generated[i] === ".") {
      continue;
    }
    let curr = i;

    while (generated[curr] === generated[i]) {
      curr++;
    }
    reservedSpaces.push([i, curr, generated[i]]);
    i = curr - 1;
  }
  return reservedSpaces;
};

const lines = input.map((line) => line.split("").map(Number));

for (const line of lines) {
  const generated = generate(line);
  let left = 0;
  let right = generated.length - 1;

  while (left < right) {
    if (generated[left] === "." && generated[right] !== ".") {
      generated[left] = generated[right];
      generated[right] = ".";
      left++;
      continue;
    }
    if (generated[left] === ".") {
      right--;
      continue;
    }
    left++;
  }

  const checksum: number = generated
    .filter((x) => x !== ".")
    .reduce<number>((acc, curr, idx) => acc + Number(curr) * idx, 0);

  answer1 += BigInt(checksum);
}

console.log(answer1);

for (const line of lines) {
  const generated = generate(line);
  let freeSpaces = getFreeSpaces(generated);
  let reservedSpaces = getReservedSpaces(generated);

  let free = 0;
  let reserved = reservedSpaces.length - 1;

  while (reservedSpaces[reserved][1] > freeSpaces[0][1]) {
    const available = freeSpaces[free][1] - freeSpaces[free][0];
    const required = reservedSpaces[reserved][1] - reservedSpaces[reserved][0];

    if (
      available >= required &&
      reservedSpaces[reserved][1] > freeSpaces[free][1]
    ) {
      for (
        let i = freeSpaces[free][0];
        i <
        freeSpaces[free][0] +
          (reservedSpaces[reserved][1] - reservedSpaces[reserved][0]);
        i++
      ) {
        generated[i] = reservedSpaces[reserved][2];
      }
      for (
        let i = reservedSpaces[reserved][0];
        i < reservedSpaces[reserved][1];
        i++
      ) {
        generated[i] = ".";
      }

      freeSpaces = getFreeSpaces(generated);
      reservedSpaces.pop();
      free = 0;
      reserved--;
    } else {
      if (free === freeSpaces.length - 1) {
        free = 0;
        reserved--;
      } else {
        free++;
      }
    }
  }

  const checksum: number = generated.reduce<number>((acc, curr, idx) => {
    if (curr === ".") {
      return acc;
    }
    return acc + Number(curr) * idx;
  }, 0);

  answer2 += BigInt(checksum);
}

console.log(answer2);
