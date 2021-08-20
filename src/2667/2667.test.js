const path = require("path");
const solve = require("solve.io")(path.resolve(__dirname, "2667.js"));

test("ex1", async () => {
  const input = `7
0110100
0110101
1110101
0000111
0100000
0111110
0111000
`;

  const output = `3
7
8
9
`;

  expect(await solve(input)).toBe(output);
});

test("ex2", async () => {
  const input = `3
011
011
111
`;

  const output = `1
7
`;

  expect(await solve(input)).toBe(output);
});

test("ex3", async () => {
  const input = `3
001
000
101
`;

  const output = `3
1
1
1
`;

  expect(await solve(input)).toBe(output);
});
