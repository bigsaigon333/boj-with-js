/* 1074번 Z
 * URL: https://www.acmicpc.net/problem/1074
 * Date: 2021-01-07 Thu 17:33:50 36m 19s
 * Comment: 필수예제 3. 너무 수학적으로 어렵거나 깔끔하게 풀려고 하지 않아도 된다. 직관적으로.
 * 재귀함수에서 반환하는 것이 꼭 한가지가 아니어도 된다. 아래와 같이 if 문에 따른 여러 분기에서 여러 다른 값을 반환할 수 있다
 */

const [N, R, C] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => Number(str));

const answer = (function rec(n, r, c) {
  if (n === 0) return 0;

  const half = Math.pow(2, n - 1);
  if (r < half && c < half) return rec(n - 1, r, c);
  if (r < half && c >= half) return half ** 2 + rec(n - 1, r, c - half);
  if (r >= half && c < half) return 2 * half ** 2 + rec(n - 1, r - half, c);
  if (r >= half && c >= half)
    return 3 * half ** 2 + rec(n - 1, r - half, c - half);
})(N, R, C);

console.log(answer);
