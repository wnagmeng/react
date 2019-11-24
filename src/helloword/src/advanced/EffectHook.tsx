import React, { useState, useEffect } from "react";

export default function EffectHook() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <h1>EffectHook</h1>
      <p>
        Started at {time.getHours()} : {time.getMinutes()} : {time.getSeconds()}
      </p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
