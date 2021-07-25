/* 6064번 카잉 달력
 * URL: https://www.acmicpc.net/problem/6064
 * Date: 2021-01-15 Fri 15:48:29 31m 03s
 * Comment: 수학 필수예제 3. k % M = x, k % N = y 인 k를 구하라!
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const T = Number(input[0]);

const answer = [];
for (let t = 1; t <= T; t++) {
  const [M, N, x, y] = input[t].split(" ").map(Number);
  answer.push(solve(M, N, x, y));
}
console.log(answer.join("\n"));

function solve(M, N, x, y) {
  const GCD = gcd(M, N);
  const LCM = (M * N) / GCD;

  for (let i = 0; i * M < LCM; i++) {
    const k = x + i * M;
    if (k % N === y % N) return k;
  }

  return -1;
}

function gcd(a, b) {
  if (b === 0) return a;

  return gcd(b, a % b);
}
