/* 6118번 숨바꼭질
 * URL: https://www.acmicpc.net/problem/6118
 * Date: 2021-01-26 Tue 18:24:03 16m 58s
 * Comment: 그래프 이론 - BFS 기본문제
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const adj = Array.from(Array(N + 1), () => []);
const dist = Array(N + 1).fill(-1);

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const q = [1];
let head = 0;
dist[1] = 0;

while (head < q.length) {
  const curr = q[head++];

  for (const child of adj[curr]) {
    if (dist[child] >= 0) continue;

    dist[child] = dist[curr] + 1;
    q.push(child);
  }
}

const maxDist = Math.max(...dist);
const index = dist.findIndex((d) => d === maxDist);
const count = dist.filter((d) => d === maxDist).length;

console.log(`${index} ${maxDist} ${count}`);
