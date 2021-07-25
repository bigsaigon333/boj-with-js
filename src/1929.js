/* 1929번 소수 구하기
 * URL: https://www.acmicpc.net/problem/1929
 * Date: 2021-01-26 Tue 12:24:23 7m 22s
 * Comment: 에라토스테네스의 체! 응용도 놓치지 말고.
 */

const [M, N] = require("fs").readFileSync(0, "utf8").split(" ").map(Number);

const sieve = Array(N + 1).fill(true);
sieve[0] = false;
sieve[1] = false;

for (let i = 2; i * i <= N; i++) {
  if (!sieve[i]) continue;
  for (let j = i * i; j <= N; j += i) {
    sieve[j] = false;
  }
}

const prime = [];
for (let i = M; i <= N; i++) {
  if (sieve[i]) prime.push(i);
}

console.log(prime.join("\n"));
