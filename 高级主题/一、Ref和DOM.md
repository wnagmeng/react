---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
    text-align: center;
  }
---

# Ref 和 DOM

---

# Ref 的作用

提供办法

1. 访问 DOM 节点
2. 访问由 render 函数创建的 React 元素

---

# 使用场景

1. 对 DOM 的焦点进行管理，对文本的选择状态进行管理，对媒体的播放进行管理
2. 触发一个强制的动画
3. 与第三方的 DOM 结合

---

# 创建并添加 Ref 到 DOM 节点

1. 使用`React.createRef`创建
2. 在标签上添加`ref={this.ref}`

```jsx
class MyComponent extends React.Component {
  private ref: RefObject<HTMLDivElement>;
  constructor(props:any) {
    super(props);
    this.ref = React.createRef<HTMLDivElement>();
  }
  render() {
    return <div ref={this.ref} />;
  }
}
```

这样我们就可以获得这个 div 节点的一个引用并对这个节点进行操作了。

---

# 获取 ref 节点

当将 ref 属性给了一个 DOM 节点后，你就可以通过这个 Ref 来访问这个 DOM 节点了。方法如下：

```js
const domNode = this.ref.current;
```

这里`current`返回的就是对应的引用内容。

---

# Ref 的可能类型

1. 当 ref 指向一个 DOM 元素时，返回 DOM 节点
2. 当 ref 指向一个 React 元素时，返回加载成功的 React 组件实例

## 注：

> 函数组件无法使用 Ref，因为他们没有实例可以引用，只能获得 React 元素

---

# 指向 DOM 的 Ref

1. 定义一个 ref

```jsx
  private textInput: RefObject<HTMLInputElement>;
```

这里指定 Ref 是一个 HTMLInputElement。

2. 在 constructor 里初始化

```jsx
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
  }

```

---

# 指向 DOM 的 Ref

3. 定义一个事件处理函数

```jsx
  focusTextInput(e: SyntheticEvent) {
    this.textInput!.current!.focus();
  }
```

4. 绑定一个 input 元素

```jsx
<input type="text" ref={this.textInput} />
```

---

# 指向 DOM 的 Ref

5. 绑定一个事件处理元素

```jsx
<button
  onClick={e => {
    this.focusTextInput(e);
  }}
/>
```

---

# 指向 DOM 的 Ref

完整代码如下：

```jsx
class DOMRef extends React.Component {
  private textInput: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
  }

  focusTextInput(e: SyntheticEvent) {
    this.textInput!.current!.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <button
          onClick={e => {
            this.focusTextInput(e);
          }}
        >
          Focus
        </button>
      </div>
    );
  }
}
```

---

# 指向类组件的 Ref

上面的例子我们将 DOMRef 类组件制作完成。
如果我们将 Ref 指向 DOMRef 这个类组件，那么调用 focusTextInput 就可以控制这个组件的焦点了。

而这个时候的引用就是对类组件的引用。

---

# 指向类组件的 Ref

1. 定义一个类组件的 Ref

```jsx
private textInput: RefObject<DOMRef>;
```

这里的`DOMRef`就是要引用的类组件名字。

2. 创建类组件的 Ref

```jsx
this.textInput = React.createRef<DOMRef>();
```

---

# 指向类组件的 Ref

3. 定义一个调用类组件的函数

```jsx
  mouseOver(e: SyntheticEvent) {
    this.textInput.current!.focusTextInput(e);
  }
```

这里调用了类组件的`focusTextInput`方法

---

# 指向类组件的 Ref

4. 定义一个调用类组件的函数的事件

```jsx
<div
  onMouseOver={e => {
    this.mouseOver(e);
  }}
>
  <h1>Focus</h1>
  <DOMRef ref={this.textInput} />
</div>
```

当鼠标移动到 div 节点时，就会触发焦点事件。这里的触发条件是可以任意指定的。

---

# 指向类组件的 Ref

完整示例如下：

```jsx
class ClassRef extends React.Component {
  private textInput: RefObject<DOMRef>;
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef<DOMRef>();
  }

  mouseOver(e: SyntheticEvent) {
    this.textInput.current!.focusTextInput(e);
  }

  render() {
    return (
      <div
        onMouseOver={e => {
          this.mouseOver(e);
        }}
      >
        <h1>Focus</h1>
        <DOMRef ref={this.textInput} />
      </div>
    );
  }
}
```

---

# 对函数组件使用 Ref

默认情况下，函数组件并不能使用 ref，因为没有地方保存创建的 ref。

```jsx
function FunctionRef() {
  return <input />;
}

class FunctionRefParent extends React.Component {
  private textInput: RefObject<FunctionRef>;
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef<FunctionRef>();
  }
  render() {
    // This will *not* work!
    return <FunctionRef ref={this.textInput} />;
  }
}
```

