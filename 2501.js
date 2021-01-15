/* 2501번 약수 구하기
 * URL: https://www.acmicpc.net/problem/2501
 * Date: 2021-01-15 Fri 14:58:41 6m 54s
 * Comment: 수학 필수예제 2.
 */

const [N, K] = require("fs")
  .readFileSync(0, "utf8")
  .trim()
  .split(" ")
  .map(Number);

const divisors = [];

for (let i = 1; i * i <= N; i++) {
  if (N % i === 0) divisors.push(i);
}

for (let i = divisors.length - 1; i >= 0; i--) {
  if (divisors[i] ** 2 === N) continue;
  divisors.push(N / divisors[i]);
}

// console.log(divisors);
console.log(divisors.length < K ? 0 : divisors[K - 1]);
