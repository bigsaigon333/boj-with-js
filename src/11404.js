/* 11404번 플로이드
 * https://www.acmicpc.net/problem/11404
 * Date: 2021-01-28 Thu 10:29:59 20m 29s
 * Comment: 플로이드 알고리즘 필수예제 1.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const dist = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
for (let i = 1; i <= N; i++) {
  dist[i][i] = 0;
}

for (let i = 2; i < input.length; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  dist[a][b] = Math.min(dist[a][b], c);
}

for (let k = 1; k <= N; k++) {
  for (let start = 1; start <= N; start++) {
    for (let target = 1; target <= N; target++) {
      dist[start][target] = Math.min(
        dist[start][target],
        dist[start][k] + dist[k][target]
      );
    }
  }
}

for (let i = 1; i <= N; i++) {
  console.log(
    dist[i]
      .slice(1)
      .join(" ")
      .replace(/Infinity/g, "0")
  );
}
