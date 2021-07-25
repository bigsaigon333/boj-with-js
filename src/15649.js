/* 15649번 N과 M(1)
 * URL: https://www.acmicpc.net/problem/15649
 * Date: 2021-01-08 Fri 09:53:32 7m 34s
 * Comment: 백트래킹 필수예제 1.
 */
const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => Number(str));

const arr = Array(M).fill("");
const visited = Array(N + 1).fill(false);
let print = "";

(function rec(lev) {
  if (lev === M) {
    print += `${arr.join(" ")}\n`;
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;

    arr[lev] = i;
    visited[i] = true;
    rec(lev + 1);
    visited[i] = false;
  }
})(0);

console.log(print);
