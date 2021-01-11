/* 2751번 수 정렬하기 2
 * URL: https://blog.encrypted.gg/955?category=773649
 * Date: 2021-01-11 Mon 17:18:58 17m 02s
 * Comment: 정렬I 필수예제 2. 머지소트의 구현.
 */

const input = require("fs").readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1).map(Number);

(function mergeSort(begin, end) {
  if (end - begin === 1) return;

  const mid = Math.round((begin + end) / 2, 0);
  mergeSort(begin, mid);
  mergeSort(mid, end);
  merge(begin, mid, end);
})(0, N);
console.log(arr.join("\n"));

function merge(begin, mid, end) {
  let fi = begin;
  let li = mid;
  const sorted = Array(end - begin);
  for (let si = 0; si < end - begin; si++) {
    if (fi === mid) sorted[si] = arr[li++];
    else if (li === end) sorted[si] = arr[fi++];
    else if (arr[fi] <= arr[li]) sorted[si] = arr[fi++];
    else sorted[si] = arr[li++];
  }

  for (let i = 0; i < end - begin; i++) {
    arr[i + begin] = sorted[i];
  }
}
