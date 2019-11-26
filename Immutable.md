---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
    text-align: center;
  }
---

# Immutable

---

# 安装

```
npm install immutable
```

---

# 什么是 Immutable

1. 数据一旦创建就不再修改

mutable 可修改的
immutable 不可修改

## 有什么好处

1. 简化开发过程
2. 不需要对复制有所防备
3. 能方便的实现数据记录
4. 简化数据的变更侦测

---

# 理论基础

## 持久数据结构 (persistent data structure)

总是记录自己前一个版本的数据

Immutable 实际是 Persistent Immutable Data Structure.

### 实现技术，结构性分享(Structural Sharing)

实现技术低层:

1. DAG(Directed Acylic Graph)，单向图

2. Trie

---

# Tries

1. vector trie
2. hash maps trie

---

# 解决的问题

1. 并发时不需要加锁(Concurrency)
   并发是一个复杂的主题，特别是当你需要修改数据时。
2. javascript 的当前执行模型是单线程的
   使用 Immutable 的数据有利于 javascript 适应多线程的环境

3. 解决了对于可修改的数据的控制困难

---

# 可修改数据的困难所在

1. 无法预知修改结果，需要添加侦听
2. 添加侦听后，无法侦听所有变化。通常只能侦听一级
3. 新的 ES7 里面的 get/set 可以解决一部分问题，但是造成了 V 与 M 的耦合
4. Immutable 可以轻松的解决

---

# Immutable 跟踪变化

## Map 变化跟踪

```ts
import { Map } from "immutable";

const first = Map({ key: "value" });

const second = first.set("key", "foo");

const third = first.set("key", "value");

second === first; // false

third === first; // true
```

---

## Map 变化跟踪多 Key

```ts
import { Map } from "immutable";

const first = Map({
  foo: Map({
    val: 10
  }),
  bar: Map({
    val: 20
  })
});

const second = first.setIn(["foo", "bar"], 500);

second === first; // false
second.get("foo") === first.get("foo"); // false
second.get("bar") === first.get("bar"); // true
```

---

# 结果存储化(Memoization)

用于加速已经处理过的数据返回。

---

## 记忆数组的总额

### 1. 定义计算总额的函数

```ts
function Sum(list: Array<number>) {
  return list.reduce((a, b) => a + b);
}
```

### 2. 定义记忆函数

```ts
function Memoize(func) {
  let preArg;
  let preResult;
  return function(arg) {
    return arg === preArg
      ? preResult
      : ((preArg = arg), (preResult = func.call(this, arg)));
  };
}
```

---

### 3. 生成计算结果函数

```
const MemoizedSum = Memoize(Sum);
```

### 4. 初始化需要记忆/存储的数据

```
let list = [];

const MAX = 100000;

for (let i = 0; i < MAX; i++) {
  list.push(i);
}
```

---

### 5. 使用 Immutable 数据结构存储数组

```
let immutableList = List(list);
```

---

### 6. 记忆没有变化的数据

```

console.time("sum");
MemoizedSum(immutableList);
console.timeEnd("sum");


console.time("sum");
MemoizedSum(immutableList);
console.timeEnd("sum");
```

结果：

```
sum: 14.450ms
sum: 0.005ms
```

---

### 7. 发现数据的变化

```
immutableList = immutableList.push(MAX);
console.time("sum");
MemoizedSum(immutableList);
console.timeEnd("sum");
```

结果：

```
sum: 14.466ms
```

---

## 数据的变化跟踪

> 应用于 `shouldComponentUpdate` 函数

## 性能优于 virutal DOM 的 reconciliation 算法

## 实现数据的排序更加方便

## undo 非常容易

---

# 小结

1. 传统应用开发在维护状态和追踪变量上非常头，Immutable 从另外的角度出发思考问题。不让数据变化被侦听，直接返回新数据，并比较是不是修改
2. 与 React 的架构、Flux 的思考非常契合
3. Immutable 使数据从上面传递下来，只关心是不是被修改
4. Immutable 更接近于`值`而不是`对像`
   对象：一个可以随着时间修改的东西
   值: 一个时间的实例，不可能修改

---

# 相等性判断

1. 使用`Immutable.is`/`Immutable.equals`去判断是不是相等
2. 不使用`===`去判断

```
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });
map1.equals(map2); // true
map1 === map2; // false
```

---

# 与 JavaScript 的 API 的不同

> Immutable 返回的操作都是跟它定义的集合类型一致

不会单一元素

```js
const { List } = require("immutable");
const list1 = List([1, 2]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);
assert.equal(list1.size, 2);
assert.equal(list2.size, 5);
assert.equal(list3.size, 6);
assert.equal(list4.size, 13);
assert.equal(list4.get(0), 1);
```

---

# 与 JavaScript 原生对象的相互转换

---

# 接收原生数组与对象

