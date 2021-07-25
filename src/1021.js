const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");

const [N] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

// declaration
const dq = Array(3 * N + 5).fill(0);
dq.head = N;
dq.tail = N;

// operators
const findIndex = (dq, cb) => {
  for (let i = dq.head; i < dq.tail; i++) {
    if (cb(dq[i])) return i;
  }
};

const popFront = (dq) => dq[dq.head++];

const popBack = (dq) => dq[--dq.tail];

const pushFront = (dq, el) => (dq[--dq.head] = el);

const pushBack = (dq, el) => (dq[dq.tail++] = el);

const dir = (dq, i) =>
  i - dq.head <= dq.tail - i
    ? [pushBack, popFront, i - dq.head]
    : [pushFront, popBack, dq.tail - i];

// initialize
Array.from({ length: N }).forEach((_, i) => pushBack(dq, i + 1));

let count = 0;
nums.forEach((target) => {
  const i = findIndex(dq, (t) => t === target);

  const [push, pop, times] = dir(dq, i);

  count += times;

  for (let j = 0; j < times; j++) {
    push(dq, pop(dq));
  }

  popFront(dq);
});

console.log(count);
