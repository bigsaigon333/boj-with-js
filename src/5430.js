const input = require("fs").readFileSync(0, "utf-8").split("\n");

let line = 0;
const next = () => input[line++];

const ans = Array.from({ length: next() })
  .map(() => {
    const P = next().split("");
    const N = Number(next());
    const str = next().slice(1, -1);
    const nums = str ? str.split(",").map(Number) : [];

    return cal(P, N, nums);
  })
  .join("\n");

console.log(ans);

function cal(P, N, q) {
  q.head = 0;
  q.tail = q.length;
  q.dir = 1;

  for (const p of P) {
    if (p === "R") {
      [q.head, q.tail] = [q.tail - q.dir, q.head - q.dir];
      q.dir *= -1;
    }

    if (p === "D") {
      if (q.tail - q.head === 0) {
        return "error";
      }
      q.head += q.dir;
    }
  }

  const ret = [];
  while (q.tail - q.head !== 0) {
    ret.push(q[q.head]);
    q.head += q.dir;
  }

  return `[${ret.join(",")}]`;
}
