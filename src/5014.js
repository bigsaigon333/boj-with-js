/*
 * Date: 2020-12-29 Tue 11:07  27m 07s
 * URL: https://www.acmicpc.net/problem/5014
 * Comment: BFS
 * 처음에는 deque를 먼저 구현하지 않고 문제를 풀이한다.
 * (front_pop 은 Array의 shift 함수 사용)
 * 시간 초과가 발생하는 경우에는 deque를 별도로 구현한다.
 */

const { exit } = require("process");

const [f, s, g, u, d] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => Number(str));

// console.log(f, s, g, u, d);

if (s === g) {
  console.log(0);
} else if ((s > g && d === 0) || (s < g && u === 0)) {
  console.log("use the stairs");
} else {
  const visited = Array(f + 1).fill(false);
  const q = [];

  visited[s] = true;
  q.push([s, 0]);

  while (q.length > 0) {
    const [pos, count] = q.shift();
    if (pos === g) {
      console.log(count);
      exit(0);
    }

    for (const step of [u, -d]) {
      const nextPos = pos + step;

      if (nextPos <= 0 || nextPos > f) continue;
      if (visited[nextPos]) continue;

      visited[nextPos] = true;
      q.push([nextPos, count + 1]);
    }
  }

  console.log("use the stairs");
}
