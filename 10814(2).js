/* 10814번 나이순 정렬
 * URL: https://www.acmicpc.net/problem/10814
 * Date: 2021-01-19 Tue 18:21:57 10m 18s
 * Comment: 카운팅 소트를 활용하여 문제를 풀어보다
 */

const MAX = 200;
const dict = Array.from(Array(MAX + 1), () => []);
require("fs")
  .readFileSync(0, "utf8")
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(" "))
  .forEach(([n, s]) => dict[Number(n)].push(s));

const answer = dict.reduce((acc, names, age) => {
  if (names.length === 0) return acc;
  else return acc + names.map((name) => `${age} ${name}\n`).join("");
}, "");
console.log(answer);
