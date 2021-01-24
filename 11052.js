/* 11052번 카드 구매하기
 * URL: https://www.acmicpc.net/problem/11052
 * Date: 2021-01-24 Sun 22:27:02 16m 00s
 * Comment: DP 전형적인 문제
 */

let [N, P] = require("fs").readFileSync(0, "utf8").trim().split("\n");
N = Number(N);
P = [0, ...P.split(" ").map(Number)];

const dp = Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  dp[i] = P[i];
  for (let j = 1; j <= Math.floor(i / 2); j++) {
    dp[i] = Math.max(dp[i], dp[i - j] + dp[j]);
  }
}
console.log(dp[N]);
