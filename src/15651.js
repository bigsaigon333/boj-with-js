/* 15651번 N과 M(3)
 * URL: https://www.acmicpc.net/problem/15651
 * Date: 2021-01-08 Fri 16:53:20 5m 37s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (3).
 */

const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => Number(str));

const answer = [];
const arr = Array(M).fill(-1);

(function rec(lev) {
  if (lev === M) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    arr[lev] = i;
    rec(lev + 1);
  }
})(0);

console.log(answer.join("\n"));
