/* 2630번 색종이 만들기
 * URL: https://www.acmicpc.net/problem/2630
 * Date: 2021-01-18 Mon 21:09:44 25m 35s
 * Comment: 재귀 복습. 점화식을 어떻게 세울 것인가?
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const board = input.slice(1).map((line) => line.split(" ").map(Number));

const count = [0, 0]; // [0]: white [1]: blue

const rec = (x, y, n) => {
  if (n === 1) return board[x][y];

  const half = n / 2;
  const a1 = rec(x, y, half);
  const a2 = rec(x, y + half, half);
  const a3 = rec(x + half, y, half);
  const a4 = rec(x + half, y + half, half);

  // console.log(a1, a2, a3, a4);

  if (
    a1 !== null &&
    a2 !== null &&
    a3 !== null &&
    a4 !== null &&
    a1 === a2 &&
    a2 === a3 &&
    a3 === a4
  ) {
    return a1;
  }
  for (const a of [a1, a2, a3, a4]) {
    if (a === null) continue;
    count[a]++;
  }

  return null;
};

const ret = rec(0, 0, N);
if (ret !== null) count[ret]++;

// console.table(count);
console.log(count.join("\n"));
