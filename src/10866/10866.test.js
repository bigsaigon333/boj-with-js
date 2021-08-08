const path = require("path");
const genSolve = require("solve.io");

const solve = genSolve(path.resolve(__dirname, "10866.js"));

test("ex1", async () => {
  const input = `15
push_back 1
push_front 2
front
back
size
empty
pop_front
pop_back
pop_front
size
empty
pop_back
push_front 3
empty
front
`;

  const output = `2
1
2
0
2
1
-1
0
1
-1
0
3
`;

  expect(await solve(input)).toBe(output);
});

test("ex2", async () => {
  const input = `22
front
back
pop_front
pop_back
push_front 1
front
pop_back
push_back 2
back
pop_front
push_front 10
push_front 333
front
back
pop_back
pop_back
push_back 20
push_back 1234
front
back
pop_back
pop_back
`;

  const output = `-1
-1
-1
-1
1
1
2
2
333
10
10
333
20
1234
1234
20
`;

  expect(await solve(input)).toBe(output);
});
