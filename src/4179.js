/* Date: 2021-01-05 Tue 13:17:35 solved with tips in 바킹독
 * URL: https://www.acmicpc.net/problem/4179
 * 유형: BFS
 * Comment: BFS 기초예제 4
 * 시작점이 `불`과 `지훈이` 두 종류가 있지만 지훈이의 이동은 불의 전파에 영향을 받지만
 * 불의 전파는 지훈이의 이동에 영향을 받지 않아서 불만 먼저 전파를 시키는게 가능하였다.
 * 그러나, 만약 불과 지훈이가 상호작용이 발생한다면, 어느 하나를 먼저 끝까지 전파시키는게 불가능하다.
 * 두 종류의 BFS에서 BFS를 돌 때 어느 하나가 독립적이지 않고 서로에게 영향을 준다면
 * 시간 순으로 A와 B를 동시에 진행시켜야 하며, 백트래킹 기법을 추가로 알고 있어야 해결이 가능하다.
 */

const { exit } = require("process");

const getLine = (() => {
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
  let index = 0;
  return () => input[index++];
})();

const [R, C] = getLine()
  .split(" ")
  .map((str) => Number(str));
const maze = [];

for (let i = 0; i < R; i++) {
  maze.push(getLine().split(""));
}

const fire = Array.from(Array(R), () => Array(C).fill(-1));
const dist = Array.from(Array(R), () => Array(C).fill(-1));

const fq = [];
const dq = [];

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (maze[i][j] === "J") {
      dist[i][j] = 0;
      dq.push([i, j]);
    } else if (maze[i][j] === "F") {
      fire[i][j] = 0;
      fq.push([i, j]);
    }
  }
}

let fhead = 0;
while (fhead < fq.length) {
  const [cx, cy] = fq[fhead++];

  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const nx = cx + dx;
    const ny = cy + dy;

    if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
    if (fire[nx][ny] >= 0 || maze[nx][ny] === "#") continue;

    fire[nx][ny] = fire[cx][cy] + 1;
    fq.push([nx, ny]);
  }
}
// console.table(fires);

let dhead = 0;
while (dhead < dq.length) {
  const [cx, cy] = dq[dhead++];

  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const nx = cx + dx;
    const ny = cy + dy;
    const ndist = dist[cx][cy] + 1;

    if (nx < 0 || ny < 0 || nx >= R || ny >= C) {
      // console.table(dist);
      console.log(ndist);
      exit(0);
    }
    if (dist[nx][ny] >= 0 || maze[nx][ny] === "#") continue;
    if (fire[nx][ny] >= 0 && ndist >= fire[nx][ny]) continue;

    dist[nx][ny] = ndist;
    dq.push([nx, ny]);
  }
}

console.log("IMPOSSIBLE");
