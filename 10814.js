/* 10814번 나이순 정렬
 * URL: https://www.acmicpc.net/problem/10814
 * Date: 2021-01-19 Tue 18:21:57 10m 18s
 * Comment: 내장 정렬 함수를 잘 활용하자
 */

const answer = require("fs")
  .readFileSync(0, "utf8")
  .split("\n")
  .slice(1)
  .sort((s1, s2) => parseInt(s1, 10) - parseInt(s2, 10))
  .join("\n");

console.log(answer);
