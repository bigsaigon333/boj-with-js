/* 11653번 소인수분해
 * URL: https://www.acmicpc.net/problem/11653
 * Date: 2021-01-15 ㄹ갸 14:46:21 11m 59s
 * Comment: 수학 필수예제1. 소수를 판정할 때는 [2, sqrt(N)] 으로 나누어 떨어지는지만 살피면 된다
 */

let N = Number(require("fs").readFileSync(0, "utf8").trim());

const divisors = [];

for (let i = 2; i * i <= N; i++) {
  while (N % i === 0) {
    divisors.push(i);
    N /= i;
  }
}
if (N !== 1) divisors.push(N);

console.log(divisors.join("\n"));
