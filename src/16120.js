/* 16120번 PPAP
 * URL: https://www.acmicpc.net/problem/16120
 * Date: 2021-01-25 Mon 22:14:20 more than 1 hour
 * Comment: 처음에는 문자열 관련 문제라고 착각했었다. 문제를 다 풀고 난 뒤에야 그리디로 분류되는 문제인 것을 깨달았다.
 * 처음에는 문제 그대로를 정규표현식을 이용하여 구현하였으나 시간 초과 또는 메모리 초과로 풀 수 없었다.
 * 내장함수를 알고 있다고 하더라도 이에 대한 깊은 지식(시간복잡도, 공간복잡도 등)을 가지고 있지 않으면
 * 의도치 않은 부분에서 시간 초과/메모리 초과가 발생할 수 있다.
 */

const { exit } = require("process");
const S = require("fs").readFileSync("/dev/stdin", "utf8").trim().split("");

const stack = [];

for (let i = 0; i < S.length; i++) {
  if (S[i] === "P") {
    stack.push(S[i]);
  } else if (stack.length >= 2 && S[i + 1] === "P") {
    stack.pop();
    stack.pop();
  } else {
    console.log("NP");
    exit(0);
  }
}

const answer = stack.join("") === "P" ? "PPAP" : "NP";
console.log(answer);
