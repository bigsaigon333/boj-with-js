/* Date: 2021-01-05 Tue 09:27:35 8m 33s
 * URL: https://www.acmicpc.net/problem/2178
 * 유형: BFS
 * Comment: BFS 기초예제 2
 */

const getLine = (() => {
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
  let index = 0;
  return () => input[index++];
})();

const [N, M] = getLine()
  .split(" ")
  .map((str) => Number(str));

const board = [];

for (let i = 0; i < N; i++) {
  board.push(getLine().split(""));
}

const dist = Array.from(Array(N), () => Array(M).fill(-1));
const q = [];
let head = 0;

q.push([0, 0]);
dist[0][0] = 1;

while (head < q.length) {
  const [cx, cy] = q[head++];

  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const nx = cx + dx;
    const ny = cy + dy;

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (dist[nx][ny] !== -1 || board[nx][ny] === "0") continue;

    dist[nx][ny] = dist[cx][cy] + 1;
    q.push([nx, ny]);
  }
}

console.log(dist[N - 1][M - 1]);
