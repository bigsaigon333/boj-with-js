/* 1753번 최단경로
 * https://www.acmicpc.net/problem/1753
 * 2021-01-28 Thu 22:14:32
 * 다익스트라 알고리즘 필수예제 1.
 * 다익스트라 알고리즘 구현보다 heapq  구현이 더 빡세다...
 * 기존에 작성한 Heapq 클래스를 그대로 사용함
 */

class Heapq {
  constructor(array, cmp = (a, b) => a - b) {
    this.heap = [null];
    this.cmp = cmp;

    if (array instanceof Array) {
      array.sort(cmp);
      this.heap.push(...array);
    }
  }

  convertToArray() {
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

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const [V, E] = input[0].split(" ").map(Number);
const K = Number(input[1]);

const adj = Array.from(Array(V + 1), () => []);
const dict = new Map();
for (let i = 2; i < input.length; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  const key = `${u}:${v}`;
  const val = Math.min(dict.get(key) || Infinity, w);
  dict.set(key, val);
}

for (const [str, w] of Array.from(dict)) {
  const [u, v] = str.split(":").map(Number);
  adj[u].push([w, v]);
}

const dist = Array(V + 1).fill(Infinity);
dist[K] = 0;

let hq = new Heapq([[0, K]], (a, b) => a[0] - b[0]);

while (hq.size() > 0) {
  const [d, curr] = hq.extractTop();
  if (dist[curr] !== d) continue;

  for (const [w, next] of adj[curr]) {
    if (dist[next] > dist[curr] + w) {
      dist[next] = dist[curr] + w;
      hq.insert([dist[next], next]);
    }
  }
}

console.log(
  dist
    .slice(1)
    .join("\n")
    .replace(/Infinity/g, "INF")
);
