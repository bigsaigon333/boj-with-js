/* 11727번 2xn 타일링 2
 * URL: https://www.acmicpc.net/problem/11727
 * Date: 2021-01-19 Tue 21:06:39 4m 59s
 * Comment: DP 기본문제
 */

const N = Number(require("fs").readFileSync(0, "utf8"));

const MOD = 10007;

const dp = Array(N + 1).fill(0);
dp[0] = 0;
dp[1] = 1;
dp[2] = 3;

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % MOD;
}

console.log(dp[N]);
