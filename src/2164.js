const N = Number(require("fs").readFileSync(0, "utf-8"));

const q = Array.from({ length: N }).map((_, i) => i + 1);

let head = 0;

while (q.length - head > 1) {
  head++;
  q.push(q[head++]);
}

console.log(q[head]);
