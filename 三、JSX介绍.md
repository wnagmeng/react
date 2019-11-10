---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
  }
---

# 什么是 JSX？

> 可以让 JS 代码与 HTML 模板直接交互的技术

比如：

```jsx
const element = <h1>Hello, world!</h1>;
```

JSX 会被解析成 React 的对应元素

---

# 为什么使用 JSX？

1. 认为渲染逻辑与其它逻辑内在关联(事件处理，状态变更，数据显示)

2. 采用关注点分离（Soc)的设计模式，将关注的内容松散的放在一个文件里，即 JSX 文件

3. JSX 不是必须的，但是 JSX 通常会更加简洁

---

# 不使用 JSX 与使用 JSX 对比

1. 使用 JSX

```jsx
const element = <h1>Hello, world!</h1>;
```

2. 不使用 JSX

```jsx
const element = React.createElement("h1", null, `Hello, world!`);
```

---

# 嵌入表达

```jsx
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;
```

JSX 可以运算所有合法的 JavaScript 的表达式。

```jsx
function add(a, b) {
  return a + b;
}

const name = "Josh Perez";
const element = <h1>Hello, {add(add("Josh", " "), "Perez")}</h1>;
```

---

# 给元素属性赋值

1. 使用双引号`"`实现元素直接赋值
2. 使用大括号`{}`实现表达式赋值

```jsx
const url = "https://www.google.com"
<a title="Hello world" href="{url}" className="sites" tabIndex={1}>谷歌</a>
```

## 注意

如示例所示。为防止属性与 JavaScript 关键字冲突，有些 HTML 属性会有所变化，并遵从驼峰（camelCase)格式。比如

1. class 属性需要替换成 className
2. tabindex 换成是 tabIndex

---

# JSX 里的 HTML 格式规范

1. 空内容标签需要以`/>`闭合。

```
const element = <img src={user.avatarUrl} />;
```

2. 支持跟 HTML 一样嵌套子元素。注意需要`()`包裹

```
const element = (
  <div>
    <h1>Hello World!!</h1>
  </div>
);
```

---

# JSX 的安全性

JSX 会过滤导致跨域攻击（XSS）的内容。

---

# JSX代表一个对像（Object）

下面的两个表达是相同的：

1. JSX

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

2. React.createElement

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

---

# JSX代表一个对像（Object）

事实上JSX会被React.createElement翻译成一个对像。
对于上面的JSX，最终翻译的对像会是这样的：
```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
这些对像也叫React元素，是用来渲染DOM的。