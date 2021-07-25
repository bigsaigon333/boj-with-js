const [N, T] = require("fs").readFileSync(0).toString().split("\n");

const ts = T.split(" ").map(Number);

const s = [];

s.tail = 0;

const ans = Array(N).fill(0);

ts.forEach((t, i) => {
  while (s.tail > 0 && s[s.tail - 1][0] <= t) {
    --s.tail;
  }

  ans[i] = s.tail > 0 ? s[s.tail - 1][1] + 1 : 0;

  s[s.tail++] = [t, i];
});

console.log(ans.join(" "));
