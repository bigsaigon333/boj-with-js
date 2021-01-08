/* 15652번 N과 M(4)
 * URL: https://www.acmicpc.net/problem/15652
 * Date: 2021-01-08 Fri 16:59:04 4m 00s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (4).
 */

const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => Number(str));

const arr = Array(M).fill(-1);
const answer = [];

(function rec(start, lev) {
  if (lev === M) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = start; i <= N; i++) {
    arr[lev] = i;
    rec(i, lev + 1);
  }
})(1, 0);

console.log(answer.join("\n"));
