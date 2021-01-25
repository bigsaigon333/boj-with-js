/* 1991번 트리 순회
 * URL: https://www.acmicpc.net/problem/1991
 * Date: 2021-01-25 Mon 12:55:20 17m 54s
 * Comment: 트리 필수예제1. 기초 중의 기초. 기분 중의 기본
 */

let [N, ...nodes] = require("fs").readFileSync(0, "utf8").trim().split("\n");
N = Number(N);
const lc = Array(N + 1).fill(0);
const rc = Array(N + 1).fill(0);

nodes.forEach((line) => {
  const [cur, left, right] = line.split(" ").map(chrToIdx);
  lc[cur] = left;
  rc[cur] = right;
});

console.log(preorder(1).map(idxToChr).join(""));
console.log(inorder(1).map(idxToChr).join(""));
console.log(postorder(1).map(idxToChr).join(""));

function chrToIdx(ch) {
  return ch === "." ? 0 : ch.charCodeAt(0) - "A".charCodeAt(0) + 1;
}

function idxToChr(idx) {
  return String.fromCharCode(idx + "A".charCodeAt(0) - 1);
}

function preorder(cur, path = []) {
  path.push(cur);
  if (lc[cur]) path.push(...preorder(lc[cur]));
  if (rc[cur]) path.push(...preorder(rc[cur]));

  return path;
}

function inorder(cur, path = []) {
  if (lc[cur]) path.push(...inorder(lc[cur]));
  path.push(cur);
  if (rc[cur]) path.push(...inorder(rc[cur]));

  return path;
}

function postorder(cur, path = []) {
  if (lc[cur]) path.push(...postorder(lc[cur]));
  if (rc[cur]) path.push(...postorder(rc[cur]));
  path.push(cur);

  return path;
}
