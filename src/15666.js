/* 15666번 N과 M(12)
 * URL: https://www.acmicpc.net/problem/15666
 * Date: 2021-01-08 Fri 23:18:05 7m 12s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (12). 어렵게 생각하지마. 같은 수를 여러번 사용할 수 있다면, 갯수는 중요하지 않다는 뜻.
 */

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map((str) => Number(str));
const num = Array.from(
  new Set(input[1].split(" ").map((str) => Number(str)))
).sort((a, b) => Number(a) - Number(b));

const answer = [];
const arr = Array(M).fill(-1);

(function rec(start, lev) {
  if (lev === M) {
    answer.push(arr.join(" "));
    return;
  }

  for (let i = start; i < num.length; i++) {
    arr[lev] = num[i];
    rec(i, lev + 1);
  }
})(0, 0);

console.log(answer.join("\n"));
