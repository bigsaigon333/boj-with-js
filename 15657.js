/* 15657번 N과 M(8)
 * URL: https://www.acmicpc.net/problem/15657
 * Date: 2021-01-08 Fri 19:06:21 4m 00s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (8).
 */

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, M] = input[0].split(" ").map((str) => Number(str));
const num = input[1]
  .split(" ")
  .map((str) => Number(str))
  .sort((a, b) => Number(a) - Number(b));

const answer = [];
const arr = Array(M).fill(-1);

(function rec(start, lev) {
  if (lev === M) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = start; i < N; i++) {
    arr[lev] = num[i];
    rec(i, lev + 1);
  }
})(0, 0);

console.log(answer.join("\n"));
