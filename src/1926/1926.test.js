const path = require("path");
const genSolve = require("solve.io");

const solve = genSolve(path.resolve(__dirname, "1926.js"));

test("ex1", async () => {
  const input = `6 5
1 1 0 1 1
0 1 1 0 0
0 0 0 0 0
1 0 1 1 1
0 0 1 1 1
0 0 1 1 1
`;

  const output = `4
9
`;

  expect(await solve(input)).toBe(output);
});
