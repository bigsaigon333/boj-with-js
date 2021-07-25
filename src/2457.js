/* 2457번 공주님의 정원
 * https://www.acmicpc.net/problem/2457
 * 1st try: 2021-02-01 Mon 23:28:18  46m
 * 2nd try: 2021-02-02 Tue 23:33:57  more than 2 hours
 * Comment: 그리디 문제. 그리디인걸 알고 풀어도 인덱스의 변화를 구현하는 것이 어렵다..
 * 연습만이 살길
 */

let [N, ...input] = require("fs").readFileSync(0, "utf8").trim().split("\n");

N = Number(input[0]);
const date = input
  .map((line) => line.split(" ").map(Number))
  .map(([bm, bd, em, ed]) => [bm * 100 + bd, em * 100 + ed])
  .sort(([begin1, end1], [begin2, end2]) => begin1 - begin2 || end1 - end2);

const MAX_BEGIN = 301;
const MIN_END = 1201;

let count = 0;
let head = 0;
let currEnd = MAX_BEGIN;
let maxNextEnd = 0;

while (head < date.length) {
  const [nextBegin, nextEnd] = date[head++];

  // currEnd보다 작거나 같은 nextEnd는 pass
  if (nextEnd <= currEnd) continue;

  // curr와 next가 겹치는 구간이 있는 경우
  if (nextBegin <= currEnd) {
    // nextBegin <= currEnd 를 만족시키는 nextEnd의 최대값(maxNextEnd)을 구한다.
    maxNextEnd = Math.max(maxNextEnd, nextEnd);
    continue;
  }

  // curr와 next가 겹치는 구간이 없을 경우, nextBegin <= currEnd 를 만족시키는 nextEnd의 최대값을 currEnd에 넣는다.
  head--;
  currEnd = maxNextEnd;
  count++;
  // console.log("curr", currEnd);

  if (currEnd >= MIN_END) break;

  // curr 와 next가 단절되어 있다 -> 0 출력 후 종료
  if (nextBegin > currEnd) break;
}

if (currEnd < MIN_END && currEnd < maxNextEnd) {
  currEnd = maxNextEnd;
  count++;
  // console.log("curr", currEnd);
}

console.log(currEnd < MIN_END ? 0 : count);
