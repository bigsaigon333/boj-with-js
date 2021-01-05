/* Date: 2021-01-05 Tue 13:44:30 8m 41s
 * URL: https://www.acmicpc.net/problem/1697
 * 유형: BFS
 * Comment: BFS 기초예제 5
 * 1차원에서의 BFS 응용.
 * BFS의 범위를 어디까지 해야 할까? 0부터 100,000으로 하면 되는거 아닌가 하고
 * 쉽게 생각을 할 수 있지만, 둘의 위치가 0에서 100,000 사이이지
 * 이동 중에 반드시 0에서 100,000 사이에만 있어야 한다는 조건은 없다.
 * 따라서 예를 들어 100,000 밖으로 나갔다가 다시 안으로 올 수도 있다.
 * 곰곰히 생각해보면, +1로 100,000을 탈출하는 건 바보짓이고
 * x2로 100,000을 탈출하는 상황이 있을 수 있지만, x2를 한 후 -1을 여러번 하는 것보다
 * -1을 먼저 하고 x2를 하는게 항상 낫다.
 * 예를 들어, 50,001 의 경우
 * 1) -1부터 먼저 한 경우, 50,001 -1 = 50,000 -> 50,000 *2 = 100,000:  2번 으로 100,000이 됨
 * 2) *2부터 먼저 한 경우, 50,001 *2 = 100,002 -> 100,002 -1 = 100,001 -> 100,001 -1 = 100,000: 3번으로 100,000이 됨
 * 따라서 BFS의 범위를 0에서 100,000 으로 하면 됨
 * 다만, 이 문제에서 당연히 0에서 100,000 사이에서만 움직인다고 멋대로 가정을 하고 풀면 안된다. (논리적으로 생각을 한번 해보자!)
 */

const [N, K] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((str) => Number(str));

const MAX = 100000 + 1;
const dist = Array(MAX + 1).fill(-1);
dist[N] = 0;

const q = [N];

let head = 0;
while (head < q.length) {
  const curr = q[head++];
  if (curr === K) {
    console.log(dist[curr]);
    break;
  }

  for (const d of [1, -1, curr]) {
    const next = curr + d;
    if (next < 0 || next > MAX) continue;
    if (dist[next] >= 0) continue;

    dist[next] = dist[curr] + 1;
    q.push(next);
  }
}
