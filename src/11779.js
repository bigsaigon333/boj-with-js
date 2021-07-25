/* 11779번 최소비용 구하기 2
 * https://www.acmicpc.net/problem/11779
 * 2021-01-29 Fri 10:27:06 19m 41s
 * Comment: 다익스트라 알고리즘 필수예제 2. 힙 구현을 퀵하게!
 */

const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const adj = Array.from(Array(N + 1), () => []);
const dist = Array(N + 1).fill(Infinity);
const pre = Array(N + 1);

for (let i = 2; i < M + 2; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  adj[a].push([b, c]);
}
const [start, target] = input[M + 2].split(" ").map(Number);
dist[start] = 0;

const hq = [];
heappush(hq, [start, 0]);
while (hq.length > 0) {
  const [curr, d] = heappop(hq);
  if (dist[curr] !== d) continue;

  for (const [next, cost] of adj[curr]) {
    if (dist[curr] + cost < dist[next]) {
      dist[next] = dist[curr] + cost;
      heappush(hq, [next, dist[next]]);
      pre[next] = curr;
    }
  }
}

const path = [];
let curr = target;
while (curr !== start) {
  path.push(curr);
  curr = pre[curr];
}
path.push(start);
path.reverse();

console.log(dist[target]);
console.log(path.length);
console.log(path.join(" "));

function heappush(q, val) {
  const child = q.push(val) - 1;
  bubbleUp(child);

  function bubbleUp(c) {
    if (c === 0) return;

    const p = Math.floor((c - 1) / 2);
    if (q[p][1] > q[c][1]) {
      [q[p], q[c]] = [q[c], q[p]];
      bubbleUp(p);
    }
  }
}

function heappop(q) {
  if (q.length === 1) return q.pop();

  const top = q[0];
  q[0] = q.pop();

  trickleDown(0);

  return top;

  function trickleDown(p) {
    const lc = p * 2 + 1;
    const rc = p * 2 + 2;

    if (lc >= q.length) return;

    const minc = rc >= q.length || q[lc][1] < q[rc][1] ? lc : rc;
    if (q[minc][1] < q[p][1]) {
      [q[minc], q[p]] = [q[p], q[minc]];
      trickleDown(minc);
    }
  }
}
