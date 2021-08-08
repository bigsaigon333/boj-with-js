const [first, ...rest] = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split("\n");

const [N, M] = first.split(" ").map(Number);
const board = rest.map((line) => line.split(" ").map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

let count = 0;
let maxArea = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j]) continue;
    if (board[i][j] === 0) continue;

    count++;
    visited[i][j] = true;
    const area = getArea(i, j);

    maxArea = Math.max(maxArea, area);
  }
}

function getArea(i, j) {
  const q = [[i, j]];
  let head = 0;

  let area = 0;

  while (q.length - head > 0) {
    const curr = q[head++];
    area++;

    [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
      .map(([dx, dy]) => [curr[0] + dx, curr[1] + dy])
      .filter(([x, y]) => x >= 0 && x < N && y >= 0 && y < M)
      .filter(([x, y]) => board[x][y] === 1)
      .filter(([x, y]) => !visited[x][y])
      .forEach(([x, y]) => {
        visited[x][y] = true;

        q.push([x, y]);
      });
  }

  return area;
}

console.log(count);
console.log(maxArea);
