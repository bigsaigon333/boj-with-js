/* 1149번 RGB거리
 * URL: https://www.acmicpc.net/problem/1149
 * Date: 2021-01-13 Wed 13:16:35 11m 03s
 * Comment: DP 필수예제 3. N의 범위가 1000이하로 크지 않으므로 재귀로도 풀 수 있다.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const cost = input.slice(1).map((line) => line.split(" ").map(Number));

const rec = (i) => {
  if (i === 0) return cost[0];

  const [pr, pg, pb] = rec(i - 1);
  const r = cost[i][0] + Math.min(pg, pb);
  const g = cost[i][1] + Math.min(pb, pr);
  const b = cost[i][2] + Math.min(pr, pg);

  return [r, g, b];
};

console.log(Math.min(...rec(N - 1)));
