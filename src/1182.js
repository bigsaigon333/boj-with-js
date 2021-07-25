/* 1182번 부분수열의 합
 * URL: https://www.acmicpc.net/problem/1182
 * Date: 2021-01-09 Sat 14:10:38 6m 13s
 * Comment: 백트래킹 필수예제 3.
 */

const input = require("fs").readFileSync(0).toString().split("\n");

const [N, S] = input[0].split(" ").map((str) => Number(str));
const num = input[1].split(" ").map((str) => Number(str));

let count = S === 0 ? -1 : 0;
(function rec(lev, sum) {
  if (lev === N) {
    if (sum === S) count++;
    return;
  }

  rec(lev + 1, sum + num[lev]);
  rec(lev + 1, sum);
})(0, 0);

console.log(count);
