# 스택 / 큐 / 덱

## 1. 스택

- 스택은 `[0, s.length)` 인 배열으로 나타낸다.

### 스택의 시그니쳐

```jsx
const s = [];

// push_back: tail에 원소를 추가
s.push(val);

// pop_back: tail의 원소를 접근후 삭제
s.pop();

// back: tail의 원소에 접근
s[s.length - 1];

// size: stack의 길이를 판별
s.length;

// empty: stack이 비어있는지 판별
s.length === 0;
```

### 스택 사용 예시

```jsx
const s = [1, 2, 3];

// push_back: tail에 원소를 추가
s.push(4);
console.log(s); // [1,2,3,4]

// pop_back: tail의 원소를 접근 후 삭제
const back = s.pop();
console.log(back, s); // 4 [1,2,3]

// back: tail의 원소에 접근
const back2 = s[s.length - 1];
console.log(back2, s); // 3 [1,2,3]

// size: stack의 길이를 판별
const size = s.length;
console.log(size); // 3;

// empty: stack이 비어있는지 판별
const isEmpty = s.length === 0;
console.log(isEmpty); // false;

// while문: stack을 tail부터 순회
while(s.length > 0) {
  const el = s.pop();
  /* 중략 */
}
```

## 2. 큐

- 큐는 `[head, s.length)` 인 배열으로 나타낸다.

- `pop_front`의 시간복잡도를 `O(1)`으로 하기 위하여 변수 `head`로 `back`을 가리킨다.

### 큐 시그니쳐

```jsx
const q = [];
let head = 0;

// push_back: tail에 원소를 추가
q.push(val);

// pop_back: tail의 원소를 접근후 삭제
q.pop();

// pop_front: head의 원소를 접근후 삭제
q[head++];

// back: tail의 원소에 접근
q[q.length - 1];

// front: head의 원소에 접근
q[head];

// size: queue의 길이를 판별
q.length - head;

// empty: queue가 비어있는지 판별
q.length - head === 0;
```


### 큐 사용예시

```jsx

// debug용 helper 함수
const print = (arr, head = 0, tail = arr.length) => console.log(arr.slice(head, tail));

const q = [1, 2, 3];
let head = 0;

// push_back: tail에 원소를 추가
q.push(4);
print(q, head); // [1,2,3,4]

// pop_back: tail의 원소를 접근 후 삭제
const back = q.pop();
console.log(back); // 4
print(q, head); // [1,2,3]

// pop_front: head의 원소를 접근후 삭제
const front = q[head++];
console.log(front); // 1
print(q, head); // [2,3]

// back: tail의 원소에 접근
const back2 = q[q.length - 1];
console.log(back2); // 3;
print(q, head); // [2,3]

// front: head의 원소에 접근
const front2 = q[head];
console.log(front2); // 2
print(q, head); // [2,3]

// size: stack의 길이를 판별
const size = q.length - head;
console.log(size); // 2;

// empty: stack이 비어있는지 판별
const isEmpty = q.length - head === 0;
console.log(isEmpty); // false;

// while문: queue를 head부터 순회
while(q.length - head > 0) {
  const el = q[head++];
  /* 중략 */
}
```


## 3. 덱

- 덱은 `[head, dq.length)` 인 배열으로 나타낸다.

- `pop_front`의 시간복잡도를 `O(1)`으로 하기 위하여 변수 `head`로 `back`을 가리킨다.

- 큐와의 차이: `push_back`이 `MX`번 호출될 수 있기에, `head`의 초기값을 `MX`로 한다.

  (※ `MX`는 문제에서 주어지는 덱의 최대 길이를 의미한다)


### 시그니쳐

```jsx
const MX = 10_000_000; // 문제에서 주어진 덱의 최대 길이

const dq = [];
let head = MX;
dq.length = head;

// push_back: tail에 원소를 추가
dq.push(val);

// pop_back: tail의 원소를 접근후 삭제
dq.pop();

// push_front: head의 원소를 접근후 삭제
dq[--head] = val;

// pop_front: head의 원소를 접근후 삭제
dq[head++];

// back: tail의 원소에 접근
dq[dq.length - 1];

// front: head의 원소에 접근
dq[head];

// size: deque의 길이를 판별
dq.length - head;

// empty: deque이 비어있는지 판별
dq.length - head === 0;
```

### 덱 사용예시


```jsx

// debug용 helper 함수
const print = (arr, head, tail) => console.log(arr.slice(head, tail));

const MX = 10_000;
const dq = [];
let head = MX;
dq.length = head;

dq.push(1,2,3);


// push_back: tail에 원소를 추가
dq.push(4);
print(dq, head); // [1,2,3,4]

// pop_back: tail의 원소를 접근 후 삭제
const back = dq.pop();
console.log(back); // 4
print(dq, head); // [1,2,3]

// push_front: head에 원소를 추가
dq[--head] = 4;
print(dq, head); // [4,1,2,3]

// pop_front: head의 원소를 접근후 삭제
const front = dq[head++];
console.log(front); // 4
print(dq, head); // [1,2,3]

// back: tail의 원소에 접근
const back2 = dq[dq.length - 1];
console.log(back2); // 3;

print(dq, head); // [1,2,3]

// front: head의 원소에 접근
const front2 = dq[head];
console.log(front2); // 1
print(dq, head); // [1,2,3]

// size: deque의 길이를 판별
const size = dq.length - head;
console.log(size); // 3;

// empty: deque가 비어있는지 판별
const isEmpty = dq.length - head === 0;
console.log(isEmpty); // false;

// while문: deque head부터 순회
while(dq.length - head > 0) {
  const el = dq[head++];
  /* 중략 */
}

// while문: deque tail부터 순회
while(dq.length - head > 0) {
  const el = dq.pop();
  /* 중략 */
}
```
