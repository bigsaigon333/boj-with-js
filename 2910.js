/* 2910번 빈도 정렬
 * URL: https://www.acmicpc.net/problem/2910
 * Date: 2021-01-12 Tue 16:24:17 17m 55s
 * Comment: dictionary용으로는 Object보다 Map을.
 */

const input = require("fs").readFileSync(0).toString().trim().split("\n");
const [N, C] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const dict = new Map();
arr.forEach((num, currIndex) => {
  const { freq, index } = dict.get(num) || { freq: 0, index: currIndex };
  dict.set(num, { freq: freq + 1, index });
});

const sorted = [...dict]
  .sort(
    (
      [key1, { freq: freq1, index: index1 }],
      [key2, { freq: freq2, index: index2 }]
    ) => freq2 - freq1 || index1 - index2
  )
  .map(([key, { freq }]) => Array(freq).fill(key))
  .flat();

console.log(sorted.join(" "));
