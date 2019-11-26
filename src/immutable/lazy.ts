import { Seq, Map, Range } from 'immutable';
const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
  .filter((x: number) => x % 2 !== 0)
  .map((x: number) => x * x);


console.log(oddSquares.get(0));
console.log(oddSquares.get(1));

console.log(oddSquares.get(2));
console.log(oddSquares.get(3));
console.log(oddSquares.get(4));
console.log(oddSquares.get(5));


const map = Map({ a: 1, b: 2, c: 3 });
const lazySeq = Seq(map);
console.log(lazySeq.get('a'));
console.log(lazySeq.get('b'));
console.log(lazySeq.get('c'));

const a = lazySeq
  .map((key: number) => key + 1);
console.log(a.get('c'));


const range = Range(1, Infinity)
  .skip(1000)
  .map(n => -n)
  .filter(n => n % 2 === 0)
  .take(2)

console.log(range);
const r2 = range.reduce((r, n) => r * n, 1);

console.log(r2);