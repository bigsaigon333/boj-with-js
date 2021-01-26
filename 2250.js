/* 2250번 트리의 높이와 너비
 * URL: https://www.acmicpc.net/problem/2250
 * Date: 2021--01-26 Tue 12:08:26 50m 09s
 * Comment: 전형적인 이진트리 문제. 문제를 꼼꼼하게 읽자. 사용하는 변수가 많아지니 너무 정신이 없다.
 * 필요한 변수를 필요한 위치 바로 위에서 정의하자.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const parent = Array(N + 1).fill(-1);
const lc = Array(N + 1).fill(-1);
const rc = Array(N + 1).fill(-1);

for (let i = 1; i <= N; i++) {
  const [p, l, r] = input[i].split(" ").map(Number);
  lc[p] = l;
  rc[p] = r;
  if (l !== -1) parent[l] = p;
  if (r !== -1) parent[r] = p;
}

let root;
for (let i = 1; i <= N; i++) {
  if (parent[i] === -1) {
    root = i;
    break;
  }
}
const depth = [0];
const q = [];
let head = 0;
depth[root] = 1;
q.push(root);

while (head < q.length) {
  const curr = q[head++];

  for (const child of [lc[curr], rc[curr]]) {
    if (child === -1) continue;

    depth[child] = depth[curr] + 1;
    q.push(child);
  }
}

const pos = [0];
let p = 0;
const inorder = (curr) => {
  if (lc[curr] !== -1) inorder(lc[curr]);
  pos[curr] = ++p;
  if (rc[curr] !== -1) inorder(rc[curr]);
};
inorder(root);

const LEN = Math.max(...depth);
const min = Array(LEN + 1).fill(Number.MAX_SAFE_INTEGER);
const max = Array(LEN + 1).fill(Number.MIN_SAFE_INTEGER);

depth.forEach((d, i) => {
  min[d] = Math.min(min[d], pos[i]);
  max[d] = Math.max(max[d], pos[i]);
});

let level = 0;
let answer = Number.MIN_SAFE_INTEGER;
for (let i = 1; i <= LEN; i++) {
  const d = max[i] - min[i] + 1;
  if (d > answer) {
    level = i;
    answer = d;
  }
}

console.log(`${level} ${answer}`);
