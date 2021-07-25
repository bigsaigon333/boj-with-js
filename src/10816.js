/* 10816번 숫자 카드 2
 * URL: https://www.acmicpc.net/problem/10816
 * Date: 2021-01-16 Sat 09:19:25 48m 53s
 * Comment: 이분 탐색 필수예제 2. 어느 정도 범위가 좁혀지면 (예를 들어 [begin, end) 가 3 이하 일 때)  for문으로 하는게
 * 예외를 고려하지 않아도 되어서 깔끔할 수 있다.
 *
 * Map을 이용한 Dictionary 구현으로도 풀 수 있다
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const num = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const M = Number(input[2]);
const target = input[3].split(" ").map(Number);

const answer = target
  .map((target) => {
    const rightIndex = binarySearchRightSide(target, 0, N);

    if (rightIndex === -1) return 0;

    const leftIndex = binarySearchLeftSide(target, 0, N);
    return rightIndex - leftIndex + 1;
  })
  .join(" ");

console.log(answer);

function binarySearchRightSide(target, begin, end) {
  if (end <= begin + 3) {
    for (let i = end - 1; i >= begin; i--) {
      if (num[i] === target) return i;
    }
    return -1;
  }

  const mid = Math.floor((begin + end) / 2, 0);
  if (num[mid] <= target) return binarySearchRightSide(target, mid, end);
  return binarySearchRightSide(target, begin, mid);
}

function binarySearchLeftSide(target, begin, end) {
  if (end <= begin + 3) {
    for (let i = begin; i < end; i++) {
      if (num[i] === target) return i;
    }
    return -1;
  }

  const mid = Math.floor((begin + end) / 2, 0);
  if (num[mid] < target) return binarySearchLeftSide(target, mid + 1, end);
  return binarySearchLeftSide(target, begin, mid + 1);
}
