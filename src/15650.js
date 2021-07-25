/* 15650번 N과 M(2)
 * URL: https://www.acmicpc.net/problem/15650
 * Date: 2021-01-08 Fri 10:39:35 7m 53s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (2).
 */

const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => Number(str));

const arr = Array(M).fill(-1);
const visited = Array(N).fill(false);
let print = "";

(function rec(start, lev) {
  if (lev === M) {
    print += `${arr.join(" ")}\n`;
    return;
  }

  for (let i = start; i <= N; i++) {
    if (visited[i]) continue;

    arr[lev] = i;
    visited[i] = true;
    rec(i + 1, lev + 1);
    visited[i] = false;
  }
})(1, 0);

console.log(print);
