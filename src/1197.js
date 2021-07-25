/* 1197번 최소 스패닝 트리
 * URL: https://www.acmicpc.net/problem/1197
 * Date: 2021-01-27 Wed 10:20:46 52m 14s
 * Comment: 최소 신장 트리 필수예제 1. 크루스칼 알고리즘
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);
const edge = [];

for (let i = 1; i <= E; i++) {
  const [A, B, C] = input[i].split(" ").map(Number);
  edge.push([C, A, B]);
}

edge.sort(([c1], [c2]) => c1 - c2);

const parent = Array(V + 1)
  .fill(0)
  .map((_, idx) => idx);
const rank = Array(V + 1).fill(0);

const find = (u) => {
  if (u === parent[u]) return u;

  parent[u] = find(parent[u]);
  return parent[u];
};

const union = (u, v) => {
  let ru = find(u);
  let rv = find(v);

  if (ru === rv) return;

  if (rank[ru] < rank[rv]) [ru, rv] = [rv, ru];
  parent[rv] = ru;

  if (rank[ru] === rank[rv]) rank[ru]++;
};

let answer = 0;
for (let i = 0; i < edge.length; i++) {
  const [c, a, b] = edge[i];

  if (find(a) === find(b)) continue;

  union(a, b);
  answer += c;
}

console.log(answer);
