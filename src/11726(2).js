/* 11726번 2×n 타일링
 * URL: https://www.acmicpc.net/problem/11726
 * Date: 2021-01-13 Wed 14:37:59 9m 00s
 * Comment: DP 필수예제 4. 재귀로 품. 반복적  DP 로 문제 해결
 */

const N = Number(require("fs").readFileSync(0, "utf8"));

const MOD = 10007;

const dp = Array(N + 1).fill(0);
dp[0] = 0;
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
}
console.log(dp[N]);
