/* 1253번 좋다
 * https://www.acmicpc.net/problem/1253
 * Date: 2021-01-29 Fri 14:15:03 more than 1 hour and half
 * Comment: 이분 탐색. 이분 탐색의 기본은 정렬되어 있는 배열이다.
 * 어떤 배열을 이분탐색할지 잘 생각해야 한다.
 * left side binary search 와 right side binary search로 탐색하고자 하는 숫자의 갯수도 구할 수 있으나,
 * 탐색하고자 하는 숫자가 포함되어 있는지 여부를 O(logN)으로 할 수 있는게 이분탐색의 근본적인 의미이다.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const dict = new Map();
const A = input[1].split(" ").map((a) => {
  const num = Number(a);
  dict.set(num, (dict.get(num) || 0) + 1);
  return num;
});

const S = [];
for (let i = 0; i < N; i++) {
  if (A[i] === 0) continue;
  for (let j = i + 1; j < N; j++) {
    if (A[j] === 0) continue;
    S.push(A[i] + A[j]);
  }
}
S.sort((a, b) => a - b);

let count = 0;
for (const a of A) {
  if (binarySearch(0, S.length, a)) count++;
  else if (a === 0 && dict.get(0) >= 3) count++;
  else if (a !== 0 && dict.get(a) >= 2 && dict.get(0) >= 1) count++;
}
console.log(count);

function binarySearch(begin, end, target) {
  if (end - begin <= 3) {
    for (let i = end - 1; i >= begin; i--) {
      if (S[i] === target) return true;
    }
    return false;
  }

  const mid = Math.floor((begin + end) / 2);
  if (S[mid] <= target) return binarySearch(mid, end, target);
  return binarySearch(begin, mid, target);
}
