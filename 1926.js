/* Date: 2020-01-04 Mon 20:53:37
 * URL: https://www.acmicpc.net/problem/1926
 * BFS
 * Comment: 바킹독 [실전 알고리즘] 0x09강 - BFS 예제문제.
 * 가장 기초적이고 가장 전형적인 BFS문제
 */
"use strict";

const getLine = (() => {
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
  let index = 0;
  return () => input[index++];
})();

const [n, m] = getLine()
  .split(" ")
  .map((str) => Number(str));

const board = [];
for (let i = 0; i < n; i++) {
  board.push(
    getLine()
      .split(" ")
      .map((str) => Number(str))
  );
}
// console.table(board);

const visited = Array.from(Array(n), () => Array(m).fill(false));
const q = [];
let head = 0;

let maxArea = 0;
let count = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (visited[i][j]) continue;
    if (board[i][j] === 0) continue;

    q.push([i, j]);
    visited[i][j] = true;
    count++;

    let area = 0;
    while (head < q.length) {
      const [cx, cy] = q[head++];
      area++;

      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
        if (visited[nx][ny] || board[nx][ny] === 0) continue;

        visited[nx][ny] = true;
        q.push([nx, ny]);
      }
    }

    maxArea = Math.max(area, maxArea);
  }
}

console.log(count);
console.log(maxArea);
