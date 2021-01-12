/* 1431번 시리얼 번호
 * URL: https://www.acmicpc.net/problem/1431
 * Date: 2021-01-12 Tue 10:30:22 about 20 minutes
 * Comment: 내장되어 있는 sort함수를 잘 사용하자. ex) String.prototype.localeCompare
 */

const input = require("fs").readFileSync(0).toString().trim().split("\n");
const N = Number(input[0]);
const arr = input.slice(1);

arr.sort((a, b) => {
  if (a.length !== b.length) return a.length - b.length;

  const aDigitSum = sumDigit(a);
  const bDigitSum = sumDigit(b);
  if (aDigitSum !== bDigitSum) return aDigitSum - bDigitSum;

  return a.localeCompare(b);
});

console.log(arr.join("\n"));

function sumDigit(str) {
  return str.match(/[\d]/g)?.reduce((sum, curr) => sum + Number(curr), 0) || 0;
}
