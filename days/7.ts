import { read } from "./commons";

const file = read(__filename);

let answer1 = 0;
let answer2 = 0;

const findAnswer = (
  numbers: number[],
  expectedResult: number,
  operators: string[],
  level: number
) => {
  let formula = numbers.reduce((acc, num, index) => {
    acc.push(`${num})${operators[index]}`);
    return acc;
  }, [] as string[]);

  formula.unshift(
    ...(Array.from({ length: numbers.length }).fill("(") as string[])
  );

  const result = eval(formula.join(""));

  if (result === expectedResult) return true;
  if (level >= operators.length - 1) return false;
  operators[level] = "*";
  const res = findAnswer(numbers, expectedResult, operators, level + 1);

  if (res) return true;

  operators[level] = "+";
  return findAnswer(numbers, expectedResult, operators, level + 1);
};

const findAnswer2 = (numbers: number[], expectedResult: number): boolean => {
  if (numbers.length === 1) {
    return expectedResult === numbers[0];
  }

  if (numbers[0] > expectedResult) {
    return false;
  }
  for (const [idx, operation] of [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b,
    (a: number, b: number) => Number(`${a}(${b})`),
  ].entries()) {
    const newNumbers = [operation(numbers[0], numbers[1]), ...numbers.slice(2)];
    const newResult: boolean = findAnswer2(newNumbers, expectedResult);
    if (newResult != undefined) {
      return newResult;
    }

    return false;
  }

  return false;
};

for (const line of file) {
  const [expectedResult, input] = line.split(":");
  const numbers = input.split(" ").filter(Boolean).map(Number);
  const operators = Array.from({ length: numbers.length - 1 }).fill("+");
  operators.push("");
  const answer = findAnswer(
    numbers,
    Number(expectedResult),
    operators as string[],
    0
  );
  if (answer) {
    answer1 += Number(expectedResult);
    answer2 += Number(expectedResult);
  } else {
    const res = findAnswer2(numbers, Number(expectedResult));
    if (res) {
      answer2 += Number(expectedResult);
    }
  }
}

console.log(answer1);
