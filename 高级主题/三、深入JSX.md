---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
    text-align: center;
  }
---

# 深入 JSX

---

# JSX 本质

是函数

```jsx
React.createElement(component, props, ...children);
```

的一个语法糖。

---

# 拆解 JSX(DOM 组件)

对于 JSX

```jsx
<h1>{this.state.title}</h1>
```

它编译后的代码是这样的：

```jsx
React.createElement("h1", null, this.state.title);
```

---

# 拆解 JSX(自定义组件)

对于 JSX

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

它编译后的代码应该是这样的：

```jsx
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me");
```

这里`MyButton`是一个类名，所以使用`MyButton`时，`MyButton`类必须要预先定义好。比如：

```jsx
import MyButton from "./MyButton";
```

---

# 在线体验

想查看编译的结果可以打开以下链接：

[在线 JSX 翻译](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react%2Ctypescript&prettier=false&targets=&version=7.7.3&externalPlugins=)

---

# 在一个模块里导出多个组件

有时候一个模块同时包含多个组件，除了直接 import 出来外，
React 也支持`module.COMPONENT`的形式作为组件名。

示例如下：

```jsx
<MyModule.AComponent name="AComponent" />
```

---

# 在一个模块里导出多个组件

完整案例：

```jsx
import React from "react";
const MyModule = {
  AComponent: function AComponent(props: any) {
    return <h1>This is {props.name}.</h1>;
  },
  BComponent: function BComponent(props: any) {
    return <h1>This is {props.name}.</h1>;
  }
};
function ABComponent() {
  return (
    <div>
      <MyModule.AComponent name="AComponent" />
      <MyModule.BComponent name="BComponent" />
    </div>
  );
}
```

---

# 用户自定义组件名必须是大写开头的

如果是小写字母，会被当成是 html 标签。
比如定义一个小写字母的组件如下：

```jsx
function lower(props) {
  return <div>{props.children}</div>;
}
<lower>lower wrong component</lower>;
```

放入 React 编译,结果会是这样的：

```jsx
React.createElement("lower", null, "lower wrong component");
```

这里`lower`被翻译成是字符串，而不是一个类或者变量名了，这样就无法对应上定义的组件。

---

正确的写法是这样的：

```jsx
function Lower(props) {
  return <div>{props.children}</div>;
}
<Lower>lower wrong component</Lower>;
```

翻译后，得到正确的结果：

```jsx
function Lower(props) {
  return React.createElement("div", null, props.children);
}
React.createElement(Lower, null, "lower wrong component");
```

---

# 运行时组件选择

要求：
组件对象名必须大写

对于`ABComponent`我们通过属性选择返回`AComponent`或者`AComponent`。
那么代码如下：

```jsx
import { MyModule } from "./ABComponent";

export default function RunTimeComponent(props: any) {
  let Component = MyModule.AComponent;
  if (props.type === "B") {
    Component = MyModule.BComponent;
  }
  return <Component name={props.type + "Component"} />;
}
```

---

如果要选择 B 组件：

```jsx
ReactDOM.render(<RunTimeComponent type="B" />, document.getElementById("root"));
```

如果我们要好选择 A 组件，任何 type 不是`B`的值都可以。比如：

```jsx
ReactDOM.render(<RunTimeComponent type="A" />, document.getElementById("root"));
```

---

# JSX 的 props

## Javascript 表达式

1. 可以计算放在{}中任意的 JS 表达式

```jsx
<MyComponent foo={1 + 2 + 3 + 4} />
```

props.foo 的值是 10,也就是 javascript 表达式`1 + 2 + 3 + 4`的值

2. `if`, `for`不是表达式，所以不能直接作用于 JSX

---

# JSX 的 props

## 字符常量

有两种字符常量的传递方式

```jsx
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
```

字符常量解析后会被 escape。所以以下的代码是一样的。

```jsx
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />
```

---

# JSX 的 props

## props 的默认值是"true"

下面的代码是一样的。

```jsx
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

---

# JSX 的 props

## 属性散播(Spread)

当需要将多个属性传递给子组件时可以采用属性散播。
方法如下：

```jsx
function NoneSpread() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function Spread() {
  const props = { firstName: "Ben", lastName: "Hector" };
  return <Greeting {...props} />;
}
```

---

# JSX 的 props

## 忽略类型

1. 布尔值
2. null
3. undefine

---
