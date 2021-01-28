/* 11780번 플로이드 2
 * https://www.acmicpc.net/problem/11780
 * 2021-01-28 Thu 11:51:31 25m 21s
 * Comment: 플로이드 알고리즘 필수예제 2. 경로 복원
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const M = Number(input[1]);

const dist = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
for (let i = 1; i <= N; i++) dist[i][i] = 0;

const nxt = Array.from(Array(N + 1), () => Array(N + 1).fill(-1));

for (let i = 2; i < input.length; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  dist[a][b] = Math.min(dist[a][b], c);
  nxt[a][b] = b;
}

for (let k = 1; k <= N; k++) {
  for (let start = 1; start <= N; start++) {
    for (let target = 1; target <= N; target++) {
      const ndist = dist[start][k] + dist[k][target];
      if (dist[start][target] > ndist) {
        dist[start][target] = ndist;
        nxt[start][target] = nxt[start][k];
      }
    }
  }
}

const answer = [];
for (let i = 1; i <= N; i++) {
  answer.push(
    dist[i]
      .slice(1)
      .join(" ")
      .replace(/Infinity/g, "0")
  );
}

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    const path = getPath(i, j);
    answer.push(`${path.length} ${path.join(" ")}`);
  }
}
console.log(answer.join("\n"));

function getPath(start, target) {
  if (start === target || nxt[start][target] === -1) return [];

  const path = [];
  let curr = start;

  while (curr !== target) {
    path.push(curr);
    curr = nxt[curr][target];
  }
  path.push(target);

  return path;
}
