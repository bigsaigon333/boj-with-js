/* 2217번 rope
 * URL: https://www.acmicpc.net/problem/2217
 * Date: 2021-01-14 Thu 14:04:26 12m 07s
 * Comment: 그리디 알고리즘 필수예제 3. 생각의 흐름: brute force -> DP -> 그리디
 */

const input = require("fs").readFileSync(0, "utf8").split("\n");

const N = Number(input[0]);
const ropes = input
  .slice(1)
  .map(Number)
  .sort((a, b) => b - a);

let max = ropes[0];
for (let i = 2; i <= N; i++) {
  max = Math.max(max, ropes[i - 1] * i);
}
console.log(max);
