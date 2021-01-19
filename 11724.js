/* 11724번 연결 요소의 개수
 * URL: https://www.acmicpc.net/problem/11724
 * Date: 2021-01-19 Tue 09:58:41
 * Comment: 그래프 필수예제 1.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const adj = Array.from(Array(N + 1), () => []);
for (let i = 1; i <= M; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

let count = 0;
const vis = Array(N + 1).fill(false);
const s = [];

for (let i = 1; i <= N; i++) {
  if (vis[i]) continue;
  vis[i] = true;
  count++;
  s.push(i);

  while (s.length > 0) {
    const curr = s.pop();

    for (const next of adj[curr]) {
      if (vis[next]) continue;
      vis[next] = true;
      s.push(next);
    }
  }
}

console.log(count);
