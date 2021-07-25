/* 1149번 RGB거리
 * URL: https://www.acmicpc.net/problem/1149
 * Date: 2021-01-13 Wed 13:16:35 11m 03s
 * Comment: DP 필수예제 3.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const cost = input.slice(1).map((line) => line.split(" ").map(Number));

const dp = Array.from(Array(N + 1), () => Array(3).fill(0));
dp[0] = cost[0];

const RED = 0;
const GREEN = 1;
const BLUE = 2;
for (let i = 1; i < N; i++) {
  dp[i][RED] = Math.min(dp[i - 1][GREEN], dp[i - 1][BLUE]) + cost[i][RED];
  dp[i][GREEN] = Math.min(dp[i - 1][BLUE], dp[i - 1][RED]) + cost[i][GREEN];
  dp[i][BLUE] = Math.min(dp[i - 1][RED], dp[i - 1][GREEN]) + cost[i][BLUE];
}

console.log(Math.min(...dp[N - 1]));
