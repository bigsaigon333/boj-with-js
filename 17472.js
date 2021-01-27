/* 17472번 다리 만들기 2
 * https://www.acmicpc.net/problem/17472
 * 2021-01-27 Wed 20:26:04 1h 32m
 * Comment: 최소 스패닝 트리, BFS, Heap 등 여러가지가 섞여있어서 상당히 골치아픈 문제였다
 */

"use strict";

const { exit } = require("process");

// Heapq
class Heapq {
  constructor(array, cmp = (a, b) => a - b) {
    this.heap = [null];
    this.cmp = cmp;

    if (array instanceof Array) {
      array.sort(cmp);
      this.heap.push(...array);
    }
  }

  toArray() {
    return this.heap.slice(1);
  }

  size() {
    return this.heap.length - 1;
  }

  parent(index) {
    return Math.floor(index / 2);
  }

  leftChild(index) {
    return index * 2;
  }

  rightChild(index) {
    return index * 2 + 1;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  insert(val) {
    this.heap.push(val);

    let child = this.heap.length - 1;
    let parent = this.parent(child);

    while (parent >= 1 && this.cmp(this.heap[parent], this.heap[child]) > 0) {
      this.swap(parent, child);

      [parent, child] = [this.parent(parent), parent];
    }
  }

  // if heap doesn't have any node(heap.length === 1), it returns undefined
  top() {
    return this.heap[1];
  }

  extractTop() {
    if (this.size() === 1) return this.heap.pop();

    let index = this.heap.length - 1;
    this.swap(1, index);
    const ret = this.heap.pop();

    this.heapify();

    return ret;
  }

  heapify() {
    if (this.size() === 1) return;

    let parent = 1;
    let leftChild = this.leftChild(parent);
    let rightChild = this.rightChild(parent);

    let minChild = leftChild;
    if (
      this.heap[rightChild] &&
      this.cmp(this.heap[rightChild], this.heap[leftChild]) < 0
    ) {
      minChild = rightChild;
    }

    while (this.cmp(this.heap[parent], this.heap[minChild]) > 0) {
      this.swap(parent, minChild);

      parent = minChild;
      leftChild = this.leftChild(parent);

      if (!this.heap[leftChild]) break;
      minChild = leftChild;
      rightChild = this.rightChild(parent);

      if (
        this.heap[rightChild] &&
        this.cmp(this.heap[rightChild], this.heap[leftChild]) < 0
      ) {
        minChild = rightChild;
      }
    }
  }
}

const input = require("fs")
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);

const board = input.slice(1).map((line) => line.split(" ").map(Number));

// 1. 그룹 나누기: Flood Fill - DFS
const visited1 = Array.from(Array(N), () => Array(M).fill(false));
let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 0 || visited1[i][j]) continue;

    count++;
    board[i][j] = count;
    visited1[i][j] = true;
    const s = [[i, j]];
    while (s.length > 0) {
      const [x, y] = s.pop();

      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
        if (board[nx][ny] === 0 || visited1[nx][ny]) continue;

        visited1[nx][ny] = true;
        board[nx][ny] = count;
        s.push([nx, ny]);
      }
    }
  }
}
// console.table(board);

// 2. 그룹 간 최소 거리 구하기- BFS  => 인접행렬 생성
const adj = Array.from(Array(count + 1), () => Array(count + 1).fill(-1));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 0) continue;

    const u = board[i][j];
    const dist = Array.from(Array(N), () => Array(M).fill(-1));
    const q = [];
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      q.push([i, j, dx, dy]);
    }
    let head = 0;
    while (head < q.length) {
      const [x, y, dx, dy] = q[head++];
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

      const v = board[nx][ny];
      if (v === u) continue;
      dist[nx][ny] = dist[x][y] + 1;

      if (v === 0) {
        q.push([nx, ny, dx, dy]);
        continue;
      }

      if (v && dist[nx][ny] >= 2) {
        if (adj[u][v] === -1) {
          adj[u][v] = dist[nx][ny];
          adj[v][u] = dist[nx][ny];
        } else {
          adj[u][v] = Math.min(adj[u][v], dist[nx][ny]);
          adj[v][u] = Math.min(adj[v][u], dist[nx][ny]);
        }
      }
    }
  }
}

// console.table(adj);

// 3. 최소 스피닝 트리 만들기 - Prim's algorithm
const visited2 = Array(count + 1).fill(false);
const heapq = new Heapq([], ([c1, u1, v1], [c2, u2, v2]) => c1 - c2);
let sum = 0;
let num = 0;
let u = 1;
visited2[u] = true;
while (num < count - 1) {
  for (let v = 1; v <= count; v++) {
    if (adj[u][v] === -1 || visited2[v]) continue;
    heapq.insert([adj[u][v], u, v]);
  }

  if (heapq.size() === 0) {
    console.log(-1);
    exit(0);
  }

  while (heapq.size() > 0) {
    const [cc, cu, cv] = heapq.extractTop();

    if (visited2[cv]) continue;

    visited2[cv] = true;
    sum += cc;
    num++;
    u = cv;
    break;
  }
}

console.log(sum);
