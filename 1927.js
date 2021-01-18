/* 1927번 최소 힙
 * URL: https://www.acmicpc.net/problem/1927
 * Date: 2021-01-18 Mon 10:33:42 24m 33s
 * Comment: 힙 필수예제 1. do-while을 안쓰게 하는 방법은 항상 있다!
 */

class Heap {
  constructor() {
    this.arr = Array(N + 1).fill(-1);
    this.size = 0;
  }

  insert(x) {
    this.arr[++this.size] = x;

    let ci = this.size;
    while (ci !== 1) {
      let pi = Math.floor(ci / 2, 0);
      if (this.arr[ci] < this.arr[pi]) {
        [this.arr[ci], this.arr[pi]] = [this.arr[pi], this.arr[ci]];
      }

      ci = pi;
    }
    // console.log(`insert ${x}: `, this.arr.slice(1, this.size + 1));
  }

  front() {
    return this.size === 0 ? 0 : this.arr[1];
  }

  delete() {
    if (this.size === 0) return;

    [this.arr[this.size], this.arr[1]] = [this.arr[1], this.arr[this.size]];
    this.size--;

    let pi = 1;
    while (pi * 2 <= this.size) {
      let lci = 2 * pi;
      let rci = 2 * pi + 1;
      let mci = rci > this.size || this.arr[lci] < this.arr[rci] ? lci : rci;

      if (this.arr[pi] <= this.arr[mci]) break;
      [this.arr[pi], this.arr[mci]] = [this.arr[mci], this.arr[pi]];

      pi = mci;
    }
    // console.log(`delete: `, this.arr.slice(1, this.size + 1));
  }
}

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const heap = new Heap();
const answer = [];

for (let t = 1; t <= N; t++) {
  const x = Number(input[t]);

  if (x === 0) {
    const min = heap.front();
    heap.delete();
    answer.push(min);
  } else {
    heap.insert(x);
  }
}

console.log(answer.join("\n"));
