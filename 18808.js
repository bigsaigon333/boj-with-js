/* 18808번 스티커 붙이기
 * URL: https://www.acmicpc.net/problem/18808
 * Date: 2021-01-09 Sat 22:05:35 44m 38s
 * Comment: 시뮬레이션 필수예제 2.
 */

const getLineNumbers = (() => {
  const input = require("fs").readFileSync(0).toString().split("\n");
  let index = 0;

  return () => input[index++].split(" ").map((str) => Number(str));
})();

const [N, M, K] = getLineNumbers();

const board = Array.from(Array(N), () => Array(M).fill(0));

for (let i = 0; i < K; i++) {
  const [R, C] = getLineNumbers();
  let sticker = [];
  for (let j = 0; j < R; j++) {
    sticker.push(getLineNumbers());
  }

  for (let rot = 0; rot < 4; rot++) {
    if (check(sticker)) break;
    sticker = rotate(sticker);
  }
}

let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j]) count++;
  }
}
console.log(count);

function check(sticker) {
  const R = sticker.length;
  const C = sticker[0].length;
  for (let i = 0; i <= N - R; i++) {
    for (let j = 0; j <= M - C; j++) {
      if (isFitted(i, j, sticker)) {
        cover(i, j, sticker);
        // console.table(sticker);
        // console.table(board);
        return true;
      }
    }
  }

  return false;
}

function isFitted(x, y, sticker) {
  const R = sticker.length;
  const C = sticker[0].length;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (sticker[i][j] && board[x + i][y + j]) return false;
    }
  }

  return true;
}

function cover(x, y, sticker) {
  const R = sticker.length;
  const C = sticker[0].length;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      board[x + i][y + j] = board[x + i][y + j] || sticker[i][j] ? 1 : 0;
    }
  }
}

function rotate(sticker) {
  const R = sticker.length;
  const C = sticker[0].length;
  const rotated = Array.from(Array(C), () => Array(R));

  for (let i = 0; i < C; i++) {
    for (let j = 0; j < R; j++) {
      const ni = R - 1 - j;
      const nj = i;
      rotated[i][j] = sticker[ni][nj];
    }
  }

  return rotated;
}
