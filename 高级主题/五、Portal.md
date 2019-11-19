---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
    text-align: center;
  }
---

# Portals

---

## 作用

不返回 HTML 结构直接生成到一个指定的 dom 下面。

## 格式

```
ReactDOM.createPortal(child, container)
```

即`child`的内容，直接成为`container`的子节点。

---

## 示例

```jsx
render() {
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

## 场景

模式对话框等需要脱离父节点的场景
