/* 2003번 수들의 합 2
 * https://www.acmicpc.net/source/25749842
 * 2021-01-27 Wed 23:11:00
 * Comment: 이분 탐색의 문제집 속 문제임을 알고 접근해서 그런지, 어떻게든 이분 탐색으로 풀려고 노력하였는데 보이지 않았다.
 * 다른 유저의 답안을 참고하여 다시 풀어보았다. 이는 이분 탐색보다 두 포인터 라는 카테고리로 묶는게 타당해보인다.
 */

const [[N, M], A] = require("fs")
  .readFileSync(0, "utf8")
  .split("\n")
  .map((line) => line.split(" ").map(Number));

let count = 0;
let sum = 0;
let first = 0;
let last = 0;

while (last <= N) {
  if (sum <= M) sum += A[last++];
  else sum -= A[first++];

  if (sum === M) count++;
}

console.log(count);
