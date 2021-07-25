const [, ...orders] = require("fs").readFileSync(0, "utf-8").trim().split("\n");

const q = [];

let head = 0;

const ans = orders
  .map((order) => order.split(" "))
  .map(([c, x]) => {
    // push X: 정수 X를 큐에 넣는 연산이다.
    if (c === "push") {
      q.push(Number(x));

      return undefined;
    }

    // pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
    if (c === "pop") {
      return q.length - head > 0 ? q[head++] : -1;
    }

    // size: 큐에 들어있는 정수의 개수를 출력한다.
    if (c === "size") {
      return q.length - head;
    }

    // empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
    if (c === "empty") {
      return q.length - head === 0 ? 1 : 0;
    }

    // front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
    if (c === "front") {
      return q.length - head > 0 ? q[head] : -1;
    }

    // back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
    if (c === "back") {
      return q.length - head > 0 ? q[q.length - 1] : -1;
    }

    return undefined;
  })
  .filter((ret) => ret != null)
  .join("\n");

console.log(ans);
