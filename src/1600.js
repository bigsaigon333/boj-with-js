/* 1600번 말이 되고픈 원숭이
 * URL: https://www.acmicpc.net/problem/1600
 * Date: 2021-01-06 Wed 09:20:06 more than 45 minutes
 * 유형: BFS
 * Comment: 어떤 지점에 말 이동을 해서 더 빨리 갈 수 있다고 해서, 그 이후로도 그게 항상 최적일까요?
 */

const getLine = (() => {
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
  let index = 0;

  return () => input[index++];
})();

const K = Number(getLine());
const [H, W] = getLine()
  .split(" ")
  .map((str) => Number(str));

const board = [];
for (let i = 0; i < W; i++) {
  board.push(
    getLine()
      .split(" ")
      .map((str) => Number(str))
  );
}

const dist = Array.from(Array(W), () =>
  Array.from(Array(H), () => Array(K).fill(-1))
);
const q = [];

q.push([0, 0, 0]);
dist[0][0][0] = 0;

let answer = -1;
let head = 0;
while (head < q.length) {
  const [cx, cy, ck] = q[head++];
  if (cx === W - 1 && cy === H - 1) {
    answer = dist[cx][cy][ck];
    break;
  }

  for (const [dx, dy, dk] of [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [-2, 1, 1],
    [-2, -1, 1],
    [2, 1, 1],
    [2, -1, 1],
    [1, 2, 1],
    [1, -2, 1],
    [-1, 2, 1],
    [-1, -2, 1],
  ]) {
    const nx = cx + dx;
    const ny = cy + dy;
    const nk = ck + dk;

    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
    if (nk > K) continue;
    if (dist[nx][ny][nk] >= 0 || board[nx][ny] === 1) continue;

    dist[nx][ny][nk] = dist[cx][cy][ck] + 1;
    q.push([nx, ny, nk]);
  }
}

console.log(answer);
