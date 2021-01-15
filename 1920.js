/* 1920번 수 찾기
 * URL: https://www.acmicpc.net/problem/1920
 * Date: 2021-01-16 Sat 08:09:30 10m 15s
 * Comment: 이분 탐색 필수예제 1. 나는 재귀로 풀었지만, 반복문으로도 풀 수 있다.
 * [begin:end): begin 포함, end 미포함
 * [first:last]: first포함, last포함
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const A = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const M = Number(input[2]);

const answer = input[3]
  .split(" ")
  .map(Number)
  .map((target) => binarySearch(target, 0, N))
  .join("\n");

console.log(answer);

function binarySearch(target, begin, end) {
  if (end <= begin) return 0;

  const mid = Math.floor((begin + end) / 2, 0);
  if (target === A[mid]) return 1;
  else if (target < A[mid]) return binarySearch(target, begin, mid);
  else if (target > A[mid]) return binarySearch(target, mid + 1, end);
}