```js
const { Map, List } = require("immutable");
const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
const map2 = Map({ c: 10, a: 20, t: 30 });
const obj = { d: 100, o: 200, g: 300 };
const map3 = map1.merge(map2, obj);
// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
const list1 = List([1, 2, 3]);
const list2 = List([4, 5, 6]);
const array = [7, 8, 9];
const list3 = list1.concat(list2, array);
// List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

---

# 接收原生数组与对象

```js
const { Seq } = require("immutable");
const myObject = { a: 1, b: 2, c: 3 };
Seq(myObject)
  .map(x => x * x)
  .toObject();
// { a: 1, b: 4, c: 9 }
```

---

# 所有 Key 都是 string

> 在 Immutable 会将所有的原生对象的 key 转化成 string
> 而 Immutable 接收 key 时并不会强制必须 string

```js
const { fromJS } = require("immutable");

const obj = { 1: "one" };
console.log(Object.keys(obj)); // [ "1" ]
console.log(obj["1"], obj[1]); // "one", "one"

const map = fromJS(obj);
console.log(map.get("1"), map.get(1)); // "one", undefined
```

---

# 转回 JavaScript 原生类型

Immutable 提供了`toJS`, `toArray`, `toObject`三个方法让 Immutable 转回原生类型。

```js
const { Map, List } = require("immutable");
const deep = Map({ a: 1, b: 2, c: List([3, 4, 5]) });
console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
JSON.stringify(deep); // '{"a":1,"b":2,"c":[3,4,5]}'
```

---

# 嵌套结构

Immutable 本身就是迎合嵌套的。

```
const { fromJS } = require('immutable');
const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
```

Immutable 提供了
`mergeDeep`, `getIn`, `setIn`, `updateIn` 方便操作嵌套数据

---

示例：

```js
const { fromJS } = require("immutable");
const nested = fromJS({ a: { b: { c: [3, 4, 5] } } });

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

console.log(nested2.getIn(["a", "b", "d"])); // 6

const nested3 = nested2.updateIn(["a", "b", "d"], value => value + 1);
console.log(nested3);
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

const nested4 = nested3.updateIn(["a", "b", "c"], list => list.push(6));
// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
```

---

# 集合作为数值

```js
// First consider:
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { a: 1, b: 2, c: 3 };
obj1 !== obj2; // two different instances are always not equal with ===

const { Map, is } = require("immutable");
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });
map1 !== map2; // two different instances are not reference-equal
map1.equals(map2); // but are value-equal if they have the same values
is(map1, map2); // alternatively can use the is() function
```

---

# 集合作为数值

如果两个不同地址的 Map，有相同的值，那么认为他们是相同的。

```
const { Map, Set } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });
const set = Set().add(map1);
set.has(map2); // true because these are value-equal
```

---

# 集合作为数值

不对新赋于的相同值的进行操作

```js
const { Map } = require("immutable");
const originalMap = Map({ a: 1, b: 2, c: 3 });
const updatedMap = originalMap.set("b", 2);
updatedMap === originalMap; // No-op .set() returned the original reference.
```

---

# 批量修改

如果大量的数据一个一个的修改，那么会影响 Immutable 的数据的性能。
所以 Immutable 提供了`withMutations`让修改一次性完成后再提交，从而让性能可以更好一些。

```js
const { List } = require("immutable");
const list1 = List([1, 2, 3]);
const list2 = list1.withMutations(function(list) {
  list
    .push(4)
    .push(5)
    .push(6);
});
assert.equal(list1.size, 3);
assert.equal(list2.size, 6);
```

> 只有 set, push, pop 可以使用

---

# 懒 Seq

Seq 用于执行懒操作，通过高有序的集合方法(map, filter 等)，避免创建中间集合。

它创建后并不会马上执行，比如：

```
const { Seq } = require('immutable');
const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
  .filter(x => x % 2 !== 0)
  .map(x => x * x);
```

只有在调用获取方法时才会被执行:

```
oddSquares.get(1); // 9
```

这是 1 表示 filter 后生产的下表为 1 的值。
也就是第二个满足`x % 2 !== 0`的 x 所`map`后产生的值， 即 `3*3=9`。

---

这里 `get(0)` 会得到 `1`，`get(2)`得到 `25`， 超过 4 就没有结果了。

`get(i)`从 0-5 的输出结果：

```
1
9
25
49
undefined
undefined
```

---

# 任何与其它 Immutable 集合都可以转化成 Seq

```js
const map = Map({ a: 1, b: 2, c: 3 });
const lazySeq = Seq(map);
console.log(lazySeq.get("a")); // 1
console.log(lazySeq.get("b")); // 2
console.log(lazySeq.get("c")); // 3

const a = lazySeq.map((key: number) => key + 1);
console.log(a.get("c")); // 4
```

---

# 应用 Seq 到时间或者内存消耗的计算中

下面例子中，集合是无限的，但是利用 Seq 不计算的特点，

我们只取出了 1000 后的两个值，然后得到他们的运算结果。

```
const { Range } = require('immutable');
Range(1, Infinity)
  .skip(1000)
  .map(n => -n)
  .filter(n => n % 2 === 0)
  .take(2)
  .reduce((r, n) => r * n, 1);
// 1006008
```