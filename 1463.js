/* 1463번 1로 만들기:
 * URL: https://www.acmicpc.net/problem/1463
 * Date: 2021-01-13 Wed 10:13:00 15m 38s
 * Comment: DP 필수예제 1.
 * DP란 두 번 이상 반복 계산되는 부분 문제들의 답을 미리 저장하여 속도의 향상을 꾀하는 알고리즘 설계 기법
 */

const N = Number(require("fs").readFileSync(0, "utf8"));

const dp = Array(N + 1).fill(-1);
dp[1] = 0;

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;
  if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
}

console.log(dp[N]);
