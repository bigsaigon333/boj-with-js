/* 10844번 쉬운 계단 수
 * URL:
 * Date: 2021-01-18 Mon 21:38:22
 * Comment: DP 복습.  JavaScript에서 Number타입으로
 * -9,007,199,254,740,991 ~ 9,007,199,254,740,991 (-9e15 ~ 9e15) 의 정수를 표현할 수 있다.
 * (-9천조 ~ 9천조)
 */

const N = Number(require("fs").readFileSync(0, "utf8").trim());

const MOD = 1000000000;

let prev = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

for (let i = 2; i <= N; i++) {
  const curr = Array(10).fill(0);
  for (let j = 0; j < 10; j++) {
    if (j - 1 >= 0) curr[j] = prev[j - 1] % MOD;
    if (j + 1 < 10) curr[j] = (curr[j] + prev[j + 1]) % MOD;
  }

  prev = curr;
}

console.log(prev.reduce((acc, curr) => (acc + curr) % MOD, 0));
