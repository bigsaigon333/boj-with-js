/* 12100번 2048(Easy)
 * URL: https://www.acmicpc.net/problem/12100
 * Date: 2021-01-11 Mon 14:29:51 more than 2hours
 * Comment: 시뮬레이션 필수예제 3. 간결하게 중복없이 코드를 짜는 것은 쉽지 않구나..
 * 항상 설계를 먼저 하고 구현을 한다. 작은 것부터 구현을 하여 큰 것으로 확장해 나간다.
 * 함수 호출은 항상 오버헤드가 큰 연산이라는 것을 잊지 말자
 * JSON.parse(JSON.stringify()) 를 통한 배열 deepcopy는 매우 헤비한 연산이다.
 */

const input = require("fs").readFileSync(0).toString().split("\n");

const N = Number(input[0]);
const board = input
  .slice(1)
  .map((line) => line.split(" ").map((str) => Number(str)));

const MAX = 5;
let answer = 0;
let board2;
for (let c = 0; c < 4 ** MAX; c++) {
  let temp = c;
  // board2 = JSON.parse(JSON.stringify(board));
  board2 = copy(board);
  for (let i = 0; i < MAX; i++) {
    const dir = temp % 4;
    tilt(dir);
    temp = parseInt(temp / 4, 0);
  }
  // console.table(board2);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      answer = Math.max(answer, board2[i][j]);
    }
  }
}

console.log(answer);

function copy(arr) {
  const retArr = Array.from(Array(N), () => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      retArr[i][j] = arr[i][j];
    }
  }

  return retArr;
}

function tilt(dir) {
  while (dir--) rotate();

  for (let i = 0; i < N; i++) {
    const temp = Array(N).fill(0);
    let ti = 0;
    for (let j = 0; j < N; j++) {
      if (board2[i][j] === 0) continue;

      if (temp[ti] === 0) temp[ti] = board2[i][j];
      else if (temp[ti] === board2[i][j]) temp[ti++] *= 2;
      else temp[++ti] = board2[i][j];
    }
    board2[i] = temp;
  }
}

function rotate() {
  // const temp = JSON.parse(JSON.stringify(board2));
  const temp = copy(board2);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      board2[i][j] = temp[N - 1 - j][i];
    }
  }
}
