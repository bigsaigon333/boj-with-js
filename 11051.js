/* 11051번 이항 계수 2
 * URL: https://www.acmicpc.net/problem/11051
 * Date: 2021-01-15 Fri
 * Comment: 수학 필수예제 5. 그냥 BigInt로 바로 풀어버림
 */
const [N, K] = require("fs")
  .readFileSync(0, "utf8")
  .trim()
  .split(" ")
  .map(BigInt);

let answer = 1n;
for (let i = 1n; i <= K; i++) {
  answer = (answer * (N - i + 1n)) / i;
}

console.log((answer % 10007n).toString());
