/* 15654번 N과 M(5)
 * URL: https://www.acmicpc.net/problem/15654
 * Date: 2021-01-08 Fri 17:08:47 7m 30s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (5).
 */

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, M] = input[0].split(" ").map((str) => Number(str));
const num = input[1]
  .split(" ")
  .map((str) => Number(str))
  .sort((a, b) => Number(a) - Number(b));

const answer = [];
const isused = Array(M).fill(false);
const arr = Array(M).fill(-1);

(function rec(lev) {
  if (lev === M) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (isused[i]) continue;

    arr[lev] = num[i];
    isused[i] = true;
    rec(lev + 1);
    isused[i] = false;
  }
})(0);

console.log(answer.join("\n"));
