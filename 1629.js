/* 1629번 곱셈
 * URL: https://www.acmicpc.net/problem/1629
 * Date: 2020-01-07 Thu 15:29:43 9m 48s
 * Comment: 재귀 필수예제1. 21억이 넘는 매우 큰 숫자를 어떻게 다룰지, 또한 O(21억)이 나오는 문제를 어떻게 줄일 것인지 고민하는 좋은 문제
 */

const [A, B, C] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => BigInt(str));

const answer = (function rec(a, b, c) {
  if (b === 1n) return a % c;

  const val = rec(a, b / 2n, c);

  if (b % 2n === 0n) return (val * val) % c;
  else return (((a * val) % c) * val) % c;
})(A % C, B, C);

console.log(Number(answer));
