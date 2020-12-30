/*
 * Date: 2020-12-29 Tue 17:18:39  38m 38s
 * URL: https://www.acmicpc.net/problem/6593
 * Comment:BFS. 3차원의 입력을 처리하는 것이 조금 까다로웠다. 문제풀이 자체는 전형적인 BFS.
 */
"use strict";
const getLine = (() => {
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
  let index = 0;

  return () => input[index++];
})();

while (true) {
  // Read Input
  const [L, R, C] = getLine()
    .split(" ")
    .map((str) => Number(str));
  // console.log(`L: ${L} R: ${R} C: ${C}`);

  if (L === 0 && R === 0 && C === 0) return;

  const maze = Array(L)
    .fill(0)
    .map(() => Array(R).fill(0));
  let start;

  for (let li = 0; li < L; li++) {
    for (let ri = 0; ri < R; ri++) {
      maze[li][ri] = getLine().split("");
      maze[li][ri].forEach((c, ci) => {
        if (c === "S") start = { x: li, y: ri, z: ci };
      });
    }
    getLine();
  }

  const shortest = BFS({ maze, start, L, R, C });
  const answer =
    shortest === -1 ? "Trapped!" : `Escaped in ${shortest} minute(s).`;

  console.log(answer);
}

function BFS({ maze, start, L, R, C }) {
  const ROCK = "#";

  const visited = Array.from(Array(L), () =>
    Array.from(Array(R), () => Array(C).fill(false))
  );
  const q = [];
  let head = 0;

  visited[start.x][start.y][start.z] = true;
  q.push({ ...start, time: 0 });

  const d = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  while (head < q.length) {
    const { x: cx, y: cy, z: cz, time: ctime } = q[head++];

    for (const [dx, dy, dz] of d) {
      const nx = cx + dx;
      const ny = cy + dy;
      const nz = cz + dz;
      const ntime = ctime + 1;

      if (nx < 0 || ny < 0 || nz < 0 || nx >= L || ny >= R || nz >= C) continue;
      if (visited[nx][ny][nz]) continue;
      if (maze[nx][ny][nz] === ROCK) continue;
      if (maze[nx][ny][nz] === "E") return ntime;

      visited[nx][ny][nz] = true;
      q.push({ x: nx, y: ny, z: nz, time: ntime });
    }
  }

  return -1;
}
