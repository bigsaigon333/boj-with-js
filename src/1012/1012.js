const nextLine = (() => {
  const input = require("fs").readFileSync(0, "utf-8").trim().split("\n");
  let ln = 0;

  return () => input[ln++];
})();

const parse = (line) => line.split(" ").map(Number);

const range = (start, end) =>
  Array.from({ length: end - start }, (_, i) => i + start);

// const zip = (a, b) =>
//   Array.from({ length: Math.max(a.length, b.length) }, (_, i) => [a[i], b[i]]);

const product = (a, b) => a.map((ea) => b.map((eb) => [ea, eb])).flat();

const BFS = (board, visited, M, N, i, j) => {
  const q = [[i, j]];
  let head = 0;

  while (q.length - head > 0) {
    const [cx, cy] = q[head++];

    [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ]
      .map(([dx, dy]) => [cx + dx, cy + dy])
      .filter(([x, y]) => x >= 0 && x < M && y >= 0 && y < N)
      .filter(([x, y]) => board[x][y])
      .filter(([x, y]) => !visited[x][y])
      .forEach(([x, y]) => {
        visited[x][y] = true;

        q.push([x, y]);
      });
  }
};

const T = Number(nextLine());

range(0, T)
  .map(() => {
    const [M, N, K] = parse(nextLine());
    const board = Array.from({ length: M }, () => Array(N).fill(false));
    const visited = Array.from({ length: M }, () => Array(N).fill(false));

    range(0, K)
      .map(() => parse(nextLine()))
      .forEach(([x, y]) => (board[x][y] = true));

    return { M, N, K, board, visited };
  })
  .map(({ M, N, board, visited }) =>
    product(range(0, M), range(0, N))
      .filter(([x, y]) => board[x][y])
      .map(([x, y]) => {
        if (visited[x][y]) {
          return 0;
        }

        visited[x][y] = true;

        BFS(board, visited, M, N, x, y);

        return 1;
      })
      .reduce((acc, curr) => acc + curr, 0)
  )
  .forEach((n) => console.log(n));
