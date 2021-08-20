const path = require("path");
const genSolve = require("solve.io");
const solve = genSolve(path.resolve(__dirname, "1000.js"));

test("ex1", async () => {
  const input = `1 2`;
  const output = `3
`;

  expect(await solve(input)).toBe(output);
});
