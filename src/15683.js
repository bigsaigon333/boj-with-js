/* 15683번 감시
 * URL: https://www.acmicpc.net/problem/15683
 * Date: 2021-01-09 Sat 15:33:59 55m 32s
 * Comments: 시뮬레이션 필수예제 1. 주어진 상황을 잘 구현하면 되지만, 얼마나 깔끔하게 구현하는지가 관건.
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
      cameras.push([i, j, board[i][j]]);
    }
  }
}

const covered = Array.from(Array(N), () => Array(M).fill(0));

const L = { x: 1, y: 0 };
const R = { x: -1, y: 0 };
const U = { x: 0, y: 1 };
const D = { x: 0, y: -1 };

let minCount = Number.MAX_SAFE_INTEGER;
(function rec(lev) {
  if (lev === cameras.length) {
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] > 0) continue;
        if (covered[i][j] === 0) count++;
      }
    }
    minCount = Math.min(count, minCount);
    // if (count < minCount) {
    //   // console.table(board);
    //   // console.table(covered);
    //   minCount = count;
    // }
    return;
  }

  const [cx, cy, category] = cameras[lev];

  if (category === 1) {
    // L: [-1,0]
    fillX([cx, cy], L.x, 1);
    rec(lev + 1);
    fillX([cx, cy], L.x, -1);

    // R: [1,0]
    fillX([cx, cy], R.x, 1);
    rec(lev + 1);
    fillX([cx, cy], R.x, -1);

    // U: [0,1]
    fillY([cx, cy], U.y, 1);
    rec(lev + 1);
    fillY([cx, cy], U.y, -1);

    // D: [0,-1]
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
    fillY([cx, cy], D.y, -1);
  } else if (category === 2) {
    // L: [-1,0], R: [1,0]
    fillX([cx, cy], L.x, 1);
    fillX([cx, cy], R.x, 1);
    rec(lev + 1);
    fillX([cx, cy], L.x, -1);
    fillX([cx, cy], R.x, -1);

    // U, D
    fillY([cx, cy], U.y, 1);
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
    fillY([cx, cy], U.y, -1);
    fillY([cx, cy], D.y, -1);
  } else if (category === 3) {
    // L: [-1,0], U: [0, 1]
    fillX([cx, cy], L.x, 1);
    fillY([cx, cy], U.y, 1);
    rec(lev + 1);
    fillX([cx, cy], L.x, -1);
    fillY([cx, cy], U.y, -1);

    // L: [-1,0], D: [0,-1]
    fillX([cx, cy], L.x, 1);
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
    fillX([cx, cy], L.x, -1);
    fillY([cx, cy], D.y, -1);

    // R: [1,0],  D: [0,-1]
    fillX([cx, cy], R.x, 1);
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
    fillX([cx, cy], R.x, -1);
    fillY([cx, cy], D.y, -1);

    // R: [1,0], U: [0,-1]
    fillX([cx, cy], R.x, 1);
    fillY([cx, cy], U.y, 1);
    rec(lev + 1);
    fillX([cx, cy], R.x, -1);
    fillY([cx, cy], U.y, -1);
  } else if (category === 4) {
    // L: [-1,0], R: [1,0], U: [0, 1]
    fillX([cx, cy], L.x, 1);
    fillX([cx, cy], R.x, 1);
    fillY([cx, cy], U.y, 1);
    rec(lev + 1);
    fillX([cx, cy], L.x, -1);
    fillX([cx, cy], R.x, -1);
    fillY([cx, cy], U.y, -1);

    // L: [-1,0], R: [1,0],  D: [0,-1]
    fillX([cx, cy], L.x, 1);
    fillX([cx, cy], R.x, 1);
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
    fillX([cx, cy], L.x, -1);
    fillX([cx, cy], R.x, -1);
    fillY([cx, cy], D.y, -1);

    // L: [-1,0], U: [0, 1], D: [0,-1]
    fillX([cx, cy], L.x, 1);
    fillY([cx, cy], U.y, 1);
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
    fillX([cx, cy], L.x, -1);
    fillY([cx, cy], U.y, -1);
    fillY([cx, cy], D.y, -1);

    // R: [1,0], U: [0, 1], D: [0,-1]
    fillX([cx, cy], R.x, 1);
    fillY([cx, cy], U.y, 1);
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
    fillX([cx, cy], R.x, -1);
    fillY([cx, cy], U.y, -1);
    fillY([cx, cy], D.y, -1);
  } else if (category === 5) {
    // L: [-1,0], R: [1,0], U: [0, 1], D: [0,-1]
    fillX([cx, cy], L.x, 1);
    fillX([cx, cy], R.x, 1);
    fillY([cx, cy], U.y, 1);
    fillY([cx, cy], D.y, 1);
    rec(lev + 1);
  }
})(0);

console.log(minCount);

function fillX([cx, cy], dx, sign) {
  for (let nx = cx + dx; nx >= 0 && nx < N; nx += dx) {
    if (board[nx][cy] === 6) break;

    covered[nx][cy] += sign;
  }
}

function fillY([cx, cy], dy, sign) {
  for (let ny = cy + dy; ny >= 0 && ny < M; ny += dy) {
    if (board[cx][ny] === 6) break;

    covered[cx][ny] += sign;
  }
}
