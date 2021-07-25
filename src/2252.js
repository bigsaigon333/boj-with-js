/* 2252번 줄 세우기
 * URL: https://www.acmicpc.net/problem/2252
 * Date: 2021-01-26 Tue 18:06:19 7m 56s
 * Comment: 위상정렬 필수예제1.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const adj = Array.from(Array(N + 1), () => []);
const ind = Array(N + 1).fill(0);

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  adj[a].push(b);
  ind[b]++;
}

const q = [];
for (let i = 1; i <= N; i++) {
  if (ind[i] === 0) q.push(i);
}

const answer = [];
let head = 0;
while (head < q.length) {
  const curr = q[head++];
  answer.push(curr);

  for (const child of adj[curr]) {
    ind[child]--;
    if (ind[child] === 0) q.push(child);
  }
}

console.log(answer.join(" "));
