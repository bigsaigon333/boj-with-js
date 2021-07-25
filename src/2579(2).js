/* 2579번 계단 오르기
 * URL: https://www.acmicpc.net/problem/2579
 * Date: 2021-01-13 Wed 12:56:38
 * Comment: DP 필수예제 2.  Memoization을 활용하여 재귀 형태로 문제를 풀어봄
 */

const [N, ...num] = require("fs")
  .readFileSync(0, "utf8")
  .split("\n")
  .map(Number);

const dp = Array.from(Array(N), () => Array(2).fill(0));
dp[0] = [num[0], 0];
dp[1] = [num[0] + num[1], num[1]];

const rec = (i) => {
  if (i === 0) return [num[0], 0];
  if (i === 1) return [num[0] + num[1], num[1]];
  if (dp[i][0] && dp[i][1]) return dp[i];

  const prev1 = rec(i - 1);
  const prev2 = rec(i - 2);

  dp[i][0] = prev1[1] + num[i];
  dp[i][1] = Math.max(...prev2) + num[i];

  return dp[i];
};

console.log(Math.max(...rec(N - 1)));
