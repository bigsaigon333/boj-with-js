const toIndex = (c) => c.charCodeAt(0) - "a".charCodeAt(0);

const len = toIndex("z") - toIndex("a") + 1;

const gen = (word) => {
  const arr = Array.from({ length: len }, () => 0);

  const idxs = word.split("").map((c) => toIndex(c));

  for (const i of idxs) {
    arr[i] += 1;
  }

  return arr;
};

const cal = (fd, sd) => {
  if (fd.length !== sd.length) {
    throw new Error(`fd.length(${fd.length}) !== sd.length(${sd.length})`);
  }

  let ret = 0;
  for (let i = 0; i < fd.length; i++) {
    ret += Math.abs(fd[i] - sd[i]);
  }

  return ret;
};

const [first, second] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n");

console.log(cal(gen(first), gen(second)));
