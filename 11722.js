/* 11722번  가장 긴 감소하는 부분 수열
 * https://www.acmicpc.net/problem/11722
 * 2020-02-01 Mon 22:39:27 40m 39s
 * Comment: DP 문제. 점화식을 어떻게 세우는지가 항상 관건
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const dp = Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = i - 1; j >= 0; j--) {
    if (A[j] > A[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
}

console.log(Math.max(...dp));
