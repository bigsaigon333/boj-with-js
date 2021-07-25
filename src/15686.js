/* 15686번 치킨 배달
 * URL: https://www.acmicpc.net/problem/15686
 * Date: 2021-01-11 Mon 15:45:02 22m 12s
 * Comment: 시뮬레이션 필수예제 4. 생각한대로. 시간 복잡도 먼저 생각해본 후에 생각한대로.
 */

const input = require("fs").readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map((str) => Number(str));
const board = input
  .slice(1)
  .map((line) => line.split(" ").map((str) => Number(str)));

// console.log(N, M);
// console.table(board);

const houses = [];
const chickens = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 1) houses.push([i, j]);
    else if (board[i][j] === 2) chickens.push([i, j]);
  }
}

const dist = Array.from(Array(houses.length), () =>
  Array(chickens.length).fill(-1)
);

for (let h = 0; h < houses.length; h++) {
  for (let c = 0; c < chickens.length; c++) {
    dist[h][c] =
      Math.abs(houses[h][0] - chickens[c][0]) +
      Math.abs(houses[h][1] - chickens[c][1]);
  }
}

// console.table(dist);

const arr = Array(M).fill(-1);
let answer = Number.MAX_SAFE_INTEGER;
(function rec(start, lev) {
  if (lev === M) {
    answer = Math.min(answer, calc());
    // console.log(arr, answer);
    return;
  }

  for (let i = start; i < chickens.length; i++) {
    arr[lev] = i;
    rec(i + 1, lev + 1);
  }
})(0, 0);

console.log(answer);

function calc() {
  let sum = 0;
  for (let h = 0; h < houses.length; h++) {
    sum += Math.min(...dist[h].filter((c, index) => arr.includes(index)));
  }

  return sum;
}
