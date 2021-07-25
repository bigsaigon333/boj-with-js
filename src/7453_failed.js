/* 7453번 합이 0인 네 정수
 * URL: https://www.acmicpc.net/problem/7453
 * Date: 2021-01-25 Mon 23:50:21 more than an hour and half
 * Comment: 처음엔 이분 탐색으로 풀어야 하는지 조차 감을 잡지 못했다. 백트래킹으로는 절대 불가능하다는 것 정도만 생각할뿐.
 * 숫자들을 정렬할 수 있다면 이분 탐색을 적용할 수 있다는 점을 명심하자.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const [A, B, C, D] = [[], [], [], []];

for (let i = 0; i < N; i++) {
  const [a, b, c, d] = input[i + 1].split(" ").map(Number);
  A[i] = a;
  B[i] = b;
  C[i] = c;
  D[i] = d;
}

const sum = [];
const target = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    sum[i * N + j] = A[i] + B[j];
    target[i * N + j] = -(C[i] + D[j]);
  }
}
sum.sort((a, b) => a - b);
target.sort((a, b) => b - a);

let count = 0;
for (const t of target) {
  const upperBound = binarySearchRightSide(0, sum.length, t);
  if (upperBound === -1) return;

  const lowerBound = binarySearchLeftSide(0, sum.length, t);
  count += upperBound - lowerBound + 1;
}
console.log(count);

function binarySearchLeftSide(begin, end, target) {
  if (end - begin <= 3) {
    for (let i = begin; i < end; i++) {
      if (sum[i] === target) return i;
    }
    return -1;
  }

  const mid = Math.floor((begin + end) / 2);
  if (sum[mid] >= target) return binarySearchLeftSide(begin, mid + 1, target);
  else return binarySearchLeftSide(mid + 1, end, target);
}

function binarySearchRightSide(begin, end, target) {
  if (end - begin <= 3) {
    for (let i = end - 1; i >= begin; i--) {
      if (sum[i] === target) return i;
    }
    return -1;
  }

  const mid = Math.floor((begin + end) / 2);
  if (sum[mid] <= target) return binarySearchRightSide(mid, end, target);
  else return binarySearchRightSide(begin, mid, target);
}
