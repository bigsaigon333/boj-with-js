/* 9663번 N-Queen
 * URL: https://www.acmicpc.net/problem/9663
 * Date: 2021-01-09 Sat 10:14:45 32m 51s
 * Comment: 백트래킹 필수예제 2. 생각, 생각 생각
 */

const N = Number(require("fs").readFileSync("/dev/stdin").toString());

let count = 0;

const columns = Array(N).fill(false);
const diagonal1 = Array(2 * N - 1).fill(false);
const diagonal2 = Array(2 * N - 1).fill(false);

(function nqueen(lev) {
  if (lev === N) {
    count++;
    return;
  }

  const ri = lev;
  for (let ci = 0; ci < N; ci++) {
    if (columns[ci]) continue;

    const di1 = ri - ci + (N - 1);
    const di2 = ri + ci;
    if (diagonal1[di1]) continue;
    if (diagonal2[di2]) continue;

    columns[ci] = true;
    diagonal1[di1] = true;
    diagonal2[di2] = true;

    nqueen(ri + 1);

    columns[ci] = false;
    diagonal1[di1] = false;
    diagonal2[di2] = false;
  }
})(0);

console.log(count);
