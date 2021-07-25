/* 15663번 N과 M(9)
 * URL: https://www.acmicpc.net/problem/15663
 * Date: 2021-01-08 Fri 19:28:50 16m 30s
 * Comment: 백트래킹의 정석 N과 M 시리즈 (9). 중복된 요소를 어떻게 처리할 것인가?
 */

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map((str) => Number(str));

const dict = {};
input[1]
  .split(" ")
  .map((str) => Number(str))
  .forEach((n) => (dict[n] ? dict[n]++ : (dict[n] = 1)));

const num = Object.keys(dict).map((key) => Number(key));
const count = Object.keys(dict).map((key) => dict[key]);

const answer = [];
const arr = Array(M).fill(-1);

(function rec(lev) {
  if (lev === M) {
    answer.push(arr.join(" "));
    return;
  }
  for (let i = 0; i < num.length; i++) {
    if (count[i] === 0) continue;

    arr[lev] = num[i];
    count[i]--;
    rec(lev + 1);
    count[i]++;
  }
})(0);

console.log(answer.join("\n"));
