/* 1786번 찾기
 * URL: https://www.acmicpc.net/problem/1786
 * Date: 2021-01-18 Mon 20:11:53 more than 1 hour 10 minutes
 * Comment: 문자열 필수예제1. KMP알고리즘.
 */

const [T, P] = require("fs").readFileSync(0, "utf8").split("\n");
const F = getFailure(P);

const pos = [];
let j = 0;
for (let i = 0; i < T.length; i++) {
  while (j > 0 && T[i] !== P[j]) j = F[j - 1];
  if (T[i] === P[j]) j++;

  if (j === P.length) {
    pos.push(i - j + 2);
    j = F[j - 1];
  }
}

console.log(pos.length);
console.log(pos.join(" "));

function getFailure(S) {
  const pi = Array(S.length).fill(0);

  let j = 0;
  for (let i = 1; i < S.length; i++) {
    while (j > 0 && S[i] !== S[j]) j = pi[j - 1];
    if (S[i] === S[j]) pi[i] = ++j;
  }

  return pi;
}
