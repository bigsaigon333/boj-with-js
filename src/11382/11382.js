const [A, B, C] = require("fs").readFileSync(0, "utf-8").split(" ").map(Number);

console.log(A + B + C);
