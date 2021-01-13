/* 11726번 2×n 타일링
 * URL: https://www.acmicpc.net/problem/11726
 * Date: 2021-01-13 Wed 14:37:59 9m 00s
 * Comment: DP 필수예제 4. 재귀로 품. 대략 10,000번까지 호출되는 재귀는 괜찮은 것 같다.
 */

const N = Number(require("fs").readFileSync(0, "utf8"));
const dp = Array(N + 1).fill(0);

const MOD = 10007;
const rec = (n) => {
  if (n === 1) return 1;
  else if (n === 2) return 2;
  else if (dp[n]) return dp[n];

  dp[n] = (rec(n - 1) + rec(n - 2)) % MOD;
  return dp[n];
};

console.log(rec(N));
