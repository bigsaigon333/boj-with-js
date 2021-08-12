const path = require("path");
const genSolve = require("solve.io");
const solve = genSolve(path.resolve(__dirname, "1012.js"));

test("ex1", async () => {
  const input = `2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5`;

  const output = `5
1
`;

  expect(await solve(input)).toBe(output);
});

test("ex2", async () => {
  const input = `1
5 3 6
0 2
1 2
2 2
3 2
4 2
4 0`;

  const output = `2
`;

  expect(await solve(input)).toBe(output);
});
