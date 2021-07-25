/* 11051번 이항 계수 2
 * URL: https://www.acmicpc.net/problem/11051
 * Date: 2021-01-15 Fri
 * Comment: 수학 필수예제 5. BigInt를 못푼다고 가정하고, 동적계획법으로 품
 */

const [N, K] = require("fs")
  .readFileSync(0, "utf8")
  .trim()
  .split(" ")
  .map(Number);

const dp = Array.from(Array(N + 1), () => Array(K + 1).fill(0));

for (let i = 1; i <= N; i++) {
  dp[i][0] = 1;
  dp[i][1] = i;
}

const MOD = 10007;
for (let i = 2; i <= N; i++) {
  for (let j = 2; j <= Math.min(K, i); j++) {
    dp[i][j] = (dp[i - 1][j] + dp[i - 1][j - 1]) % MOD;
  }
}
console.log(dp[N][K]);
