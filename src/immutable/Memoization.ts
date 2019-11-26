
import { List } from 'immutable';


function Sum(list: Array<number>) {
  return list.reduce((a, b) => a + b);
}

function Memoize(func) {
  let preArg;
  let preResult;
  return function (arg) {
    return arg === preArg ? preResult :
      (preArg = arg,
        preResult = func.call(this, arg));
  };
}

const MemoizedSum = Memoize(Sum);

let list = [];

const MAX = 100000;

for (let i = 0; i < MAX; i++) {
  list.push(i);
}

console.time("sum");
MemoizedSum(list);
console.timeEnd("sum");

console.time("sum");
MemoizedSum(list);
console.timeEnd("sum");

let immutableList = List(list);

console.time("sum");
MemoizedSum(immutableList);
console.timeEnd("sum");


console.time("sum");
MemoizedSum(immutableList);
console.timeEnd("sum");

// list = list.push(MAX);

immutableList = immutableList.push(MAX);

console.time("sum");
MemoizedSum(list);
console.timeEnd("sum");

console.time("sum");
MemoizedSum(immutableList);
console.timeEnd("sum");