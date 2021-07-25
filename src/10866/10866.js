const [, ...commands] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n"); // slice 보다 destructuring이 더 빠르다

const ans = [];
const MX = 10_000;
const dq = Array(2 * MX + 5);

let head = MX;
let tail = MX;

for (const c of commands) {
  let [opr, opd] = c.split(" ");
  opd = Number(opd);

  if (opr === "push_front") {
    dq[--head] = opd;
    continue;
  }

  if (opr === "push_back") {
    dq[tail++] = opd;
    continue;
  }

  if (opr === "pop_front") {
    ans.push(tail - head > 0 ? dq[head++] : -1);
    continue;
  }

  if (opr === "pop_back") {
    ans.push(tail - head > 0 ? dq[--tail] : -1);
    continue;
  }

  if (opr === "size") {
    ans.push(tail - head);
    continue;
  }

  if (opr === "empty") {
    ans.push(tail - head === 0 ? 1 : 0);
    continue;
  }

  if (opr === "front") {
    ans.push(tail - head > 0 ? dq[head] : -1);
    continue;
  }

  if (opr === "back") {
    ans.push(tail - head > 0 ? dq[tail - 1] : -1);
  }
}

console.log(ans.join("\n"));
