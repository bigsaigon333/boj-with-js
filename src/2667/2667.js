const curry =
  (f) =>
  (...as) =>
    as.length > 1 ? f(...as) : (...bs) => f(...as, ...bs);

const reduce = curry((f, acc, iter) => {
  if (iter == null) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

const take = curry((length, iter) => {
  const res = [];

  for (const a of iter) {
    if (res.length === length) {
      return res;
    }

    res.push(a);
  }

  return res;
});

const takeAll = take(Infinity);

const go = (...fs) => reduce((acc, f) => f(acc), fs);

const pipe =
  (f, ...fs) =>
  (...args) =>
    go(f(...args), ...fs);

const L = {};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const map = curry(pipe(L.map, takeAll));

const BFS = (board, visited, N, i, j) => {
  const q = [];
  let head = 0;
  q.push([i, j]);

  let area = 0;

  while (q.length - head > 0) {
    const [cx, cy] = q[head++];
    area++;

    go(
      [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
      ],
      L.map(([dx, dy]) => ({ x: cx + dx, y: cy + dy })),
      L.filter(({ x, y }) => x >= 0 && x < N && y >= 0 < y < N),
      L.filter(({ x, y }) => board[x][y] === 1),
      L.filter(({ x, y }) => !visited[x][y]),
      map(({ x, y }) => {
        visited[x][y] = true;

        q.push([x, y]);
      })
    );
  }

  return area;
};

const start = function* (board, visited, N) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;
      if (board[i][j] === 0) continue;

      visited[i][j] = true;

      yield BFS(board, visited, N, i, j);
    }
  }
};

const [N, ...input] = require("fs").readFileSync(0, "utf-8").trim().split("\n");

const board = input.map((line) => line.split("").map(Number));

const visited = Array.from({ length: N }, () => []);

go(
  start(board, visited, N),
  takeAll,
  (arr) => arr.sort((a, b) => a - b),
  (a) => [a.length, ...a],
  map(console.log)
);
