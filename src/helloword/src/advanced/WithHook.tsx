import React, { useState } from "react";

export default function WithHook() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>WithHook</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
