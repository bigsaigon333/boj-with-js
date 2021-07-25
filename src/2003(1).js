/* 2003번 수들의 합 2
 * https://www.acmicpc.net/source/25749842
 * 2021-01-27 Wed 23:11:00
 * Comment: 이분 탐색의 문제집 속 문제임을 알고 접근해서 그런지, 어떻게든 이분 탐색으로 풀려고 노력하였는데 보이지 않았다.
 * Sum[i:j+1] = Sum[0:j+1] - Sum[0:i] 임을 이용해서 문제를 일단 풀었다.
 * 메모리 제한이 128MB여서 이를 맞추는데 조금 고생햐였다.
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);

const sum = Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  sum[i] = sum[i - 1] + A[i - 1];
}

let count = 0;
for (let i = 0; i < sum.length; i++) {
  for (let j = i + 1; j < sum.length; j++) {
    if (sum[j] - sum[i] === M) count++;
  }
}
console.log(count);
