/*
 * Date: 2020-12-29 Tue 17:18:39  38m 38s
 * URL: https://www.acmicpc.net/problem/6593
 * Comment:BFS. 3차원의 입력을 처리하는 것이 조금 까다로웠다. 문제풀이 자체는 전형적인 BFS.
 */

const { exit } = require("process");

const getLine = (() => {
  const reversedInputArray = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .split("\n")
    .reverse();

  return () => reversedInputArray.pop();
})();

while (true) {
  const [L, R, C] = getLine()
    .split(" ")
    .map((str) => Number(str));
  // console.log(`L: ${L} R: ${R} C: ${C}`);

  if (L === 0 && R === 0 && C === 0) exit(0);

  const maze = Array(L)
    .fill(0)
    .map(() => Array(R).fill(0));
  let start = { x: 0, y: 0, z: 0 };
  let end = { x: 0, y: 0, z: 0 };

  for (let li = 0; li < L; li++) {
    for (let ri = 0; ri < R; ri++) {
      maze[li][ri] = getLine().split("");
      maze[li][ri].forEach((c, ci) => {
        if (c === "S") start = { x: li, y: ri, z: ci };
        else if (c === "E") end = { x: li, y: ri, z: ci };
      });
    }
    getLine();
  }

  // console.log(`start: ${JSON.stringify(start)}`);
  // console.log(`end: ${JSON.stringify(end)}`);
  // console.table(maze);

  const shortestEscapeTime = BFS({ maze, start, end, L, R, C });
  const answer =
    shortestEscapeTime === -1
      ? "Trapped!"
      : `Escaped in ${shortestEscapeTime} minute(s).`;

  console.log(answer);
}

function BFS({ maze, start, end, L, R, C }) {
  const ROCK = "#";
  const EMPTY = ".";

  const visited = Array(L)
    .fill(0)
    .map(() =>
      Array(R)
        .fill(0)
        .map(() => Array(C).fill(false))
    );
  const q = [];

  visited[start.x][start.y][start.z] = true;
  q.push({ ...start, time: 0 });

  const dx = [1, 0, 0, -1, 0, 0];
  const dy = [0, 1, 0, 0, -1, 0];
  const dz = [0, 0, 1, 0, 0, -1];

  while (q.length > 0) {
    const { x: cx, y: cy, z: cz, time: ctime } = q.shift();

    for (let i = 0; i < 6; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      const nz = cz + dz[i];
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
