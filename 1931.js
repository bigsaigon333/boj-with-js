const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const meetings = input
  .slice(1)
  .map((meeting) => meeting.split(" ").map(Number))
  .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

let count = 0;
let earliest = 0;
for (let i = 0; i < meetings.length; i++) {
  const [begin, end] = meetings[i];

  if (earliest <= begin) {
    count++;
    earliest = end;
  }
}

console.log(count);
