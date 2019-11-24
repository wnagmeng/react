import React, { useState } from "react";

export default function MultiHook() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date());
  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div>
      <h1>MultiHook</h1>
      <p>
        Started at {time.getHours()} : {time.getMinutes()} : {time.getSeconds()}
      </p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
