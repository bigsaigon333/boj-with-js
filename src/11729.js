/* 11729번 하노이 탑 이동 순서
 * URL: https://www.acmicpc.net/problem/11729
 * Date: 2021-01-07 Thu 16:25:26 10m 20s
 * Comment: 재귀 필수예제2. 귀납적 사고의 개념잡기에 딱 좋다.
 */

const N = Number(require("fs").readFileSync("/dev/stdin").toString());

let path = "";
let count = 0;
(function move(n, from, to) {
  if (n === 0) return;

  const temp = 6 - (from + to);

  move(n - 1, from, temp);

  count++;
  path += `${from} ${to}\n`;

  move(n - 1, temp, to);
})(N, 1, 3);

console.log(count);
console.log(path);
