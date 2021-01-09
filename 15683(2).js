/* 15683번 감시
 * URL: https://www.acmicpc.net/problem/15683
 * Date: 2021 -01-09 Sat 19:05:14
 * Comments: 시뮬레이션 필수예제 1. 바킹독 모범답안을 보고 다시 풀어보다
 */

const getLine = (() => {
  const input = require("fs").readFileSync(0).toString().split("\n");
  let index = 0;

  return () => input[index++];
})();

const [N, M] = getLine()
  .split(" ")
  .map((str) => Number(str));

const board = [];
for (let i = 0; i < N; i++) {
  board.push(
    getLine()
      .split(" ")
      .map((str) => Number(str))
  );
}

const cameras = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if ([1, 2, 3, 4, 5].includes(board[i][j])) {
      cameras.push([i, j]);
    }
  }
}

let covered;
let minCount = Number.MAX_SAFE_INTEGER;
for (let tc = 0; tc < 4 ** cameras.length; tc++) {
  covered = JSON.parse(JSON.stringify(board));
  console.log(tc);

  let temp = tc;
  for (let k = 0; k < cameras.length; k++) {
    const [i, j] = cameras[k];
    const dir = temp % 4;
    if (board[i][j] === 1) {
      upd(i, j, dir);
    } else if (board[i][j] === 2) {
      upd(i, j, dir);
      upd(i, j, dir + 2);
    } else if (board[i][j] === 3) {
      upd(i, j, dir);
      upd(i, j, dir + 1);
    } else if (board[i][j] === 4) {
      upd(i, j, dir);
      upd(i, j, dir + 1);
      upd(i, j, dir + 2);
    } else if (board[i][j] === 5) {
      upd(i, j, dir);
      upd(i, j, dir + 1);
      upd(i, j, dir + 2);
      upd(i, j, dir + 3);
    }

    temp >>= 2;
  }

  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0 && covered[i][j] === 0) count++;
    }
  }
  minCount = Math.min(count, minCount);
}

console.log(minCount);

function upd(x, y, dir) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  dir %= 4;
  while (true) {
    x += dx[dir];
    y += dy[dir];

    if (x < 0 || y < 0 || x >= N || y >= M || covered[x][y] === 6) break;
    if (covered[x][y] !== 0) continue;

    covered[x][y] = 7;
  }
}
