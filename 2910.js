/* 2910번 빈도 정렬
 * URL: https://www.acmicpc.net/problem/2910
 * Date: 2021-01-12 Tue 16:24:17 17m 55s
 * Comment: dictionary용으로는 Object보다 Map을.
 * Map은 삽입된 순서대로 저장된다는 것이 보장된다. (Object는 그러하지 않다)
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const [N, C] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const dict = new Map();
arr.forEach((num) => {
  const freq = dict.get(num) || 0;
  dict.set(num, freq + 1);
});

const sorted = [...dict]
  .sort(([key1, freq1], [key2, freq2]) => freq2 - freq1)
  .reduce((acc, [key, freq]) => [...acc, ...Array(freq).fill(key)], []);

console.log(sorted.join(" "));
