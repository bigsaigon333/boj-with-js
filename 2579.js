/* 2579번 계단 오르기
 * URL: https://www.acmicpc.net/problem/2579
 * Date: 2021-01-13 Wed 10:35:38 16m 08s
 * Comment: DP 필수예제 2.
 */

const [N, ...num] = require("fs")
  .readFileSync(0, "utf8")
  .split("\n")
  .map(Number);

const dp = Array.from(Array(N), () => Array(2).fill(-1));
dp[0] = [num[0], 0];
dp[1] = [num[0] + num[1], num[1]];

for (let i = 2; i < N; i++) {
  dp[i][0] = dp[i - 1][1] + num[i];
  dp[i][1] = Math.max(...dp[i - 2]) + num[i];
}

console.log(Math.max(...dp[N - 1]));
