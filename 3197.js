/* 3197번 labudovi
 * URL: https://www.acmicpc.net/problem/3197
 * Date: 2021-01-06 Wed 10:55:44 more than 2 hours
 * Comment: 4179번 불!과는 다르게, 2개의 BFS를 한 턴에 한번씩 수행해가며 턴을 진행해갔다.
 * 메모리 초과, 시간 초과를 피하기 위해서는 백조와 백조를 매번 처음부터 찾지 않고, 얼음에 부딪힌 곳을 다음 BFS의 시작점으로 하여야 한다. (중요!)
 * 참고URL: https://hsin.hr/2005/index.html
 * https://velog.io/@woga1999/BOJ-3197%EB%B2%88-%EB%B0%B1%EC%A1%B0%EC%9D%98-%ED%98%B8%EC%88%98C
 */

"use strict";

const { exit } = require("process");

const getLine = (() => {
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
  let index = 0;
  return () => input[index++];
})();

const [R, C] = getLine()
  .split(" ")
  .map((str) => Number(str));
const board = [];
for (let i = 0; i < R; i++) {
  board.push(getLine().split(""));
}

let tempIceQ = [];
let start = [];
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === "X") continue;
    if (board[i][j] === "L") start = [i, j];

    tempIceQ.push([i, j]);
  }
}

const visited = Array.from(Array(R), () => Array(C).fill(false));
let tempSwanQ = [];

tempSwanQ.push(start);
visited[start[0]][start[1]] = true;

for (let day = 0; true; day++) {
  const sq = [...tempSwanQ];
  tempSwanQ = [];
  let shead = 0;
  while (shead < sq.length) {
    const [cx, cy] = sq[shead++];

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (visited[nx][ny]) continue;

      // water
      if (board[nx][ny] === ".") {
        visited[nx][ny] = true;
        sq.push([nx, ny]);
      }
      // ice
      else if (board[nx][ny] === "X") {
        visited[nx][ny] = true;
        tempSwanQ.push([nx, ny]);
      }
      // swan
      else if (board[nx][ny] === "L") {
        console.log(day);
        exit(0);
      }
    }
  }

  const iq = [...tempIceQ];
  tempIceQ = [];
  let ihead = 0;
  while (ihead < iq.length) {
    const [cx, cy] = iq[ihead++];

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (board[nx][ny] === "." || board[nx][ny] === "L") continue;

      board[nx][ny] = ".";
      tempIceQ.push([nx, ny]);
    }
  }
  // console.table(board);
}