这段代码会直接报错。

---

# 在函数组件内部使用 DOM Ref

但是函数组件内部，仍可以使用 Ref(即 DOM ref)，代码如下：

```jsx
function FunctionRef(props: any) {
  let textInput = React.createRef<HTMLInputElement>();

  function handleClick() {
    textInput.current!.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

---

# 暴露 DOM Ref 给父组件

通常不建立暴露 DOM Ref 给父组件。

方法有两种：

1. Ref 回调(Ref callback)
2. Ref 转发( Ref forwarding)

---

# Ref 回调(Ref callback)

默认情况下，属性`ref`指定的是由 createRef()创建的值。

而`Ref 回调`下，`ref`获得的是一个函数。

它的常规格式是:

```jsx
element => {
  this.myRef = element;
};
```

其中这个`element`可以是 React 组件的实例，也可以是 DOM 元素。

---

# 创建支持 Ref 回调的组件

1. 创建一个子组件，并让它绑定 ref 到接收的回调函数

```jsx
function InnerRef(props: any) {
  return <input ref={props.callbackRef} />;
}
```

这个`callbackRef`通常是`props`的一个属性。这样可以用于接收父节点传入的回调函数。

---

# 创建支持 Ref 回调的组件

2. 父组件上创建一个接收子组件元素或者实例的成员

```jsx
  private textInput: HTMLInputElement | null;
```

注意这里类型是`HTMLInputElement | null`，不再是`RefObject<HTMLInputElement>`了。

---

# 创建支持 Ref 回调的组件

3. 在父组件定义接收子组件 DOM 的回调函数

```jsx
setTextInputRef = element => {
  this.textInput = element;
};
```

这样就可以将 ref 的元素赋值给指定的属性了。

> 这样父节点就可以通过传递这个回调函数接收到子组件的 DOM 节点，后面我们会演示

---

# 创建支持 Ref 回调的组件

4. 定义一个包含子组件的元素，并传递一个回调函数给 ref

```jsx
<InnerRef callbackRef={(e: any) => this.setTextInputRef(e)} />
```

这样当子组件加载成功或者组件被卸载时都会调用这个回调函数。
从而父节点就可以获得这个子组件的 DOM 节点。
这样就可以对子组件的 DOM 元素进行操作了。

---

# 创建支持 Ref 回调的组件

5. 当核心的代码完成后，我们需要写一些外围驱动的代码让这个回调 Ref 应用起来就可以了。
   比如这里我们将 textInput 聚焦。

```jsx
  focusTextInput = () => {
    if (this.textInput) this.textInput!.focus();
  };
```

---

# 创建支持 Ref 回调的组件

完整代码：

```jsx
function InnerRef(props: any) {
  return <input ref={props.callbackRef} />;
}
class CallbackRef extends React.Component {
  private textInput: HTMLInputElement | null;
  constructor(props: any) {
    super(props);
    this.textInput = null;
  }
  setTextInputRef = (element: any) => {
    this.textInput = element;
  };
  focusTextInput = () => {
    // Focus the text input using the raw DOM API
    if (this.textInput) this.textInput!.focus();
  };
  render() {
      return (
      <div>
        <InnerRef callbackRef={(e:any) => this.setTextInputRef(e)} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

---

# Ref 转发(Forwarding Ref)

使用回调 Ref 需要定义一个参数接收引用以及回调函数。
有没有更加方便的方式呢？
答案是 Ref 转发。
Ref 转发让组件可以直接获得子组件的引用。

---

# Ref 转发(Forwarding Ref)

对于以上的例子。我们将他转化成`Ref 转发`如下。

1. 创建可转发的子组件

```jsx
const InnerRef = React.forwardRef(
  (props, ref: React.LegacyRef<HTMLInputElement>) => <input ref={ref} />
);
```

---

# Ref 转发(Forwarding Ref)

2. 在父组件定义并创建用于接收的 DOM 引用

```jsx
  private textInput: RefObject<HTMLInputElement>;
    this.textInput = React.createRef<HTMLInputElement>();
```

---

# Ref 转发(Forwarding Ref)

3. 将父组件的 DOM 引用直接赋值给子组件的 ref 属性

```jsx
<InnerRef ref={this.textInput} />
```

4. 加入对 DOM 引用变量的处理

```jsx
    this.textInput!.current!.focus();
```

---

# Ref 转发(Forwarding Ref)

完整代码：
```jsx
const InnerRef = React.forwardRef(
  (props, ref: React.LegacyRef<HTMLInputElement>) => <input ref={ref} />
);

class ForwardRef extends React.Component {
  private textInput: RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef<HTMLInputElement>();
  }
  
  focusTextInput = () => {
    this.textInput!.current!.focus();
  };

  render() {
    return (
      <div>
        <InnerRef ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
