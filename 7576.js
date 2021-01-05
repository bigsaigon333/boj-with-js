/* Date: 2021-01-05 Tue 09:57:08 15m36s
 * URL: https://www.acmicpc.net/problem/7576
 * 유형: BFS
 * Comment: BFS 기초예제 3
 */

const { exit } = require("process");

const getLine = (() => {
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
  let index = 0;
  return () => input[index++];
})();

const [N, M] = getLine()
  .split(" ")
  .map((str) => Number(str));

const board = [];
for (let i = 0; i < M; i++) {
  board.push(
    getLine()
      .split(" ")
      .map((str) => Number(str))
  );
}

const dist = Array.from(Array(M), () => Array(N).fill(-1));
const q = [];
let head = 0;

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 1) {
      dist[i][j] = 0;
      q.push([i, j]);
    }
  }
}

let numTurn = 0;
while (head < q.length) {
  const [cx, cy] = q[head++];
  numTurn = dist[cx][cy];

  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const nx = cx + dx;
    const ny = cy + dy;

    if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
    if (dist[nx][ny] !== -1 || board[nx][ny] !== 0) continue;

    dist[nx][ny] = dist[cx][cy] + 1;
    q.push([nx, ny]);
  }
}

// console.table(board);
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (dist[i][j] === -1 && board[i][j] !== -1) {
      console.log(-1);
      exit(0);
    }
  }
}
console.log(numTurn);
