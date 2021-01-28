/* 1753번 최단경로
 * https://www.acmicpc.net/problem/1753
 * 2021-01-28 Thu 22:14:32
 * 다익스트라 알고리즘 필수예제 1.
 * 다익스트라 알고리즘 구현보다 heapq  구현이 더 빡세다...
 * oython의 heapq 모듈과 비슷하게 함수형으로 heapq 구현해보다.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const [V, E] = input[0].split(" ").map(Number);
const K = Number(input[1]);

const adj = Array.from(Array(V + 1), () => []);
for (let i = 2; i < input.length; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  adj[u].push([w, v]);
}

const dist = Array(V + 1).fill(Infinity);
dist[K] = 0;

let hq = [];
heappush(hq, [0, K]);

while (hq.length > 0) {
  const [d, curr] = heappop(hq);
  if (dist[curr] !== d) continue;

  for (const [w, next] of adj[curr]) {
    if (dist[curr] + w < dist[next]) {
      dist[next] = dist[curr] + w;
      heappush(hq, [dist[next], next]);
    }
  }
}

console.log(
  dist
    .slice(1)
    .join("\n")
    .replace(/Infinity/g, "INF")
);

function heappush(q, val) {
  bubbleUp(q.push(val) - 1);

  function bubbleUp(c) {
    if (c === 0) return;
    let p = Math.floor((c - 1) / 2);
    if (q[p][0] > q[c][0]) {
      [q[p], q[c]] = [q[c], q[p]];
      bubbleUp(p);
    }
  }
}

function heappop(q) {
  if (q.length === 0) throw Error("heapq is empty");
  if (q.length === 1) return q.pop();

  const top = q[0];
  q[0] = q.pop();

  trickleDown(0);
  return top;

  function trickleDown(p) {
    if (p * 2 + 1 >= q.length) return;

    const lc = p * 2 + 1;
    const rc = p * 2 + 2;
    const minc = rc >= q.length || q[lc][0] < q[rc][0] ? lc : rc;
    if (q[minc][0] < q[p][0]) {
      [q[minc], q[p]] = [q[p], q[minc]];
      trickleDown(minc);
    }
  }
}
