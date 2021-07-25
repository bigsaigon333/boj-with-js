/* 1912번 연속합
 * URL: https://www.acmicpc.net/problem/1912
 * Date: 2021-01-13 Wed 16:02:21 more than 1 hours
 * Comment: DP 필수예제 5. DP라는 걸 알고 풀어도 어렵다.. 점화식을 잘 세우는 것이 포인트
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const num = input[1].split(" ").map(Number);

const dp = Array(N).fill(0);
dp[0] = num[0];
for (let i = 1; i < N; i++) {
  dp[i] = Math.max(num[i], dp[i - 1] + num[i]);
}
console.log(Math.max(...dp));
