const bfs = (board, visited, N, n, i, j) => {
  const q = [];
  let head = 0;

  q.push([i, j]);
  visited[i][j] = true;
  board[i][j] = n;

  while (q.length - head > 0) {
    const [cx, cy] = q[head++];

    [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]
      .map(([dx, dy]) => [cx + dx, cy + dy])
      .filter(([x, y]) => x >= 0 && x < N && y >= 0 && y < N)
      .filter(([x, y]) => !visited[x][y])
      .filter(([x, y]) => board[x][y] === 1)
      .forEach(([x, y]) => {
        visited[x][y] = true;
        board[x][y] = n;

        q.push([x, y]);
      });
  }
};

const fill = (board, N) => {
  let num = 1;
  const visited = Array.from({ length: N }, () => []);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;
      if (board[i][j] === 0) continue;

      bfs(board, visited, N, num++, i, j);
    }
  }

  return num;
};

const getDist = (board, N, n, arr) => {
  const visited = Array.from({ length: N }, () => []);

  const q = [];
  let head = 0;

  arr.forEach(([i, j]) => {
    q.push([i, j, 0]);
    visited[i][j] = true;
  });

  let shortest = Infinity;

  while (q.length - head > 0) {
    const [cx, cy, cd] = q[head++];

    [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]
      .map(([dx, dy]) => [cx + dx, cy + dy, cd])
      .filter(([x, y]) => x >= 0 && x < N && y >= 0 && y < N)
      .filter(([x, y]) => !visited[x][y])
      .map(([x, y, d]) => {
        if (board[x][y] !== 0 && board[x][y] !== n) {
          shortest = d;
          head = Infinity;
        }

        return [x, y, d];
      })
      .filter(([x, y]) => board[x][y] === 0)
      .forEach(([x, y, d]) => {
        visited[x][y] = true;

        q.push([x, y, d + 1]);
      });
  }

  return shortest;
};

const getN = (board, n) => {
  const ret = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === n) ret.push([i, j]);
    }
  }

  return ret;
};

const getShortest = (board, N, count) => {
  let shortest = Infinity;

  for (let i = 1; i < count; i++) {
    const arr = getN(board, i);
    const dist = getDist(board, N, i, arr);

    shortest = Math.min(shortest, dist);
  }

  return shortest;
};

const parse = (n, ...input) => {
  const N = Number(n);

  const board = input.map((line) => line.split(" ").map(Number));

  return [N, board];
};

const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");

const [N, board] = parse(...input);

const areaCount = fill(board, N);

const answer = getShortest(board, N, areaCount);

console.log(answer);
