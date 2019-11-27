---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
    text-align: center;
  }
---

<style scoped>

blockquote, blockquote:before, blockquote:after {
  text-align: right;
  border: 0;
  padding: 0;
  margin: 0;
  font-style: italic;
}
</style>

# Mobx

> Simple, scalable state management

---

# 安装

# 不绑定 React

```
npm install mobx --save
```

# 绑定 React

```
npm install mobx-react --save
```

---

# 在前端引用地址

1. unpkg
   [https://unpkg.com/mobx/lib/mobx.umd.js](https://unpkg.com/mobx/lib/mobx.umd.js)
2. cdnjs
   [https://cdnjs.com/libraries/mobx](https://cdnjs.com/libraries/mobx)

---

# 浏览器支持

1. mobX v4 支持 ES5 的浏览器

2. mobX v5 支持有 Proxy 的浏览器

---

# Redux vs MobX

| 项目名 | 适合场景                   | 开发模式 | 更新逻辑 |
| ------ | -------------------------- | -------- | -------- |
| Redux  | 复杂项目，大团队，需求多变 | FP       | 统一     |
| MobX   | 小项目，小团队，快速原型   | OO       | 分散     |

所以项目启动之初可以使用 MobX

---

# 哲学

> Anything that can be derived from the application state, should be derived. Automatically.
> 任何可以从应用状态继承的都应该被继承，自动的！

---

# 结构图

![](./images/flow.png)

---

说明：

1. 活动(Actions)
   由事件产生，是对状态等进行修改的唯一入口
2. 状态(States)
   可侦听的最小数据。不能是循环或者可继承的数据
3. 计算的值(Computed values)
   一种可以由纯函数继承的数值，随状态自动更新或者消失
4. 响应(Reactions)
   跟计算的值一样是随状态变化而作出的响应。而它的作用并不是值的变化，而是 UI 等其它变化。

---

# 核心概念

## 1.可观察的状态(Observable State)

使用格式：

1. observable(value)
2. @observable classProperty = value

---

### 可观察者值的规则

其中 value 遵守一些规则：

1. ES6 Map, Set => Observable Map, Set
2. array => Observable Array
3. Object(无 prototype) => Observable Object
4. Object(有 prototype), Function, 基本类型 => 需要使用 Observable Box

---

### 示例

```ts
const map = observable.map({ key: "value" });
map.set("key", "new value");

const list = observable([1, 2, 4]);
list[2] = 3;

const person = observable({
  firstName: "Clive Staples",
  lastName: "Lewis"
});
person.firstName = "C.S.";

const temperature = observable.box(20);
temperature.set(25);
```

---

# 核心概念

## 1.可观察的状态(Observable State)

### @observable 在类中使用

```js
import { observable } from "mobx";

class Todo {
  id = Math.random();
  @observable title = "";
  @observable finished = false;
}
```

---

# 核心概念

## 2.计算值(Computed values)

```js
class TodoList {
  @observable todos = [];
  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}
```

---

# 核心概念

## 3.响应(Reactions)

有三个函数会对观察对象的变化做出反应：

1. `autorun`
2. `reaction`
3. `when`

---

# autorun

对每次侦听的观察者变化自动做出响应

格式：

```ts
autorun((reaction) => { sideEffect }, options?)
```

其中:
reaction 参数可以调用`dispose`方法，销毁 autorun 自己，代码如下：

```js
autorun(reaction => {
  reaction.dispose();
});
```

options 是可选的

---

# autorun

调用代码

```ts
const todo = new Todo();

const disposer = autorun(() => {
  console.log("Tasks title: " + todo.title);
});

todo.title = "hello";
todo.title = "hello 1";
disposer();
todo.title = "hello 2";
```

---

我们会获得输出：

```
Tasks title:
Tasks title: hello
Tasks title: hello 1
```

> `disposer()`执行后，`autorun`就失效了

如果这个时候我们在 autorun 上添加 computed 的属性，就能看出来 computed 的属性也会有相应的变化。

---

# 通过 autorun 观察 computed 的效果

编写对 computed 属性的 autorun

```jsx
const todo: Todo = new Todo();
const todoList: TodoList = new TodoList();
todoList.todos.push(todo);

const disposer = autorun(() => {
  console.log("Tasks left: " + todoList.unfinishedTodoCount);
});
```

---

# 通过 autorun 观察 computed 的效果

对观察对象进行赋值：

```jsx
todo.finished = true;

todo.title = "hello 2";

todo.finished = false;

disposer();

todo.finished = true;

todo.finished = false;
```

---

运行查看结果如下：

```
Tasks left: 1
Tasks left: 0
Tasks left: 1
```

说明`todo`一个属性的变化，导致了`computed`所对应的函数的变化。

---

# options 说明

## 1. delay

定义： 在新数据到达后，再发送出去的最少等待时间。

delay 可以防止数据的发送过快导致的性能瓶颈与压力，使用方法如下：

1. 定义 delay

```ts
const todo: Todo = new Todo();
const disposer = autorun(
  () => {
    console.log("Tasks title: " + todo.title);
  },
  {
    delay: 100
  }
);
```

---

2. 修改观察对象值：

```
todo.title = "hello";
todo.title = "hello 1";
todo.title = "hello 2";
setTimeout(() => {
  todo.title = "hello 3";
}, 100);
setTimeout(() => {
  todo.title = "hello 4";
}, 150);
setTimeout(() => {
  todo.title = "hello 5";
}, 210);
setTimeout(() => {
  todo.title = "hello 6";
}, 270);

setTimeout(() => {
  disposer();
}, 1000);
```

---

获取运行结果：

```
Tasks title: hello 2
Tasks title: hello 5/4
Tasks title: hello 6
```

这里可以看到两个数据的设置时间如果相差小于 100ms，那么这个新数据就会被丢弃。

---

# options 说明

## 2. name

用于记录这个 reaction 的名字，方便识别与引用

## 3. onError 用于捕获错误并进行处理

使用方式如下：

---

定义 `autorun`:

```ts
const age = observable.box(10);

const disposer = autorun(
  () => {
    if (age.get() < 0) throw new Error("Age should not be negative");
    console.log("Age", age.get());
  },
  {
    onError(e) {
      console.log("Please enter a valid age");
    }
  }
);
```

---

调用错误的值引起`throw`

```
age.set(1);
age.set(-1);

```

运行结果如下：

```
Age 10
Age 1
Please enter a valid age
```

当我们试图设置`-1`时出错了。

---

# options 说明

## 4. scheduler

类似于 delay，但是比 delay 更加灵活的延时处理方式。
还可以中断 autorun 的执行

---

scheduler 定义：

```js
const todo: Todo = new Todo();
let count = 0;
const disposer = autorun(
  () => {
    console.log(new Date().getTime());
    console.log("Tasks title: " + todo.title);
  },
  {
    scheduler: run => {
      if (count < 2) {
        run();
      } else {
        setTimeout(run, 1000);
      }
      count++;
    }
  }
);
```

---

调用

```
todo.title = "hello";
todo.title = "hello 1";
todo.title = "hello 2";
```

得到类似结果：

```
1474842800172
Tasks title:
1474842800176
Tasks title: hello
1474842801179
Tasks title: hello 2
```

前面两个时间最后两位差了 4 毫秒，而后面的差了 1000 毫秒。

---

# reaction

reaction 是比 autorun 更加强大的控制，提供了数据的重新组织能力

格式：

```ts
reaction(() => data, (data, reaction) => { sideEffect }, options?)
```

---

# reaction

下面我们看看如何使用:

## 1. 我们先定义数据如下

```jsx
const todo: Todo = new Todo();
const todoList: TodoList = new TodoList();

todoList.todos.push(todo);
```

---

# reaction

## 2. 然后定义 react 处理

这里分别定义了三个不同的处理：
a. 第一个侦听 `todos` 的长度
b. 第二个侦听 `title` 的变化
c. 第三个侦听长度，但是第一次侦听完成后就销毁了自己。

---

```jsx
const reaction1 = reaction(
  () => todoList.todos.length,
  length => console.log("reaction 1: length", length)
);

const reaction2 = reaction(
  () => todoList.todos.map(todo => todo.title),
  titles => console.log("reaction 2:", titles.join(", "))
);

const reaction3 = reaction(
  () => todoList.todos.length,
  (length, reaction) => {
    console.log("reaction 3: invoked. and dispose!");
    console.log("length : ", length);
    reaction.dispose();
  }
);
```

---

## 3. 然后放入数据：

```jsx
const todo1: Todo = new Todo();
todoList.todos.push(todo1);
todoList.todos.pop();

todo.title = "hello";
todo.title = "hello 1";

todo.finished = true;

reaction1();
reaction2();

reaction3();
todoList.todos.push(todo1);
todoList.todos.pop();

todo.title = "hello 2";
```

---

## 4. 运行获得如下输出

```sh
reaction 1: length 2
reaction 2: ,
reaction 3: invoked. and dispose!
length :  2
reaction 1: length 1
reaction 2:
reaction 2: hello
reaction 2: hello 1
```

### 分析

1. push 时引起长度变化与内容变化，调用了 1, 2, 3；调用顺序看上去与代码的调用顺序一致
2. pop 时引起长度与内容的变化，调用了 1,2；3 由于自销毁而无法调用。
3. 当 title 修改时，只有 2 获得了变化。

---

# when

when 就是定义一个条件，当条件满足时就执行。
格式：

```ts
when(predicate: () => boolean, effect?: () => void, options?)
```

使用说明：

1. 定义一个条件
2. 针对这个条件进行处理

---

# when

代码：

1. 定义 when

```ts
const todo: Todo = new Todo();

const disposer = when(
  () => todo.finished,
  () => console.log("when invoked")
);
```

---

# when

2. 修改观察的条件

```ts
console.log("finished 1");
todo.finished = true;
console.log("finished 2");

todo.finished = false;
console.log("finished 3");

disposer();
console.log("finished 4");

todo.finished = true;
```

---

# when

3. 获得的结果：

```
finished 1
when invoked
finished 2
finished 3
finished 4
```

只有当 finished=true 时才会被调用

---

# 与 react 一起使用

## 1. 首先创建一个 react 项目：

```sh
npx create-react-app demo-mobx --typescript
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## 2. 安装

```sh
npm install --save mobx mobx-react
```

---

## 3. 创建一个状态管理类

```ts
class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  @action.bound
  reset() {
    this.timer = 0;
  }
}
```

---

## 4. 创建一个接收状态的 React 视图

```jsx
const TimerView = observer(({ appState }) => (
  <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
));
```

---

## 5. 初始化一个状态并传递给对应的 React 视图的 JSX

```jsx
<div>
  <TimerView appState={new AppState()} />
</div>
```

## 6. 将这个 JSX 添加给 HTML 元素

```jsx
ReactDOM.render(<App />, document.getElementById("root"));
```

## 7. 通过`npm start`查看结果

---

# End
