---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
  }
---
# 什么是JSX？

>可以让JS代码与HTML模板直接交互的技术

比如：
```
const element = <h1>Hello, world!</h1>;
```

JSX会被解析成React的对应元素

---

# 为什么使用JSX？

1. 认为渲染逻辑与其它逻辑内在关联(事件处理，状态变更，数据显示)

2. 采用关注点分离（Soc)的设计模式，将关注的内容松散的放在一个文件里，即JSX文件

3. JSX不是必须的，但是JSX通常会更加简洁

---

# 不使用JSX与使用JSX对比

1. 使用JSX
```
const element = <h1>Hello, world!</h1>;
```
2. 不使用JSX
```
const element = React.createElement('h1', null, `Hello, world!`);;
```
---