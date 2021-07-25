/* 1181번 단어 정렬
 * URL: https://www.acmicpc.net/problem/1181
 * Date: 2021-01-12 Tue 13:58:03 2m 38s
 * Comment: 내장 sort 함수를 유용하게
 */

const input = require("fs").readFileSync(0).toString().trim().split("\n");

const arr = [...new Set(input.slice(1))].sort(
  (a, b) => a.length - b.length || a.localeCompare(b)
);

console.log(arr.join("\n"));
