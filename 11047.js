/* 11047번 동전 0
 * URL:https://www.acmicpc.net/problem/11047
 * Date: 2021-01-14 Thu 10:34:33 6m 17s
 * Comment: 그리디 알고리즘 필수예제 1. 그리디 알고리즘이 성립한다는 걸 수학적으로 엄밀히 증명하고 문제를 풀어야 하나...
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
let [N, K] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number).reverse();

let count = 0;
for (const coin of coins) {
  if (coin > K) continue;
  if (K === 0) break;

  const quotient = Math.floor(K / coin, 0);
  count += quotient;
  K -= quotient * coin;
}

console.log(count);
