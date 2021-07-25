/* 1676번 팩토리얼 0의 개수
 * URL: https://www.acmicpc.net/problem/1676
 * Date: 2021-01-15 Fri 17:13:03 4m 39s
 * Comment: 수학 필수예제 6.
 */

const N = Number(require("fs").readFileSync(0, "utf8").trim());

let count = 0;
for (let i = 1; 5 ** i <= N; i++) {
  count += Math.floor(N / 5 ** i, 0);
}

console.log(count);
