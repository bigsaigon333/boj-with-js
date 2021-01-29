/* 
4
0 0 0 4

Answer
As-Is: 4
To-Be: 3

테스트케이스 추가 신청예정(200문제 풀고 난 후에 가능)
 */

const input = require("fs").readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const dict = new Map();
A.forEach((num) => dict.set(num, (dict.get(num) || 0) + 1));

const S = new Set();
for (let i = 0; i < A.length; i++) {
  if (A[i] === 0) continue;
  for (let j = i + 1; j < A.length; j++) {
    if (A[j] === 0) continue;
    S.add(A[i] + A[j]);
  }
}
const add = Array.from(S).sort((a, b) => a - b);

let count = 0;
for (const a of A) {
  if (binarySearch(0, add.length, a)) count++;
  else if (dict.get(0) === 1 && dict.get(a) > 1) count++;
  else if (dict.get(0) === 2 && dict.get(a) > 1 && a !== 0) count++;
  else if (dict.get(0) >= 3) count++;
}

console.log(count);

function binarySearch(begin, end, target) {
  if (end - begin <= 3) {
    for (let i = end - 1; i >= begin; i--) {
      if (add[i] === target) return true;
    }
    return false;
  }

  const mid = Math.floor((begin + end) / 2);
  if (add[mid] <= target) return binarySearch(mid, end, target);
  else return binarySearch(begin, mid, target);
}

/* 
5
1 2 3 3 3
*/ // 3

/* 
7
0 0 0 3 3 3 3
*/ // 7

/*
11
0 1 2 3 4 5 6 7 8 9 10 
*/ // 8

/* 
6
0 0 3 3 3 3
 */ // 4

/* 
3
0 3 3
 */ // 2

/* 
3
-1 0 1
 */ // 1

/* 
 3
 0 0 3
  */
