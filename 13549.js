/*
 * DATE: 2020-12-30 Wed more than 1hour
 * URL: https://www.acmicpc.net/problem/13549
 * Comment: 순간이동과 앞뒤 움직임의 weight가 같지 않다.
 * Javascript 자료구조의 단점에 매몰되지 말자.(Deque가 있다면 unshift를 통하여 더 간단하게 풀 수 있었을지도 모르겠다.)
 * queue의 shift는 O(N) 이므로 문제 해결 속도에 지대한 영향을 미친다.
 * 다만, 단순히 shift 때문에 시간초과가 나오는 경우는 경험적으로 보았을때 없었다.
 * tricky한 방법으로, `head 인덱스 사용` 과 while 문 조건으로 `q.length > head 사용`을 통하여
 * O(1)에 shift와 동일한 기능을 구현할 수 있다.
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

const expanded = expand(N, visited);
if (expanded.includes(K)) {
  console.log(0);
  exit(0);
}

q.push(...elements(expanded, 0));
// console.log(q);

while (q.length > head) {
  const [curr, time] = q[head++];

  for (const step of [1, -1]) {
    const next = curr + step;
    const ntime = time + 1;

    if (next < 0 || next > visited.length) continue;
    if (visited[next]) continue;

    const expandedNext = expand(next, visited);
    if (expandedNext.includes(K)) {
      console.log(ntime);
      exit(0);
    }
    q.push(...elements(expandedNext, ntime));
    // console.log(q);
  }
}

function expand(n, visited) {
  if (n === 0) return [0];

  const expanded = [];
  for (; n <= MAX; n *= 2) {
    if (visited[n]) continue;

    expanded.push(n);
    visited[n] = true;
  }

  return expanded;
}

function elements(unvisited, time) {
  return unvisited.map((position) => [position, time]);
}
