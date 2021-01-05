/*
 * Date: 2020-01-05 Tue 00:07:02 20m 12s
 * URL: https://www.acmicpc.net/problem/3273
 * 카테고리: 배열
 * Comment: 무난하지만 무난하지 않은. 생각없이 풀면 시간 제한에 걸리는.
 * 배열의 value에 숫자를 넣지 않고, index에 숫자를 넣는다.
 */

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const MAX_N = 1000000;
const n = Number(input[0]);
const arr = Array(MAX_N + 1).fill(-1);
const x = Number(input[2]);

input[1].split(" ").forEach((str, index) => (arr[Number(str)] = index));

let count = 0;
for (let i = 1; i <= x; i++) {
  const j = x - i;
  if (arr[i] === -1 || arr[j] === -1) continue;
  if (arr[i] >= arr[j]) continue;

  count++;
}

console.log(count);
