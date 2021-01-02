/* Date: 2020-01-02 Sat More than 2 hours
 * URL: https://www.acmicpc.net/problem/13913
 * BFS
 * Comment: 경로 저장을 어떻게 할 것인지에 대한 고민이 컸다.
 * 처음에는 큐에 [위치, 시간, 경로] 를 저장하려고 하였다.
 * 경로를 배열 형식으로 저장하니 너무 많은 메모리를 차지하여 메모리 초과 오류가 발생하였다.
 * 결국 이전 위치를 저장하는 prev 배열을 둠으로써 해결하였지만,
 * 경로를 String 형식으로 저장하면 기존의 접근방식으로도 가능할 것 같다.
 */

const { exit } = require("process");

const [N, K] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((str) => Number(str));

const MAX = Math.max(N, K) * 2;
const visited = Array(MAX + 1).fill(false);
const q = [];
let head = 0;
const prev = Array(MAX + 1).fill(-1);

visited[N] = true;
q.push([N, 0]);

while (head < q.length) {
  const [curr, time] = q[head++];
  if (curr === K) {
    console.log(time);

    const path = [];
    for (let i = curr; i !== -1; i = prev[i]) {
      path.push(i);
    }
    path.reverse();
    console.log(path.join(" "));

    exit(0);
  }

  for (const step of [1, -1, curr]) {
    const next = curr + step;
    const ntime = time + 1;

    if (next < 0 || next > MAX) continue;
    if (visited[next]) continue;

    visited[next] = true;
    prev[next] = curr;

    q.push([next, ntime]);
  }
}
