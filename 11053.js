/* 11053번 가장 긴 증가하는 부분 수열
 * URL: https://www.acmicpc.net/problem/11053
 * Date: 2021-01-13 Wed 16:56:44 51m 26s
 * Comment: DP 필수예제 5. 점화식을 세우는게 제일 어렵다.
 * 왜 메모이제이션이 필요하게 되는지, dp 각 요소들은 무엇을 가리킬 지 잘 생각해보자
 */

const input = require("fs").readFileSync(0, "utf8").split("\n");
const N = Number(input[0]);
const num = input[1].split(" ").map(Number);

const dp = Array(N).fill(0);
dp[0] = 1;

for (let i = 1; i < N; i++) {
  dp[i] = 1;
  for (let j = 0; j < i; j++) {
    if (num[j] < num[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
console.log(Math.max(...dp));
