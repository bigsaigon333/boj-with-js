/* 11728번 배열 합치기
 * URL: https://www.acmicpc.net/problem/11728
 * Date: 2021-01-11 Mon 16:38:33 07m 08s
 * Comment: 정렬I 필수예제 1번.
 */

const input = require("fs").readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

const sorted = Array(N + M);
let ai = 0;
let bi = 0;

for (let si = 0; si < sorted.length; si++) {
  if (ai === N) sorted[si] = B[bi++];
  else if (bi === M) sorted[si] = A[ai++];
  else if (A[ai] <= B[bi]) sorted[si] = A[ai++];
  else sorted[si] = B[bi++];
}

console.log(sorted.join(" "));
