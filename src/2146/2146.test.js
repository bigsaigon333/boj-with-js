const path = require("path");
const fs = require("fs");
const genSolve = require("solve.io");
const solve = genSolve(path.resolve(__dirname, "2146.js"));

describe("2146", () => {
  test("ex1", async () => {
    const input = fs.readFileSync(path.resolve(__dirname, "ex1.in"), "utf-8");
    const output = fs.readFileSync(path.resolve(__dirname, "ex1.out"), "utf-8");

    expect(await solve(input)).toBe(output);
  });
});
