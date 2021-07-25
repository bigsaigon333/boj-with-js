/* 15664번 N과 M(10)
 * URL: https://www.acmicpc.net/problem/15664
 * Date: 2021-01-08 Fri 22:46:16 14m 02s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (10). 중복된 요소를 어떻게 처리할 것인가?
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

  let prev = -1;
  for (let i = start; i < N; i++) {
    if (prev === num[i]) continue;

    arr[lev] = num[i];
    prev = num[i];
    rec(i + 1, lev + 1);
  }
})(0, 0);

console.log(answer.join("\n"));
