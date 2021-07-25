/* 11050번 이항 계수 1
 * URL: https://www.acmicpc.net/problem/11050
 * Date: 2021-01-15 Fri 16:22:43 about 12 mins
 * Comment: 수학 필수예제 4.
 */

const [N, K] = require("fs")
  .readFileSync(0, "utf8")
  .trim()
  .split(" ")
  .map(Number);

let answer = 1;
for (let i = 1; i <= K; i++) {
  answer = (answer * (N - i + 1)) / i;
}

console.log(answer);
