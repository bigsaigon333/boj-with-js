/* 1799번 비숍
 * URL: https://www.acmicpc.net/problem/1799
 * Date: 2021-01-19 Tue 17:35:42 more than 1 hour 30 minutes
 * Comment: 백트래킹 N-Queen과 다르게 비숍은 대각선만으로만 움직인다.
 * 이를 표현하는 방법이 까다로웠다.
 * rui = n 과 rui = n+1 에 놓여지는 비숍은 서로 관여하지 않으므로,
 * 이를 분리하여서 계산하면 더욱 빨리 할 수 있다고 한다.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const board = input.slice(1).map((line) => line.split(" ").map(Number));

const rd = Array(2 * N - 2).fill(false);
let max = Number.MIN_SAFE_INTEGER;

rec(0, 0);
console.log(max);

function rec(rui, count) {
  if (rui === 2 * N - 1) {
    max = Math.max(max, count);
    return;
  }

  let unrechable = true;
  for (let rdi = N - 1 - rui; rdi <= N - 1 + rui; rdi += 2) {
    const i = (rui + rdi - (N - 1)) / 2;
    const j = (rui - rdi + (N - 1)) / 2;
    if (i < 0 || j < 0 || i >= N || j >= N) continue;
    if (rd[rdi] || board[i][j] === 0) continue;

    rd[rdi] = true;
    unrechable = false;
    rec(rui + 1, count + 1);
    rd[rdi] = false;
  }

  if (unrechable) rec(rui + 1, count);
}
