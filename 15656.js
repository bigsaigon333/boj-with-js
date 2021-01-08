/* 15656번 N과 M(7)
 * URL: https://www.acmicpc.net/problem/15656
 * Date: 2021-01-08 Fri 17:29:21 2m 34s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (7).
 */

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, M] = input[0].split(" ").map((str) => Number(str));
const num = input[1]
  .split(" ")
  .map((str) => Number(str))
  .sort((a, b) => Number(a) - Number(b));

const answer = [];
const arr = Array(M).fill(-1);

(function rec(lev) {
  if (lev === M) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    arr[lev] = num[i];
    rec(lev + 1);
  }
})(0);

console.log(answer.join("\n"));
